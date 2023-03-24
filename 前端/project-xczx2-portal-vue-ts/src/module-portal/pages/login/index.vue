<template>
  <div class="register">
    <a :href="portal_url + '/pages/learing-index.html'" class="backIndex">
      <i class="el-icon-s-home"></i>&nbsp;返回首页
    </a>
    <div class="register-body container text-center">
      <div class="signIco">
        <img src="@/assets/img/logoIco.png" alt="logo" width="180" />
      </div>
      <div class="signTit cl">
        <span class="sign" v-bind:class="{ activ: !isRegnew }" @click="onTabSelect('sign')">登录</span>
        <span class="reg" v-bind:class="{ activ: isRegnew }" @click="onTabSelect('reg')">注册</span>
      </div>
      <!-- 登录 -->
      <login-form v-show="!isRegnew"></login-form>
      <!-- 注册 -->
      <register-form v-show="isRegnew" @changeState="changeState"></register-form>
    </div>
    <!-- <footer>
      <p>
        <a href="#">关于我们</a>
        <a href="#">联系我们</a>
        <a href="#">客户服务</a>
        <a href="#">管理团队</a>
        <a href="#">新手指南</a>
        <a href="#">合作伙伴</a>
      </p>
      <p>地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096 电话：400-618-4000 传真：010-82935100 邮箱：zhanghj@itcast.cn 京ICP备00001号 公安网安备110112119号</p>
    </footer>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Form as ElForm, Input } from 'element-ui'
import LoginForm from './components/login-form.vue'
import RegisterForm from './components/register-form.vue'

@Component({
  name: 'Register',
  components: {
    LoginForm,
    RegisterForm
  }
})
export default class extends Vue {
  private isRegnew: boolean = false
  private portal_url = process.env.VUE_APP_CLIENT_PORTAL_URL

  created() {
    let isRegnew: any = this.$route.query.isRegnew
    this.isRegnew = isRegnew === '0' ? false : true
  }

  private onTabSelect(type: string) {
    if (type == 'reg') {
      this.isRegnew = true
    } else {
      this.isRegnew = false
    }
  }

  private changeState(isRegnew: boolean) {
    this.isRegnew = isRegnew
  }
}
</script>

<style lang="css" scoped>
/** 登录&注册 - start **/
.register {
  padding: 15px;
  /** 登录注册 - start **/
}

.register a {
  color: #787d82;
}

.register a:hover {
  color: #00a4ff;
}

.register .container {
  min-height: 550px;
}

.register .backIndex,
.register .backIndex:hover {
  font-size: 18px;
  color: #999;
  text-decoration: none;
}

.register .backIndex::before {
  content: ' ';
  display: inline-block;
  position: relative;
  top: 3px;
  margin-right: 4px;
  width: 22px;
  height: 20px;
  background: url(/assets/img/asset-icoGather.png) 0px -114px no-repeat;
}

.register .show {
  display: block;
}

.register .signIco {
  margin-top: 40px;
}

.register .signTit {
  text-align: center;
  margin-top: 30px;
  color: #787d82;
}

.register .signTit span {
  cursor: pointer;
  display: inline-block;
  margin: 0 70px;
  /* width: 50px; */
  line-height: 30px;
  font-size: 18px;
}

.register .signTit .activ {
  border-bottom: solid 2px #00a4ff;
  color: #00a4ff;
}

.register .signItem,
.register .regItem {
  /* display: none; */
  width: 350px;
  position: relative;
  margin: 0 auto;
  text-align: left;
  color: #787d82;
}

.register .signItem div,
.register .regItem div {
  position: relative;
  margin: 15px 0;
}

.register .signItem div .proof,
.register .regItem div .proof {
  display: none;
  position: absolute;
  left: 12px;
  bottom: -25px;
  font-size: 12px;
}

.register .signItem .setSing,
.register .regItem .setSing {
  position: relative;
  bottom: -10px;
}

.register .signItem .setSing label,
.register .regItem .setSing label {
  font-weight: initial;
}

.register .signItem .setSing .forget,
.register .regItem .setSing .forget {
  float: right;
}

.register .signItem .setSing .proof,
.register .regItem .setSing .proof {
  bottom: -8px;
}

.register .signItem .textInput,
.register .regItem .textInput {
  width: 100%;
}

.register .signItem input,
.register .regItem input {
  padding: 0 10px;
}

.register .signItem .phoneBox input,
.register .regItem .phoneBox input {
  display: inline-block;
}

.register .signItem .phoneBox .textInput,
.register .regItem .phoneBox .textInput {
  width: 72%;
}

.register .signItem .phoneBox .codeSub,
.register .regItem .phoneBox .codeSub {
  height: 30px;
  width: 94px;
}

.register .regItem {
  display: none;
  width: 350px;
  position: relative;
  margin: 0 auto;
  text-align: left;
  color: #787d82;
}

.register .regItem div {
  position: relative;
  margin: 15px 0;
}

.register .regItem div .proof {
  display: none;
  position: absolute;
  bottom: -25px;
  font-size: 12px;
}

.register .submitBut,
.register .registerBut {
  cursor: pointer;
  font-size: 18px;
  color: #f3f5f7;
  background: #00a4ff;
  text-align: center;
  line-height: 40px;
}

.register footer {
  color: #787d82;
  background: #f3f5f7;
  text-align: center;
  bottom: 0px;
}

.register footer a {
  display: inline-block;
  padding: 0 40px;
  margin-bottom: 20px;
  line-height: 15px;
  border-right: solid 1px #787d82;
}
</style>

<style lang="scss">
.register {
  .el-form-item__label {
    padding: 0px;
  }

  .signItem .el-form-item__content {
    .el-input {
      margin: 0px;
    }
  }
}
</style>
