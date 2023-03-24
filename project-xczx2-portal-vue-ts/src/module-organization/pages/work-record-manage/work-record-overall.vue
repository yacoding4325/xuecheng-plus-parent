<template>
  <div class="course-list portal-content">
    <div class="workspace">
      <el-page-header @back="goToWorkRecordListView" content="批阅详情"></el-page-header>

      <!-- TODO: 样式调整 -->
      <!-- <div class="banner">
        <span class="primary-title">批阅详情</span>
      </div>-->

      <el-row>
        <el-col :span="8">课程名称：{{ workRecOverall.courseName }}</el-col>
        <el-col :span="8">课程包含作业数：{{ workRecOverall.workNumber }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="8">课程总人数：{{ workRecOverall.learnerNumber }}</el-col>
        <el-col :span="8">提交作业人数：{{ workRecOverall.committerNumber }}</el-col>
        <el-col
          :span="8"
        >作业总数/待批阅数：{{ workRecOverall.answerNumber }} / {{ workRecOverall.tobeReviewed }}</el-col>
      </el-row>

      <!-- 数据列表-->
      <el-tabs v-model="recGroupIndex" @tab-click="handleClickRecGroupTap">
        <el-tab-pane
          v-for="(item, index) in workRecOverall.recGroupDTOList"
          :key="index"
          :label="item.teachplanName"
          :name="index.toString()"
        >
          <el-table
            class="dataList"
            :data="workRecordList"
            border
            style="width: 100%"
            :header-cell-style="{ textAlign: 'center' }"
          >
            <el-table-column prop="username" label="用户名" align="center"></el-table-column>

            <el-table-column label="提交时间" align="center">
              <template slot-scope="scope">{{ scope.row.createDate | dateTimeFormat }}</template>
            </el-table-column>

            <el-table-column prop="correctComment" label="评语" align="center"></el-table-column>

            <el-table-column label="状态" align="center">
              <template slot-scope="scope">{{ getCourseWorkStatus(scope.row.status) }}</template>
            </el-table-column>

            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  :disabled="scope.row.status !== '306002'"
                  @click="handleOpenWorkRecordDialog(scope.row)"
                >批阅</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 上传资料对话框 -->
    <work-record-correction-dialog
      :dialogVisible.sync="dialogVisible"
      :question="question"
      :answer="answer"
      :workRecord="workRecord"
      @refreshList="getWorkRecordReadOverAll"
    ></work-record-correction-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import WorkRecordCorrectionDialog from './components/work-record-correction-dialog.vue'
import { IKVData } from '@/api/types'
import { COURSE_WORK_STATUS } from '@/api/constants'
import {
  IWorkRecOverallDTO,
  IWorkRecGroupDTO,
  IWorkRecordDTO
} from '@/entity/work-record-page-list'
import { getWorkRecordReadOverAll, defaultWorkRecord } from '@/api/work-record'

@Component({
  components: {
    Pagination,
    WorkRecordCorrectionDialog
  }
})
export default class WorkRecordOverall extends Vue {
  // 批阅状态列表
  private courseWorkStatus: IKVData[] = COURSE_WORK_STATUS
  // 课程作业提交Id
  private courseWorkId: number = 0
  // 作业批阅详情
  private workRecOverall: IWorkRecOverallDTO = {}
  // 课程计划索引
  private recGroupIndex: string = '0'
  // 作业提交记录
  private workRecordList: IWorkRecordDTO[] | undefined = []
  // 作业批阅对话框
  private dialogVisible: boolean = false
  // 单条作业
  private workRecord: IWorkRecordDTO = Object.assign({}, defaultWorkRecord)
  // 题目
  private question: string | undefined = ''
  // 学生作业详情
  private answer: string | undefined = ''

  // 计算属性
  getCourseWorkStatus(status: string) {
    let item = this.courseWorkStatus.find((value: IKVData) => {
      return status == value.code
    })
    return !item ? '' : item.desc
  }

  /**
   * 生命周期钩子
   */
  created() {
    let courseWorkId: any = this.$route.query.courseWorkId
    this.courseWorkId = parseInt(courseWorkId)
    this.getWorkRecordReadOverAll()
  }

  /**
   * 作业批阅详情
   */
  private async getWorkRecordReadOverAll() {
    this.workRecOverall = await getWorkRecordReadOverAll(this.courseWorkId)
    if (this.workRecOverall.recGroupDTOList) {
      this.workRecordList = this.workRecOverall.recGroupDTOList[0].workRecordList
    }
  }

  /**
   * 跳转到作业批改页面
   */
  private goToWorkRecordListView() {
    this.$router.go(-1)
  }

  /**
   * 点击Tap切换课程计划
   */
  private handleClickRecGroupTap(tab: any, event: any) {
    let index: number = parseInt(this.recGroupIndex)
    if (this.workRecOverall.recGroupDTOList) {
      this.workRecordList = this.workRecOverall.recGroupDTOList[
        index
      ].workRecordList
    }
  }

  /**
   * 打开作业批阅对话框
   */
  private handleOpenWorkRecordDialog(row: IWorkRecordDTO) {
    this.question = row.question
    this.answer = row.answer

    this.workRecord.coursePubId = row.coursePubId
    this.workRecord.teachplanId = row.teachplanId
    this.workRecord.teachplanName = row.teachplanName
    this.workRecord.workId = row.workId
    this.workRecord.workRecordId = row.workRecordId

    this.dialogVisible = true
  }
}
</script>

<style lang="scss" scoped>
.course-list {
  .nav-bar {
    margin-top: 16px;
  }

  .workspace .banner .btn-add {
    float: right;
  }

  .searcher {
    margin-top: 16px;

    div {
      width: 218px;
      margin-right: 10px;
    }
  }

  .dataList {
    margin-top: 16px;
  }

  .dataList-pagination {
    text-align: center;
    width: 100%;
  }
}
</style>
