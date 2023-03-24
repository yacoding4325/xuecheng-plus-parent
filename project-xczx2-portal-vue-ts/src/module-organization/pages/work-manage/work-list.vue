<template>
  <div class="course-list portal-content">
    <div class="workspace">
      <div class="banner">
        <span class="primary-title">作业管理</span>
        <el-button
          type="primary"
          size="medium"
          class="btn-add el-button"
          @click="handleOpenAddWorkDialog"
        >+新增作业</el-button>
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
        <el-table-column prop="title" label="作业信息" width="400" align="center"></el-table-column>

        <el-table-column label="绑定课程" align="center">
          <template slot-scope="scope">{{ scope.row.bindCourses | bindCoursesFormat }}</template>
        </el-table-column>

        <el-table-column prop="userNum" label="答题人数" align="center"></el-table-column>

        <el-table-column label="修改时间" align="center">
          <template slot-scope="scope">{{ scope.row.changeDate | dateTimeFormat }}</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleOpenEditWorkDialog(scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="mini"
              @click="handleOpenDeleteWorkConfirm(scope.row.workId)"
            >移除</el-button>
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
          @pagination="getWorkPageList"
        />
      </div>
    </div>

    <!-- 上传资料对话框 -->
    <work-add-dialog
      :dialogVisible.sync="dialogVisible"
      :work="work"
      @refreshList="getWorkPageList"
    ></work-add-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import WorkAddDialog from './components/work-add-dialog.vue'
import { IWorkPageList, IWorkDTO, IWorkVO } from '@/entity/work-page-list'
import { getWorkPageList, deleteWork, defaultWork } from '@/api/works'

@Component({
  components: {
    Pagination,
    WorkAddDialog
  },
  filters: {
    bindCoursesFormat: (value: string[]) => {
      if (value == null || value.length == 0) {
        return ''
      }
      return '《' + value.join('》，《') + '》'
    }
  }
})
export default class WorkList extends Vue {
  // 是否载入中
  private listLoading: boolean = false
  // 请求参数Query
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }
  // 作业列表
  private listResult: IWorkPageList = {}
  // 新增作业对话框
  private dialogVisible: boolean = false
  // 单条作业
  private work: IWorkVO = Object.assign({}, defaultWork)

  /**
   * 作业列表
   */
  private async getWorkPageList() {
    this.listLoading = true
    this.listResult = await getWorkPageList(this.listQuery)
    this.listLoading = false
  }

  /**
   * 新增作业
   */
  private handleOpenAddWorkDialog() {
    this.work = Object.assign({}, defaultWork)
    this.dialogVisible = true
  }

  /**
   * 编辑作业
   */
  private handleOpenEditWorkDialog(row: IWorkDTO) {
    this.work.workId = row.workId
    this.work.title = row.title
    this.work.question = row.question
    this.dialogVisible = true
  }

  /**
   * 移除作业
   * TODO: 等待后台业务确认
   */
  private handleOpenDeleteWorkConfirm(workId: number) {
    this.$confirm('此操作将永久移除该作业, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        let work: IWorkDTO = await deleteWork(workId)
        this.getWorkPageList()

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

  // 监控 watch
  // 搜索栏
  @Watch('listQueryData', { deep: true, immediate: true })
  private watchListQueryData(newVal: string) {
    if (newVal == '') {
      return
    }
    this.getWorkPageList()
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
