<template>
  <div class="step-body">
    <!-- 工具栏 -->
    <div class="bar">
      <div class="title">任务总数：{{outlineData.length}}</div>
      <el-button size="medium" plain class="el-button" @click="handleAddChapter">+添加章</el-button>
    </div>

    <!-- 大纲列表 -->
    <div class="outline">
      <el-tree
        v-if="outlineData.teachPlanTreeNodes"
        :data="outlineData.teachPlanTreeNodes"
        node-key="teachPlanId"
        :props="defaultProps"
        :default-expanded-keys="outlineData.teachPlanTreeNodes.map(item=> item.teachPlanId)"
      >
        <!-- 自定义行 -->
        <template slot-scope="{ node, data }">
          <div
            class="tree-node"
            :class="{ ischild: data.grade =='2' }"
            @mousemove="data.ctlBarShow = true"
            @mouseleave="data.ctlBarShow = false"
          >
            <div class="icon"></div>
            <div class="operate">
              <!-- 输入框 -->
              <div class="title" @click.stop="handleEditTitle(data)">
                <span v-if="!data.ctlEditTitle">
                  {{ data.pname }}
                </span>
                <input
                  v-focus
                  v-else
                  v-model="data.pname"
                  v-on:keyup.enter="data.ctlEditTitle=false"
                  @blur="handleEditTitleBlue(data)"
                  style="width:280px; height:30px;"
                />
              </div>
              <div class="preview" v-if="data.grade =='2'">
                <el-checkbox
                  v-model="data.isPreview"
                  true-label="1"
                  false-label="0"
                  @change="handleChangeIsPreview(data)"
                >免费</el-checkbox>
              </div>
              <!-- 时间 -->
              <div class="submit-time" v-if="data.grade =='2' && teachmode == '200003'">
                <!-- <span>{{ data.createDate | dateFmt }} ~ {{ data.createDate | endDateFmt }}</span> -->
                <el-date-picker
                  @change="handleChangePublishTime(data)"
                  v-model="data.startTime"
                  type="datetime"
                  placeholder="选择开始时间"
                  default-time="12:00:00"
                  :clearable="false"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>~
                <el-date-picker
                  @change="handleChangePublishTime(data)"
                  v-model="data.endTime"
                  type="datetime"
                  placeholder="选择结束时间"
                  default-time="12:00:00"
                  :clearable="false"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </div>
              <!-- 作业、媒体 -->
              <div class="media-file" v-if="data.grade =='2'">
                <el-link
                  v-if="data.teachplanMedia != null && data.teachplanMedia.mediaFilename != null && data.teachplanMedia.mediaFilename != '' "
                  icon="el-icon-delete"
                  :underline="false"
                  @click="handleDeleteMedia(data)"
                >{{data.teachplanMedia.mediaFilename}}</el-link>
                <el-link
                  v-else-if="data.work != null && data.work.workTitle != ''"
                  icon="el-icon-delete"
                  :underline="false"
                  @click="handleDeleteWork(data)"
                >{{data.work.workTitle}}</el-link>
              </div>
              <!-- 按钮 -->
              <div class="buttons" v-if="data.grade =='1' "> 
                <el-button
                  type="text"
                  @click.stop="handleAddSection(data.teachPlanTreeNodes, data.id)"
                >添加小节</el-button>
                <el-button type="text" @click.stop="handleDeleteNode(data.teachPlanId)">删除本章</el-button>
                 <!-- 上移 -->
                <el-button type="text" @click.stop="moveUP(data.id)">上移</el-button>
                <!-- 下移 -->
                <el-button type="text" @click.stop="moveDown(data.id)">下移</el-button>
              </div>
            
              <div class="buttons" v-else-if="data.grade =='2'">
                <template v-if="teachmode=='200002'">
                  <!--  <span v-if="data.teachplanMedia != null "  @click="handleSelectVideo(data)">
                    {{data.teachplanMedia.mediaFilename}}
                    </span>-->
                  <!-- 作业 
                  <el-button
                    v-if="data.ctlBarShow && data.teachplanMedia === null "
                    type="text"
                    @click.stop="handleSelectWork(data)"
                  >添加作业</el-button>-->

                  <!-- 视频 -->
                  <el-button
                  
                    type="text"
                    @click.stop="handleSelectVideo(data)"
                  >添加视频</el-button>

                  <!-- 文档 
                  <el-button
                    v-if="data.ctlBarShow && data.teachplanMedia === null "
                    type="text"
                    @click.stop="handleSelectDoc(data)"
                  >添加文档</el-button>-->
                </template>
                <!-- 删除 -->
                <el-button type="text" @click.stop="handleDeleteNode(data.id)">删除</el-button>
                <!-- 上移 -->
                <el-button type="text" @click.stop="moveUP(data.id)">上移</el-button>
                <!-- 下移 -->
                <el-button type="text" @click.stop="moveDown(data.id)">下移</el-button>
              </div>

            </div>
          </div>
        </template>
        <!-- end -->
      </el-tree>

      <!-- 媒体选择 -->
      <OutlineSelectDialog
        ref="outlineSelectDialog"
        :dialogVisible.sync="mediaDialogVisible"
        @onSelected="onRecvSelectedValue"
        :type="selectType"
        :title="selectTypeTitle"
      />
    </div>
  </div>
