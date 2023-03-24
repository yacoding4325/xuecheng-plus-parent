<template>
  <div class="allclass-content">
    <div class="top-title">
      <span :class="{active: listPostBody.status == ''}" id="all" @click="handleState('')">全部课程</span>
      <span
        :class="{active: listPostBody.status == '600001'}"
        id="wait"
        @click="handleState('600001')"
      >待付款</span>
      <span
        :class="{active: listPostBody.status == '600002'}"
        id="succ"
        @click="handleState('600002')"
      >已完成</span>
      <span
        :class="{active: listPostBody.status == '600004'}"
        id="outs"
        @click="handleState('600004')"
      >已关闭</span>
    </div>
    <div class="nav">
      <div>
        <span class="col-md-6">课程信息</span>
        <span class="col-md-4">
          <em>订单金额</em>
          <em>实付款</em>
          <em>交易状态</em>
        </span>
        <span class="col-md-2">交易操作</span>
      </div>
    </div>
    <div class="content">
      <div class="all show">
        <div class="allclass-cont">
          <div class="content">
            <!-- 数据列表 -->
            <template v-if="listData.items !== undefined">
              <div class="item" v-for="(item, index) in listData.items" :key="index">
                <div class="time-orderid">
                  <span>{{item.createDate|dataText}}</span>
                  订单号：{{item.orderNo}}
                  <!-- 删除 -->
                  <i
                    v-if="item.status == '600003' || item.status == '600004'|| item.status == '600005'"
                    class="glyphicon glyphicon-trash"
                  ></i>
                </div>
                <div class="item-content">
                  <div class="item-left col-lg-2">
                    <img src="../../../assets/img/dem.png" width="100%" alt />
                  </div>
                  <div class="item-cent col-lg-4">
                    <div class="title">{{item.coursePubName}}</div>
                    <div class="star-show">
                      <div class="score">
                        <i></i>
                      </div>
                    </div>
                    <div class="text">
                      课程打分
                      <em>4.9星</em>
                    </div>
                    <div class="cont">有效日期：{{item.startTime|dataText}}-{{item.endTime|dataText}}</div>
                  </div>
                  <div class="col-lg-4 lab-info">
                    <span>${{item.price|numberText}}</span>
                    <span>${{item.price|numberText}}</span>
                    <span>{{item.status|statusText}}</span>
                  </div>

                  <!-- 操作 -->
                  <div class="item-rit col-lg-2">
                    <!-- 
                      600001 初始态 
                      600002 已支付
                      600003 已取消
                      600004 已关闭
                      600005 已退款
                    -->
                    <a href="#" v-if="item.status == '600001'">去 支 付</a>
                    <a href="#" v-if="item.status == '600001'">取消订单</a>
                    <a href="#" class="class-com" v-if="item.status == '600002'">课程评价</a>
                    <!-- <span
                      class="undef"
                      v-if="item.status == '600003' || item.status == '600004'|| item.status == '600005'"
                    >——</span>-->
                  </div>
                </div>
              </div>
            </template>

            <!-- 翻页控制 -->
            <div class="page-item">
              <Pagination
                v-show="listData.counts > 0"
                :total="listData.counts"
                :page.sync="listQuery.pageNo"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import Pagination from '@/components/pagination/index.vue'
import moment from 'moment'
moment.locale('zh-cn')

import { ORDER_TYPE_STATUS } from '@/api/constants' // 通用常量定义

import { getMyOrdersPageList } from '@/api/my-orders'
import { IMyOrdersPageList } from '@/entity/my-orders-page-list'

@Component({
  name: 'Orders',
  components: {
    Pagination
  },
  filters: {
    dataText: function(value: any) {
      if (!value) {
        return ''
      }
      return moment(value).format('YYYY.MM.DD')
    },
    numberText: function(value: any) {
      return parseInt(value)
    },
    statusText: function(value: string) {
      let finds = ORDER_TYPE_STATUS.filter(item => {
        return item.code == value
      })
      if (finds && finds.length > 0) {
        return finds[0].desc
      }
    }
  }
})
export default class extends mixins(MixinTools) {
  // 查询
  private listData: IMyOrdersPageList = {} // 数据体
  private listLoading: boolean = false // 是否载入中
  // api params
  private listQuery = {
    pageNo: 1,
    pageSize: 10
  }
  private listPostBody = {
    status: ''
  }

