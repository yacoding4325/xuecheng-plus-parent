<template>
  <div>
    <PortalHeader />

    <!-- 头部 banner -->
    <div class="personal-header"></div>

    <!-- container -->
    <div class="personal-container">
      <!-- 左侧导航 -->
      <!--左侧列表导航-->
      <div class="personal-nav pull-left">
        <div class="nav nav-stacked text-left">
          <div class="title">个人中心</div>
          <div class="my-ico">
            <img src="../../assets/img/myImg.jpg" />
            <p>梦醒时分</p>
          </div>
          <div class="item">
            <li class="active">
              <router-link to="/personal/my-course" class="glyphicon glyphicon-tower">
                我的课程
                <i class="pull-right">></i>
              </router-link>
            </li>
            <li>
              <router-link to="/personal/my-order" class="glyphicon glyphicon-list-alt">
                我的订单
                <i class="pull-right">></i>
              </router-link>
            </li>
            <!-- <li>
              <a href class="glyphicon glyphicon-envelope">
                我的消息
                <i class="pull-right">></i>
              </a>
            </li>
            <li>
              <a href class="glyphicon glyphicon-heart">
                我的收藏
                <i class="pull-right">></i>
              </a>
            </li>-->
            <li>
              <router-link to="/personal/setting" class="glyphicon glyphicon-cog">
                个人设置
                <i class="pull-right">></i>
              </router-link>
            </li>
            <li>
              <!-- TODO: 退出登录并跳转首页 -->
              <router-link to="/" class="glyphicon glyphicon-log-out">
                退出
                <i class="pull-right">></i>
              </router-link>
            </li>
          </div>
        </div>
      </div>

      <!-- 内容区 -->
      <div class="personal-content">
        <router-view />
      </div>
    </div>

    <PortalFooter />
  </div>
</template> 

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PortalHeader from '@/components/portal-header/index.vue' // @ is an alias to /src
import PortalFooter from '@/components/portal-footer/index.vue'

@Component({
  name: 'Layout',
  components: {
    PortalHeader,
    PortalFooter
  }
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/variables';
@import '@/scss/base';

body {
  background-color: #f4f5f7;
}

.personal-container {
  margin: 0px auto;
  width: 1200px;
  min-height: 600px;
}

.personal-content {
  width: 1200px;
  padding-left: 200px;
}

// 头部 banner
.personal-header {
  background: top center no-repeat #000000;
  background-size: cover;
  position: relative;
  // top: -10px;
  padding: 20px 0;
  height: 200px;
  background-image: url(../../assets/img/banner.png);
  .personal-info {
    width: 1170px;
    margin: 0 auto;
    padding-left: 250px;
    padding-top: 40px;
    color: $master-color-0;
  }
  //.title{
  //    font-size: 24px;
  //    line-height: 45px;
  //    position: relative;
  //    bottom:-10px;
  //}
  //input{height: 35px;margin-top: 7px;}
  //.input-search{border:solid 2px $master-color-5; width: 280px; padding-left:10px; }
  //.search-buttom{border:solid 2px $master-color-5;background: $master-color-5;color:$master-color-0;font-weight: bold;width: 80px;}
}

// 导航
.personal-nav {
  height: 450px;
  width: 200px;
  position: relative;
  z-index: 11;
  top: -70px;
  padding: 0px !important;
  background: $master-color-0;
  .title {
    font-size: 18px;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
    color: $master-color-5;
  }
  .my-ico {
    width: 100%;
    text-align: center;
    img {
      box-shadow: 2px 2px 4px $black;
      width: 70%;
      margin: 0px auto;
      border-radius: 50%;
    }
    p {
      text-align: center;
      line-height: 50px;
    }
  }
  .active {
    a {
      color: $master-color-5;
    }
  }
  li a:hover,
  li a:active {
    color: $master-color-5;
  }
  li {
    color: $master-color-1;
  }
  a {
    padding-top: 5px !important;
    color: $master-color-1;
    font-size: 14px;
    line-height: 32px;
    border-bottom: dashed 1px $master-color-6;
  }
  a:before {
    position: relative;
    top: 0px;
    font-size: 12px;
  }
  .item {
    background: $master-color-0;
    padding: 20px 15px;
    padding-top: 0px;
    a {
      display: block;
      text-decoration: none;
    }
  }
}
</style>
