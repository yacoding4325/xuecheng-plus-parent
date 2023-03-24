<template>
  <div class="workspace">
    <div class="banner">
      <span class="primary-title">机构成员</span>
      <el-button type="primary" size="medium" class="btn-add el-button" @click="handleShowDlg">+绑定用户</el-button>
    </div>

    <!-- 搜索栏 -->
    <!-- <div class="searcher">
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
    </div>-->

    <!-- 数据列表 -->
    <el-table
      class="dataList"
      v-loading="listLoading"
      :data="listData.items"
      border
      style="width: 100%"
      :header-cell-style="{textAlign: 'center'}"
    >
      <el-table-column prop="name" label="成员" width="100" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机" width="150" align="center"></el-table-column>
      <el-table-column prop="intro" label="成员介绍"></el-table-column>
      <!-- <el-table-column prop="createDate" label="关联课程数" align="center" width="100"></el-table-column> -->
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleUnbindUser(scope.$index, scope.row)">解绑</el-button>
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
    <BindDialog ref="dlg" :dialogVisible.sync="dialogVisible" @getList="getList"></BindDialog>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import Pagination from '@/components/pagination/index.vue'
import BindDialog from './bind-dialog.vue'
import {
  memberPageList,
  findUserByPhone,
  bindUser,
  unbindUser
} from '@/api/learning-member' // api interface 课程
import { ILearningMemberPageList, IMemberDTO } from '@/entity/learning-member'
import MixinTools from '@/utils/mixins.vue'
import { ElForm } from 'element-ui/types/form'

@Component({
  name: 'MemberList',
  components: {
    Pagination,
    BindDialog
  },
  filters: {}
})
export default class extends mixins(MixinTools) {
  // 类型选择弹出对话框
  private dialogVisible: boolean = false // 是否显示

  // 查询
  private listData: ILearningMemberPageList = {} // 数据体
  private listLoading: boolean = false // 是否载入中
  // api params
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }
  // api post body
  private listQueryData = {}

  // 业务函数
  private async getList() {
    this.listLoading = true
    this.listData = await memberPageList(this.listQuery)
    this.listLoading = false
  }

  // 生命周期 life
  created() {
    this.getList()
  }

  // 事件 handle

  /** 解绑
   */
  private async handleUnbindUser(index: number, row: IMemberDTO) {
    try {
      if (row.memberId) {
        await this.showConfirm('确认要解绑用户么?')
        await unbindUser(row.memberId)
        await this.getList()
      }
    } catch (error) {}
  }

  /** 显示绑定窗口
   */
  private handleShowDlg() {
    let dlg: BindDialog = this.$refs['dlg'] as BindDialog
    dlg.restForm()
    this.dialogVisible = true
  }

  // 监控 watch
  // 搜索栏
  // @Watch('listQueryData', { deep: true, immediate: true })
  // private watchListQueryData(newVal: string) {
  //   if (newVal == '') {
  //     return
  //   }
  //   this.getList()
  // }
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