</template>


<script lang="ts">
import moment from 'moment'
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import {
  submitOutlineNode,
  deleteOutlineNode,
  moveDownSubmit,
  moveUpSubmit,
  getOutline,
  mediaAssociation,
  workAssociation,
  mediaUnAssociation,
  workUnAssociation
} from '@/api/courses'
import { ICourseOutlineTreeNode } from '@/entity/course-add-outline'
import OutlineSelectDialog from './course-add-step2-select-dialog.vue'
import MixinTools from '@/utils/mixins.vue'

moment.locale('zh-cn') // 时间格式化

@Component({
  name: 'CourseAddStep2Outline',
  components: {
    OutlineSelectDialog
  },
  filters: {
    // 课程计划发布状态
    status: (value: string) => {
      let statesText = value == '203001' ? '未发布' : '已发布'
      return statesText
    },
    dateFmt: (value: string) => {
      return moment(value).format('YYYY年MM月DD日 HH:mm')
    },
    endDateFmt: (value: string) => {
      return moment(value).format('HH:mm')
    }
  }
})
export default class extends mixins(MixinTools) {
  @Prop({ type: Number })
  courseBaseId!: number

  @Prop({ type: String })
  teachmode!: string

  private outlineData!: ICourseOutlineTreeNode
  private defaultProps = {
    children: 'teachPlanTreeNodes',
    label: 'pname'
  }

  private mediaDialogVisible: boolean = false // 选择媒体窗口
  private curSelectNode: any = {} // 当前操作的媒体
  private selectType: string = '' // video file doc
  private selectTypeTitle: string = ''

  constructor(props) {
    super(props)
    this.outlineData = {
      courseId: this.courseBaseId,
      mediaType: '',
      pname: '',
      teachPlanTreeNodes: []
    }
  }

  /*
   功能函数
   */

  // 重置媒体选择
  private restSelectedDialog() {
    let selDialog: HTMLFormElement = this.$refs[
      'outlineSelectDialog'
    ] as HTMLFormElement
    selDialog.restForm()
  }

  // 读取大纲
  public async getList() {
    if (this.courseBaseId != 0) {
      let data = await getOutline(this.courseBaseId)
      // debugger

      // 设置可编辑状态
      // 二级
      // if (
      //   data.teachPlanTreeNodes !== null &&
      //   data.teachPlanTreeNodes !== undefined
      // ) {
      //   data.teachPlanTreeNodes = data.teachPlanTreeNodes.map((v: any) => {
      //     // this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
      //     v.ctlEditTitle = false
      //     v.ctlBarShow = false
      //     // 三级
      //     if (v.teachPlanTreeNodes !== null) {
      //       v.teachPlanTreeNodes = v.teachPlanTreeNodes.map((v: any) => {
      //         v.ctlEditTitle = false
      //         v.ctlBarShow = false
      //         return v
      //       })
      //     }
      //     return v
      //   })
      // }
      if (data) {
        data.teachPlanTreeNodes = data.map((v: any) => {
          // this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.ctlEditTitle = false
          v.ctlBarShow = false
          // 三级
          if (v.teachPlanTreeNodes !== null) {
            v.teachPlanTreeNodes = v.teachPlanTreeNodes.map((v: any) => {
              v.ctlEditTitle = false
              v.ctlBarShow = false
              return v
            })
          }
          return v
        })
      }

      this.outlineData = data
      // console.log(this.outlineData)
    }
  }

