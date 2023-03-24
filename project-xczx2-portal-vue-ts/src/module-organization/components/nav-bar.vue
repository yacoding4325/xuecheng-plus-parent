<template>
  <div class="nav-bar">
    <el-tabs class="el-tabs" v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="网站首页" >
        <a href="http://www.xuecheng-plus.com">学成在线首页</a>
       
      </el-tab-pane>
      <el-tab-pane label="机构管理" name="first">
        <router-link to="/organization/company">机构资料</router-link>
        <div class="divider"></div>
        <router-link to="/organization/member">机构成员</router-link>
      </el-tab-pane>
      <el-tab-pane label="教务教学" name="second">
        <router-link to="/organization/course-list">课程管理</router-link>
        <div class="divider"></div>
        <router-link to="/organization/live-list">直播管理</router-link>
        <div class="divider"></div>
        <router-link to="/organization/media-list">媒资管理</router-link>
        <div class="divider"></div>
        <router-link to="/organization/work-list">作业管理</router-link>
        <div class="divider"></div>
        <router-link to="/organization/course-comment-list">评价管理</router-link>
        <div class="divider"></div>
        <router-link to="/organization/work-record-list">作业批改</router-link>
      </el-tab-pane>
      <el-tab-pane label="财务管理" name="third">
        <router-link to="/organization/order-list">财务管理</router-link>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss">
.nav-bar {
  .el-tabs {
    // 去阴影
    .el-tabs--border-card {
      border: 0px solid #dcdfe6;
      -webkit-box-shadow: 0 0px 0px 0;
      box-shadow: 0 0px 0px 0;
    }
    // 背景
    .el-tabs__nav-scroll {
      background-color: #2cb4ff;
      padding-left: 60px;
      padding-top: 6px;
    }
    // 项
    .el-tabs__item.is-top.is-active {
      color: #333333;
    }
    .el-tabs__item.is-top {
      color: #ffffff;
      border-radius: 6px 6px 0px 0px;
    }
    .el-tabs__item.is-top:hover {
      color: #999999;
    }
  }

  .divider {
    display: inline-block;
    margin: 0px 20px;
    width: 1px;
    height: 13px;
    background-color: #d7d7d7;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'NavBar'
})
export default class extends Vue {
  private activeName: string = 'first'

  private handleClick(tab: any, event: any) {}
}
</script>
