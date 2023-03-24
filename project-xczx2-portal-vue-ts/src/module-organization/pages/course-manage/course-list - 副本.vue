<template>
  <div class="workspace">
    <div class="banner">
      <span class="primary-title">课程管理</span>
      <el-button
        type="primary"
        size="medium"
        class="btn-add el-button"
        @click="handleShowTypeDlg"
      >+添加课程</el-button>
    </div>

    <!-- 搜索栏 -->
    <div class="searcher">
      <el-input
        class="el-input"
        placeholder="课程名称"
        suffix-icon="el-icon-search"
        v-model="listQueryData.courseName"
      />
      <el-select v-model="listQueryData.auditStatus" placeholder="请选择">
        <el-option
          v-for="item in aduitStatusOptions" 
          :key="item.code"
          :label="item.desc"
          :value="item.code"
        ></el-option>
      </el-select>
     <el-select v-model="listQueryData.publishStatus" placeholder="请选择">
        <el-option
          v-for="item in coursePublishStatus"
          :key="item.code"
          :label="item.desc"
          :value="item.code"
        ></el-option>
      </el-select>
    </div>

    <!-- 数据列表 -->
    <el-table
      class="dataList"
      v-loading="listLoading"
      :data="listData.items"
      border
      style="width: 100%"
      :header-cell-style="{textAlign: 'center'}"
    >
      <el-table-column prop="name" label="课程名称" width="250"></el-table-column>
      <el-table-column prop="subsectionNum" label="任务数" align="center" width="100"></el-table-column>
      <el-table-column label="创建时间" align="center" width="160">
        <template slot-scope="scope">
          <div>{{scope.row.createDate | dateTimeFormat}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="learners" label="报名人数" align="center" width="100"></el-table-column>
      <el-table-column label="是否付费" align="center" width="80">
        <template slot-scope="scope">
          <div>{{scope.row.charge | chargeText}}</div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" width="100">
        <template slot-scope="scope">
          <div>
            {{scope.row.auditStatus | auditStatusText}}
            <br />
            <el-button
              v-if="scope.row.auditStatus == '202001'"
              type="text"
              size="mini"
              @click="showMessageBox(scope.row.auditMind, '审核未通过')"
            >查看审核意见</el-button>
            <el-button
              v-else-if="scope.row.auditStatus == '202005'"
              type="text"
              size="mini"
              @click="handleViewDetail(scope.$index, scope.row)"
            >查看课程详情</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center" width="80">
        <template slot-scope="scope">
          <div>{{scope.row.teachmode | teachmodeText}}</div>
        </template>
      </el-table-column>
      <!-- TODO: 增加友好提示 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            :disabled="scope.row.auditStatus !== '202001' && scope.row.auditStatus !== '202002'"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="mini"
            :disabled="scope.row.auditStatus !== '202001' && scope.row.auditStatus !== '202002'"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
          <el-button
            type="text"
            size="mini"
            :disabled="scope.row.auditStatus !== '202001' && scope.row.auditStatus !== '202002'"
            @click="handlePreview(scope.$index, scope.row)"
          >预览</el-button>
          <el-button
            type="text"
            size="mini"
            :disabled="scope.row.auditStatus !== '202001' && scope.row.auditStatus !== '202002'"
            @click="handleCommit(scope.$index, scope.row)"
          >提交审核</el-button>
          <el-button
            type="text"
            size="mini"
            :disabled="scope.row.auditStatus !== '202004'"
            @click="handlePublish(scope.$index, scope.row)"
          >发布</el-button>
          <el-button
            type="text"
            size="mini"
            :disabled="scope.row.state !== '2'"
            @click="handleOffline(scope.$index, scope.row)"
          >下架</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页控制 -->
    <div class="dataList-pagination">
      <Pagination
        v-show="listData.counts > 0"
        :total="listData.counts"
        :page.sync="listQuery.pageNo"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </div>

    <!-- 类型提示框 -->
    <CourseAddTypeDialog :dialogVisible.sync="typeDialogVisible"></CourseAddTypeDialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import Pagination from '@/components/pagination/index.vue'
import CourseAddTypeDialog from './course-addtype-dialog.vue'
import { IKVData } from '@/api/types' // 通用 interface
import {
  AUDIT_STATUS,
  COURSE_CHARGE_TYPE_STATUS,
  COUSE_PUBLIC_STATUS,
  COUSE_TYPE_STATUS
} from '@/api/constants' // 通用常量定义
import {
  list,
  commitCourse,
  publishCourse,
  offlineCourse,
  removeCourse
} from '@/api/courses' // api interface 课程
import { ICoursePageList, ICourseBaseDTO } from '@/entity/course-page-list'
import MixinTools from '@/utils/mixins.vue'

@Component({
  name: 'CourseList',
  components: {
    Pagination,
    CourseAddTypeDialog
  },
  filters: {
    auditStatusText: function(value: string) {
      let finds = AUDIT_STATUS.filter(item => {
        return item.code == value
      })
      if (finds && finds.length > 0) {
        return finds[0].desc
      }
    },
    chargeText: function(value: string) {
      let finds = COURSE_CHARGE_TYPE_STATUS.filter(item => {
        return item.code == value
      })
      if (finds && finds.length > 0) {
        return finds[0].desc
      }
    },
    teachmodeText: function(value: string) {
      let finds = COUSE_TYPE_STATUS.filter(item => {
        return item.code == value
      })
      if (finds && finds.length > 0) {
        return finds[0].desc
      }
    }
  }
})
export default class extends mixins(MixinTools) {
  // 数据
  // 审核类型
  private aduitStatusOptions: IKVData[] = AUDIT_STATUS

  private coursePublishStatus: IKVData[] = COUSE_PUBLIC_STATUS

  // 类型选择弹出对话框
  private typeDialogVisible: boolean = false // 是否显示

  // 查询
  private listData: ICoursePageList = {} // 数据体
  private listLoading: boolean = false // 是否载入中
  // api params
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }
  // api post body
  private listQueryData = {
    courseName: '',
    auditStatus: ''
  }

  // 业务函数
  private async getList() {
    this.listLoading = true
    this.listData = await list(this.listQuery, this.listQueryData)
    this.listLoading = false
  }

  // 生命周期 life
  created() {
    // this.getList();
  }

  // 事件 handle
  private async handlePreview(index: number, row: ICourseBaseDTO) {
    if (row.courseBaseId) {
      window.open(
        `${process.env.VUE_APP_SERVER_API_URL}/content/coursepreview/${row.courseBaseId}`,
        '_blank'
      )
      // window.open(
      //   `${process.env.VUE_APP_SERVER_API_URL}/content/coursepreview/${row.courseBaseId}/${row.companyId}`,
      //   '_blank'
      // )
    }
  }
  private handleEdit(index: number, row: ICourseBaseDTO) {
    this.$router.push({
      path: `/organization/course-add?courseBaseId=${row.id}&teachmode=${row.teachmode}`
      //path: `/organization/course-add?courseBaseId=${row.courseBaseId}&teachmode=${row.teachmode}`
    })
  }
  private async handleCommit(index: number, row: ICourseBaseDTO) {
    if (row.courseBaseId) {
      await commitCourse(row.courseBaseId)
      await this.getList()
    }
  }
  private async handlePublish(index: number, row: ICourseBaseDTO) {
    if (row.courseBaseId) {
      await publishCourse(row.courseBaseId)
      await this.getList()
    }
  }
  private async handleViewDetail(index: number, row: ICourseBaseDTO) {
    if (row.coursePubId) {
      window.open(
        `${process.env.VUE_APP_SERVER_QINIU_URL}/course_pub/${row.coursePubId}.html`,
        '_blank'
      )
    }
  }
  private async handleOffline(index: number, row: ICourseBaseDTO) {
    if (row.courseBaseId) {
      await offlineCourse(row.courseBaseId)
      await this.getList()
    }
  }
  private async handleDelete(index: number, row: ICourseBaseDTO) {
    try {
      await this.showDeleteConfirm()
      if (row.courseBaseId) {
        await removeCourse(row.courseBaseId)
        await this.getList()
      }
    } catch (error) {}
  }
  private handleShowTypeDlg() {
    this.typeDialogVisible = true
  }

  // 监控 watch
  // 搜索栏
  @Watch('listQueryData', { deep: true, immediate: true })
  private watchListQueryData(newVal: string) {
    if (newVal == '') {
      return
    }
    this.getList()
  }
  // 翻页 pageSize
  @Watch('listQuery.pageSize', { immediate: true })
  private watchListQueryPageSize(newVal: number) {
    this.listQuery.pageNo = 1
  }
}
</script>


<style lang="scss" scoped>
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
</style>