  // 生命周期 life
  created() {
    this.getList()
  }

  // 业务函数
  // 数据列表
  private async getList(state: string = '') {
    this.listLoading = true
    this.listPostBody.status = state
    this.listData = await getMyOrdersPageList(this.listQuery, this.listPostBody)
    this.listLoading = false
  }

  // 状态筛选
  private handleState(state: string) {
    this.getList(state)
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
@import '@/scss/variables';
.allclass-content {
  width: 930px;
  .top-title {
    padding: 20px 0 20px 30px;
    span {
      display: inline-block;
      cursor: pointer;
      margin-right: 20px;
      padding-right: 20px;
      font-size: 16px;
      line-height: 16px;
      color: $master-color-4;
      border-right: solid 1px $master-color-4;
    }
    span:last-child {
      border: none;
    }
    .active {
      color: $master-color-5;
    }
  }
  .nav {
    background: $master-color-0;
    padding: 10px;
    text-align: center;
    margin: 10px 10px 10px 25px;
    height: 40px;
    span {
      em {
        display: inline-block;
        text-align: left;
        width: 33%;
      }
    }
  }
  .all,
  .wait,
  .succ,
  .outs {
    display: none;
  }

  .allclass-cont {
    padding: 0px 10px 10px 25px;
    .item {
      overflow: hidden;
      margin-bottom: 10px;
      background: $master-color-0;
      .time-orderid {
        color: $master-color-4;
        border-bottom: solid 1px $master-color-4;
        padding: 15px 20px 5px 20px;
        span {
          display: inline-block;
          margin-right: 40px;
        }
        i.glyphicon {
          float: right;
        }
      }
      .item-content {
        padding: 15px;
        overflow: hidden;
        .item-left {
          text-align: left;
          padding: 0px;
        }
        .item-cent {
          position: relative;
          .title {
            font-size: 20px;
            span {
              background: $master-color-3;
              color: $master-color-0;
              display: inline-block;
              position: relative;
              top: -2px;
              font-size: 14px;
              padding: 2px 7px;
              margin-left: 10px;
            }
            .out {
              color: $master-color-0;
              background: $master-color-4;
            }
            .Invalid {
              color: $master-color-0;
              background: $master-color-2;
            }
            .success {
              color: $master-color-0;
              background: $greenTheme;
            }
          }
          .cont {
            color: $master-color-2;
          }
          .more {
            position: absolute;
            right: 15px;
            bottom: 0px;
            text-decoration: none;
          }
          .star-show {
            width: 109px;
            height: 19px;
            margin: 8px 0px;
            display: inline-block;
            background: url(../../../assets/img/star-show.png) no-repeat;
            background-size: contain;
            .score {
              display: inline-block;
              i {
                display: none;
              }
            }
          }
          .text {
            display: inline-block;
            color: $master-color-4;
            margin: 0 10px;
            em {
              color: $master-color-3;
            }
          }
          .watermark {
            position: absolute;
            right: 90px;
            top: -5px;
            z-index: 2;
          }
        }
        .lab-info {
          padding-top: 30px;
          font-size: 14px;
          color: $master-color-1;
          span {
            display: inline-block;
            width: 33%;
          }
        }
        .item-rit {
          text-align: right;
          a {
            font-size: 14px;
            color: $master-color-3;
            border: solid 1px $master-color-3;
            display: inline-block;
            width: 90px;
            text-align: center;
            padding: 3px 0;
            margin: 5px 0;
          }
          .go-pay {
            background: $master-color-3;
            color: $master-color-0;
          }
          .class-com {
            border: solid 1px $master-color-5;
            background: $master-color-0;
            color: $master-color-5;
          }
        }
      }
    }
    .page-item {
      text-align: center;
      margin: 40px 0;
      span {
        border-left: solid 2px $backColor;
        border-right: solid 2px $backColor;
        display: inline-block;
        padding: 2px 10px;
        color: $master-color-4;
        cursor: pointer;
      }
      span:hover {
        color: $master-color-0;
        background: $master-color-5;
      }
      .active {
        color: $master-color-0;
        background: $master-color-5;
      }
    }
  }
}
</style>
