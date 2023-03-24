<template>
  <div class="course-list portal-content">
    <div class="workspace">
      <div class="banner">
        <span class="primary-title">订单明细</span>
      </div>

      <!-- 搜索栏 -->
      <div class="searcher">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-date-picker
              class="el-date-picker"
              style="width: 100%;"
              v-model="orderDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="handleOrderDateChange"
            ></el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="listQueryData.courseName"
              class="el-input"
              placeholder="请输入课程名称"
              clearable
            />
          </el-col>
          <el-col :span="4">
            <el-select
              v-model="listQueryData.status"
              class="el-input"
              placeholder="请选择结算状态"
              clearable
            >
              <el-option
                v-for="item in orderTypeStatus"
                :key="item.code"
                :label="item.desc"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="listQueryData.orderNo"
              class="el-input"
              placeholder="请输入订单号"
              clearable
            />
          </el-col>
          <el-col :span="4">
            <el-input
              v-model="listQueryData.userId"
              class="el-input"
              placeholder="请输入学员ID"
              clearable
            />
          </el-col>
          <el-col :span="2" style="text-align: right;">
            <el-button type="primary" size="medium" class="el-button" @click="getOrderPageList">查询</el-button>
          </el-col>
        </el-row>
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
        <el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>

        <el-table-column label="交易时间" align="center">
          <template slot-scope="scope">{{ scope.row.createDate | dateTimeFormat }}</template>
        </el-table-column>

        <el-table-column prop="userId" label="学员ID" align="center"></el-table-column>

        <el-table-column prop="coursePubName" label="课程名称" align="center"></el-table-column>

        <el-table-column label="交易金额" align="center">
          <template slot-scope="scope">&#165;{{ scope.row.price.toFixed(2) }}</template>
        </el-table-column>

        <el-table-column label="结算金额" align="center">
          <template slot-scope="scope">&#165;{{ scope.row.price.toFixed(2) }}</template>
        </el-table-column>

        <el-table-column prop="status" label="结算状态" align="center">
          <template slot-scope="scope">{{ getOrderTypeStatus(scope.row.status) }}</template>
        </el-table-column>
      </el-table>

      <!-- 翻页控制 -->
      <div class="dataList-pagination">
        <Pagination
          v-show="listResult.counts > 0"
          :total="listResult.counts"
          :page.sync="listQuery.pageNo"
          :limit.sync="listQuery.pageSize"
          @pagination="getOrderPageList"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Pagination from '@/components/pagination/index.vue'
import { IKVData } from '@/api/types'
import { ORDER_TYPE_STATUS } from '@/api/constants'
import { IOrderPageVO } from '@/entity/order-page-list'
import { getOrderPageList } from '@/api/orders'

@Component({
  components: {
    Pagination
  }
})
export default class OrderList extends Vue {
  // 订单交易类型状态
  private orderTypeStatus: IKVData[] = ORDER_TYPE_STATUS

  // 交易时间
  private orderDate: string[] = []
  // 是否载入中
  private listLoading: boolean = false
  // 请求参数Query
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }
  // 请求参数body
  private listQueryData = {
    orderStart: '',
    orderEnd: '',
    courseName: '',
    status: '',
    orderNo: '',
    userId: ''
  }
  // 订单列表
  private listResult: IOrderPageVO = {}

  // 计算属性
  getOrderTypeStatus(status: number) {
    let item = this.orderTypeStatus.find((value: IKVData) => {
      return status.toString() === value.code
    })
    return !item ? '' : item.desc
  }

  /**
   * 生命周期钩子
   */
  created() {
    this.getOrderPageList()
  }

  /**
   * 订单列表
   */
  private async getOrderPageList() {
    this.listLoading = true
    this.listResult = await getOrderPageList(this.listQuery, this.listQueryData)
    this.listLoading = false
  }

  /**
   * 处理交易时间
   */
  private handleOrderDateChange(orderDate: string[]) {
    if (orderDate && orderDate.length > 0) {
      this.listQueryData.orderStart = orderDate[0] + ' 00:00:00'
      this.listQueryData.orderEnd = orderDate[1] + ' 23:59:59'
    } else {
      this.listQueryData.orderStart = ''
      this.listQueryData.orderEnd = ''
    }
  }

  // 监控 watch
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

  .searcher {
    margin-top: 16px;
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