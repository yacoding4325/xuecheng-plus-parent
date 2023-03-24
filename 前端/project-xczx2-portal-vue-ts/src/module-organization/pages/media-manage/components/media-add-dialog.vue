<template>
  <el-dialog title="上传文件" :visible.sync="syncDialogVisible" @closed="handleClosedDialog">
    <!-- 数据列表 -->
    <el-table
      class="dataList"
      :data="fileList"
      border
      style="width: 100%"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column prop="name" label="文件名" align="center"></el-table-column>
      <el-table-column prop="size" label="大小" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.percentage"></el-progress>
        </template>
      </el-table-column>

      <!-- <el-table-column label="操作" align="center">
        <el-button type="text" size="mini" @click="handleDeleteFile">移除</el-button>
      </el-table-column>-->
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-upload
        action="#"
        :auto-upload="false"
        :accept="'video/*'"
        :show-file-list="false"
        :on-change="handleChange"
        :before-upload="handleBeforeUpload"
        :http-request="handleHttpRequest"
      >
        <el-button>添加文件</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">上传</el-button> -->
      </el-upload>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
import {
  ElUploadInternalRawFile,
  ElUploadInternalFileDetail,
  HttpRequestOptions
} from 'element-ui/types/upload'

import * as qiniu from 'qiniu-js'
import { Base64 } from 'js-base64'
import { IQnParamsDTO, IVodTokenDTO } from '@/entity/media-page-list'
import { getQnParams } from '@/api/common'
import { getVodToken, saveMedia } from '@/api/media'
import {uploadByPieces} from '@/utils/uploadtools'