  /*
   交互操作
   */

  // 点击 修改标题
  private handleEditTitle(data: any) {
    // console.log('handleChangePName')
    data.ctlEditTitle = true
  }

  // 失去焦点 修改标题
  private async handleEditTitleBlue(data: any) {
    await submitOutlineNode(data)
    data.ctlEditTitle = false
  }

  // 添加章
  private async handleAddChapter() {
    let node: ICourseOutlineTreeNode = {
      courseId: this.courseBaseId,
      parentid: 0,
      grade: 1,
      pname: '新章名称 [点击修改]'
      // mediaType: '',
      // ctlEditTitle: false,
      // ctlBarShow: false
      // teachPlanTreeNodes: []
    }
    await submitOutlineNode(node)
    this.getList()
    // this.outlineData.teachPlanTreeNodes.push(node)
  }

  // 添加小节
  private async handleAddSection(
    teachPlanTreeNodes: ICourseOutlineTreeNode[],
    parentid: number
  ) {
    let node: ICourseOutlineTreeNode = {
      courseId: this.courseBaseId,
      parentid: parentid,
      grade: 2,
      pname: '新小节名称 [点击修改]'
      // mediaType: '',
      // isPreview: '0',
      // ctlEditTitle: false,
      // ctlBarShow: false
      // teachPlanTreeNodes: []
    }

    await submitOutlineNode(node)
    this.getList()
    // teachPlanTreeNodes.push(node)
  }

  // 删除小节
  private async handleDeleteNode(teachPlanId: number) {
    try {
      await this.showDeleteConfirm()
      await deleteOutlineNode(teachPlanId)
      this.getList()
    } catch (error) {}
  }
  //上移
  private async moveUP(teachPlanId: number) {
    try {
      await moveUpSubmit(teachPlanId)
      this.getList()
    } catch (error) {}
  }
 //下移
  private async moveDown(teachPlanId: number) {
    try {
      await moveDownSubmit(teachPlanId)
      this.getList()
    } catch (error) {}
  }


  


  // 免费学习本章
  private async handleChangeIsPreview(node: ICourseOutlineTreeNode) {
    // console.log(node)
    await submitOutlineNode(node)
  }

  // 修改发布时间
  private async handleChangePublishTime(node: ICourseOutlineTreeNode) {
    // console.log(node)
    await submitOutlineNode(node)
  }

  // 选择作业
  private handleSelectWork(node: ICourseOutlineTreeNode) {
    this.restSelectedDialog()
    this.selectType = 'work'
    this.selectTypeTitle = '选择作业'
    this.mediaDialogVisible = true
    this.curSelectNode = node
  }

  // 选择视频
  private handleSelectVideo(node: ICourseOutlineTreeNode) {

    this.restSelectedDialog()
    this.selectType = 'video'
    this.selectTypeTitle = '选择视频'
    this.mediaDialogVisible = true
    this.curSelectNode = node
  }

  // 选择文档
  private handleSelectDoc(node: ICourseOutlineTreeNode) {
    this.restSelectedDialog()
    this.selectType = 'doc'
    this.selectTypeTitle = '选择文档'
    this.mediaDialogVisible = true
    this.curSelectNode = node
  }

