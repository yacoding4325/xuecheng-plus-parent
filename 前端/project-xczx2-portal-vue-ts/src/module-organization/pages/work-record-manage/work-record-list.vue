<template>
  <div class="course-list portal-content">
    <div class="workspace">
      <div class="banner">
        <span class="primary-title">作业批改</span>
      </div>

      <!-- 搜索栏 -->
      <div class="searcher">
        <el-input
          class="el-input"
          placeholder="请输入课程名称"
          suffix-icon="el-icon-search"
          v-model="listQueryData.courseName"
        />
      </div>

      <!-- 数据列表 -->
      <el-table
        class="dataList"
        v-loading="listLoading"
        :data="listResult.items"
        border
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <el-table-column prop="courseName" label="课程名称" width="400" align="center"></el-table-column>

        <el-table-column prop="totalUsers" label="答题人数" align="center"></el-table-column>

        <el-table-column prop="tobeReviewed" label="待批阅数" align="center"></el-table-column>

        <el-table-column label="最后提交/最后批阅" align="center">
          <template slot-scope="scope">
            {{ scope.row.commitedTime | dateTimeFormat }}
            <br />
            {{ scope.row.reviewedTime | dateTimeFormat }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="goToWorkRecordReadOverAllView(scope.row.courseWorkId)"
            >批阅</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 翻页控制 -->
      <div class="dataList-pagination">
        <Pagination
          v-show="listResult.counts > 0"
          :total="listResult.counts"
          :page.sync="listQuery.pageNo"
          :limit.sync="listQuery.pageSize"
          @pagination="getWorkRecordPageList"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import { IWorkRecordPageVO } from '@/entity/work-record-page-list'
import { getWorkRecordPageList } from '@/api/work-record'

@Component({
  components: {
    Pagination
  }
})
export default class WorkRecordList extends Vue {
  // 是否载入中
  private listLoading: boolean = false
  // 请求参数Query
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }
  // 请求参数body
  private listQueryData = {
    courseName: ''
  }
  // 作业提交列表
  private listResult: IWorkRecordPageVO = {}

  /**
   * 作业提交列表
   */
  private async getWorkRecordPageList() {
    this.listLoading = true
    this.listResult = await getWorkRecordPageList(
      this.listQuery,
      this.listQueryData
    )
    this.listLoading = false
  }

  /**
   * 跳转到批阅详情页面
   */
  private goToWorkRecordReadOverAllView(courseWorkId: number) {
    this.$router.push({
      path: `/organization/work-record-overall?courseWorkId=${courseWorkId}`
    })
  }

  // 监控 watch
  // 搜索栏
  @Watch('listQueryData', { deep: true, immediate: true })
  private watchListQueryData(newVal: string) {
    if (newVal == '') {
      return
    }
    this.getWorkRecordPageList()
  }

  // 翻页 pageSize
  @Watch('listQuery.pageSize', { immediate: true })
  private watchListQueryPageSize(newVal: number) {
    this.listQuery.pageNo = 1
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

