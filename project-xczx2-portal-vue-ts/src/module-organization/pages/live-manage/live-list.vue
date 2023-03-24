<template>
  <div class="course-list portal-content">
    <div class="workspace">
      <div class="banner">
        <span class="primary-title">直播管理</span>
      </div>

      <!-- 搜索栏 -->
      <div class="searcher">
        <el-input
          class="el-input"
          placeholder="直播列表"
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
        <el-table-column prop="courseName" label="课程信息" width="400" align="center"></el-table-column>

        <el-table-column prop="teachplanName" label="课程大纲" align="center"></el-table-column>

        <el-table-column label="直播时间" align="center">
          <template slot-scope="scope">{{ scope.row.liveStart | dateTimeFormat }}</template>
        </el-table-column>

        <el-table-column label="类型" align="center">
          <template slot-scope="scope">{{ scope.row.isPreview === '1' ? '免费' : '收费'}}</template>
        </el-table-column>

        <el-table-column label="推流地址" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.pushUrl">{{ scope.row.pushUrl }}</span>
            <el-button v-else type="text" size="mini" @click="handleGetPushUrl(scope.row)">获取推流地址</el-button>
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
          @pagination="getLivePageList"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import {
  ILivePageList,
  ILiveCourseDTO,
  IPushUrlDTO
} from '@/entity/live-page-list'
import { getLivePageList, getPushUrl } from '@/api/live'

@Component({
  components: {
    Pagination
  }
})
export default class LiveList extends Vue {
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
  // 直播列表
  private listResult: ILivePageList = {}

  /**
   * 直播列表
   */
  private async getLivePageList() {
    this.listLoading = true
    this.listResult = await getLivePageList(this.listQuery, this.listQueryData)
    this.listLoading = false
  }

  /**
   * 获取推流地址
   */
  private async handleGetPushUrl(row: ILiveCourseDTO) {
    let result: IPushUrlDTO = await getPushUrl(row)
    if (result.state !== 0) {
      this.$message.error(`获取推流地址失败：${result.message}`)
      return
    }
    row.pushUrl = result.pushUrl
  }

  // 监控 watch
  // 搜索栏
  @Watch('listQueryData', { deep: true, immediate: true })
  private watchListQueryData(newVal: string) {
    if (newVal == '') {
      return
    }
    this.getLivePageList()
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