  // 收到选中数据
  private async onRecvSelectedValue(ret: any) {
    // console.log(ret)
    // if (this.curSelectNode.teachplanMedia == null) {
    //   this.curSelectNode.teachplanMedia = {}
    // }
    // this.curSelectNode.teachplanMedia.mediaId = 0
    // this.curSelectNode.teachplanMedia.mediaFileName = ''

    // if (this.curSelectNode.work == null) {
    //   this.curSelectNode.work = {}
    // }
    // this.curSelectNode.work.question = ''
    // this.curSelectNode.work.title = ''

    // if (ret.type === 'video' || ret.type === 'doc') {
    //   this.curSelectNode.teachplanMedia.mediaId = ret.value.id
    //   this.curSelectNode.teachplanMedia.mediaFileName = ret.value.filename
    //   await mediaAssociation(ret.value.id, this.curSelectNode.teachPlanId)
    // } else if (ret.type === 'work') {
    //   this.curSelectNode.work.question = ret.value.question
    //   this.curSelectNode.work.title = ret.value.title
    //   await submitOutlineNode(this.curSelectNode)
    // }
    if (ret.type === 'video' || ret.type === 'doc') {
      
      await mediaAssociation(ret.value.id,ret.value.filename ,this.curSelectNode.id)
    } else if (ret.type === 'work') {
      await workAssociation(
        this.curSelectNode.teachPlanId,
        ret.value.workId,
        ret.value.title
      )
    }
    this.getList()
  }

  // 删除 媒体
  private async handleDeleteMedia(node: ICourseOutlineTreeNode) {
    console.log(node)
    try {
      if (
        node.teachplanMedia === undefined ||
        node.teachplanMedia.teachplanId === undefined
      ) {
        return
      }
      await this.showDeleteConfirm()
      await mediaUnAssociation(
        node.teachplanMedia.teachplanId,
        node.teachplanMedia.mediaId,
        this.courseBaseId
      )
      this.getList()
    } catch (error) {}
  }

  // 删除 作业
  private async handleDeleteWork(node: ICourseOutlineTreeNode) {
    try {
      if (node.work === undefined || node.work.teachplanWorkId === undefined) {
        return
      }
      await this.showDeleteConfirm()
      await workUnAssociation(node.work.teachplanWorkId, this.courseBaseId)
      this.getList()
    } catch (error) {}
  }
}
</script>

<style lang="scss" scoped>
.step-body {
  width: 1138px;
  margin: 0px auto;

  .bar {
    .title {
      display: inline-block;
      width: 100px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    .el-button {
      display: inline-block;
    }
  }

  .outline {
    padding-top: 20px;
    padding-bottom: 20px;
    // margin: 0px auto;
    width: 1100px;

    .tree-node {
      // background-color: blueviolet;
      height: 50px;
      line-height: 50px;
      width: 100%;

      .icon {
        display: none;
      }

      .operate {
        position: relative;
        float: left;
        padding-left: 10px;
        background-color: #f1f1f1;
        width: 1093px;
        height: 50px;
        line-height: 50px;
        &:hover {
          background-color: #ebf8ff;
        }

        .title {
          float: left;
          padding-right: 10px;
          width: 400px;
          overflow: hidden;
        }

        .preview {
          float: left;
          padding-right: 10px;
          width: 80px;
        }

        .submit-time {
          float: left;
          // margin-left: 20px;
        }

        .media-file {
          float: left;
          margin-left: 10px;
        }

        .buttons {
          position: absolute;
          top: 0px;
          right: 10px;
          text-align: right;
          // background-color: aqua;
          width: 300px;
          height: 50px;
          line-height: 50px;
          div {
            display: inline-block;
            height: 50px;
            line-height: 50px;
            margin: 0px 10px;
          }
        }
        // .title {
        //   display: inline-block;
        //   line-height: 120px;
        //   height: 120px;
        // }
      }
    }

    .ischild {
      border-left: 1px solid #cacaca;
      padding-top: 15px;
      height: 80px;
      line-height: 80px;
      .icon {
        display: block;
        float: left;
        // background-color: aqua;
        width: 34px;
        height: 25px;
        border-bottom: 1px solid #cacaca;
      }

      .operate {
        width: 1040px;
        .title {
          width: 300px;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.outline {
  .el-tree-node__expand-icon {
    display: none;
  }
  // .el-tree-node__content {
  //   height: 50px;
  // }
  .el-tree-node__content {
    // height: 80px;
    height: auto;
  }
  .el-button--text {
    color: #666666;
    font-weight: 400;
  }

  .el-date-editor {
    background-color: transparent;
    width: 200px;
  }
  .el-input__inner {
    background-color: transparent;
    border: 0px;
  }
}
</style>