@Component
export default class MediaAddDialog extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean

  // 文档后缀名列表
  private msDocumentSuffix: string[] = [
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
    '.pdf'
  ]
  // 音/视频后缀名列表
  private audioVideoSuffix: string[] = ['.mp3', '.wma', '.avi', '.mp4']
  // 上传的文件列表
  private fileList: ElUploadInternalFileDetail[] = []

  /**
   * 生命周期钩子
   */
  created() {}

  /**
   * 文件状态改变时的钩子
   */
  // 文件分块上传 
  private handleChange(
    file: ElUploadInternalFileDetail,
    fileList: ElUploadInternalFileDetail[]
  ) {
    this.fileList = fileList
    uploadByPieces({
      file,
      pieceSize: 1, //分片大小
      success: (data) => {
        file.percentage = (data.num/data.chunkCount) * 100
        console.log('success::' + data)
      },
      error: (e) => {
        console.log(file, fileList)
        // 出错了可以从列表中删除吧
        // fileList.forEach((n,i) => { if(n.uid == file.uid){
        //   fileList.splice(i,1)
        // } })
        console.log('error::' + '视频分片上传失败')
      }
    })
  }

  /**
   * 上传文件之前的钩子
   */
  private handleBeforeUpload(file: ElUploadInternalRawFile) {
    let validSuffix = this.msDocumentSuffix.concat(this.audioVideoSuffix)
    let filename = file.name
    let index = filename.lastIndexOf('.')
    let suffix = filename.substr(index)

    const isValid = validSuffix.indexOf(suffix) !== -1
    if (!isValid) {
      this.$message.error(`上传媒资文件只能是 ${validSuffix.toString()} 格式！`)
    }
    return isValid
  }

  /**
   * 覆盖默认的上传行为
   */
  private handleHttpRequest(options: HttpRequestOptions) {
    let file = options.file
    let filename = file.name
    let index = filename.lastIndexOf('.')
    let suffix = filename.substr(index)

    if (this.audioVideoSuffix.indexOf(suffix) !== -1) {
      // 音/视频上传到阿里云
      this.aliyunUpload(file)
    } else {
      // 文档上传到七牛云
      this.qiniuyunUpload(file)
    }
  }

  /**
   * 文档上传到七牛云
   * TODO: 异常系考虑 401
   */
  private async qiniuyunUpload(file: ElUploadInternalFileDetail) {
    // 准备工作
    let qnParams: IQnParamsDTO = await getQnParams()

    // 开始上传
    let token = qnParams.qnToken
    let config = {
      useCdnDomain: true,
      region: null // 自动分析上传域名区域
    }
    let putExtra = {
      fname: '',
      params: {},
      mimeType: null
    }
    let key = qnParams.key

    let next = response => {
      let total = response.total
      let percentage = Math.ceil(total.percent)
      console.log(`媒资上传到七牛云进度...${percentage}%`)
      console.log(response)

      // 更新上传进度
      let currentFile = this.fileList.find(
        (item: ElUploadInternalFileDetail) => {
          return file.uid == item.uid
        }
      )
      if (currentFile) {
        currentFile.percentage = percentage
      }
    }
    let error = response => {
      console.log('媒资上传到七牛云失败...')
      console.log(response)
    }
    let complete = response => {
      console.log('媒资上传到七牛云完成...')
      console.log(response)

      // 保存媒资信息
      this.saveQiniuyunMedia(file.name, qnParams)
    }

    let subscription
    // 调用sdk上传接口获得相应的observable，控制上传和暂停
    let observable = qiniu.upload(file, key, token, putExtra, config)
    observable.subscribe(next, error, complete)
    console.log('媒资上传到七牛云开始...')
  }

  /**
   * 音/视频上传到阿里云
   * TODO: 异常系考虑
   */
  private async aliyunUpload(file: ElUploadInternalFileDetail) {
    let fileName = file.name
    let index = fileName.lastIndexOf('.')
    let title = fileName.substr(0, index)
    let body = {
      fileName: fileName,
      title: title
    }
    let vodToken: IVodTokenDTO = await getVodToken(body)

    let userData = '{"Vod":{}}'
    let uploader = this.createUploader(vodToken)
    uploader.addFile(file, null, null, null, userData)
    // 然后调用 startUpload 方法, 开始上传
    if (uploader !== null) {
      uploader.startUpload()
    }
  }

  private createUploader(vodToken: IVodTokenDTO) {
    let uploader = new AliyunUpload.Vod({
      userId: vodToken.userId,
      // 开始上传
      onUploadstarted: uploadInfo => {
        console.log('媒资上传到阿里云开始...')
        console.log(uploadInfo)
        uploader.setUploadAuthAndAddress(
          uploadInfo,
          vodToken.uploadAuth,
          vodToken.uploadAddress,
          vodToken.videoId
        )
      },
      // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
      onUploadProgress: (uploadInfo, totalSize, progress) => {
        let percentage = Math.ceil(progress * 100)
        console.log(`媒资上传到阿里云进度...${percentage}%`)
        console.log(uploadInfo)

        // 更新上传进度
        let currentFile = this.fileList.find(
          (item: ElUploadInternalFileDetail) => {
            return uploadInfo.file.uid == item.uid
          }
        )
        if (currentFile) {
          currentFile.percentage = percentage
        }
      },
      // 文件上传失败
      onUploadFailed: (uploadInfo, code, message) => {
        console.log('媒资上传到阿里云失败...')
        console.log(uploadInfo)
      },
      // 文件上传成功
      onUploadSucceed: uploadInfo => {
        console.log('媒资上传到阿里云完成...')
        console.log(uploadInfo)

        // 保存媒资信息
        this.saveAliyunMedia(uploadInfo.file.name, vodToken)
      }
    })
    return uploader
  }

  /**
   * 保存七牛云媒资信息
   */
  private async saveQiniuyunMedia(filename: string, qnParams: IQnParamsDTO) {
    let body = {
      bucket: qnParams.scope,
      fileId: qnParams.key,
      filename: filename,
      type: '001003', // 文档
      xc_key: qnParams.xc_key
    }
    await saveMedia(body)
  }

  /**
   * 保存阿里云媒资信息
   */
  private async saveAliyunMedia(filename: string, vodToken: IVodTokenDTO) {
    let bucket = JSON.parse(Base64.decode(vodToken.uploadAddress)).Bucket
    let body = {
      bucket: bucket,
      fileId: vodToken.videoId,
      filename: filename,
      type: '001002' // 视频
    }
    await saveMedia(body)
  }

  /**
   * 删除文件
   * TODO: 调用删除接口
   */
  private handleDeleteFile() {
    this.$confirm('此操作将永久移除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        this.$message({
          type: 'success',
          message: '移除成功!'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移除'
        })
      })
  }

  /**
   * 关闭对话框后刷新列表
   */
  private handleClosedDialog() {
    this.$emit('closeDialog')
  }
}
</script>
