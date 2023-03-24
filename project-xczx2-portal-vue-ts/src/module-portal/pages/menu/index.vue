<template>
    <div class="portal-index">
      <h1>学成在线v2 门户页</h1>
      <br />
      <div class="row"> 
        <dl class="col-md-3">
          <dt>1. 登录注册</dt>
          <dd>
            <router-link to="/login?isRegnew=0">登录</router-link>
          </dd>
          <dd>
            <router-link to="/login?isRegnew=1">注册</router-link>
          </dd>
          <dd>
            <router-link to="/forget-password">忘记密码</router-link>
          </dd>
        </dl>
        <dl class="col-md-3">
          <dt>6. 入驻</dt>
          <dd>
            <router-link to="/entering/company-entering">机构入驻</router-link>
          </dd>
          <dd>
            <router-link to="/entering/personal-entering">个人入驻</router-link>
          </dd>
        </dl>
        <dl class="col-md-3">
          <dt>7. 课程管理</dt>
          <dl>
            <dt>7.1. 机构/个人管理</dt>
            <dd>
              <router-link to="/organization/company">机构资料</router-link>
            </dd>
            <dd>
              <router-link to="/organization/member">机构成员</router-link>
            </dd>
          </dl>
          <dl>
            <dt>7.2. 教学教务</dt>
            <dd>
              <router-link to="/organization/course-list">课程管理</router-link>
            </dd>
            <dd>
              <router-link to="/organization/course-add?teachmode=200002">添加录播课程</router-link>
            </dd>
            <dd>
              <router-link to="/organization/course-add?teachmode=200003">添加直播课程</router-link>
            </dd>
            <dd>
              <router-link to="/organization/live-list">直播管理</router-link>
            </dd>
            <dd>
              <router-link to="/organization/media-list">媒资管理</router-link>
            </dd>
            <dd>
              <router-link to="/organization/work-list">作业管理</router-link>
            </dd>
            <dd>
              <router-link to="/organization/course-comment-list">评价管理</router-link>
            </dd>
            <dd>
              <router-link to="/organization/work-record-list">作业批改</router-link>
            </dd>
            <dd>
              <router-link to="/organization/order-list">财务管理</router-link>
            </dd>
          </dl>
        </dl>
        <dl class="col-md-3">
          <dt>8. 个人中心</dt>
          <dd>
            <router-link to="/personal/my-course">我的课程</router-link>
          </dd>
          <dd>
            <router-link to="/personal/my-order">我的订单</router-link>
          </dd>
          <dd>
            <router-link to="/personal/setting">个人设置</router-link>
          </dd>
          <dd>
            <router-link to="/personal/change-password">修改密码</router-link>
          </dd>
        </dl>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  
  // @Component({})
  export default class extends Vue {}
  </script>
  
  <style lang="scss" scoped>
  body {
    background-color: #fafafa;
  }
  .portal-index {
    padding: 10px;
    dt {
      font-size: 30px;
      color: #303133;
    }
    dd {
      font-size: 20px;
      color: #909399;
    }
  }
  </style>
  