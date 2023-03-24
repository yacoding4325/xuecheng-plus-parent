
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
        <span class="sign">忘记密码</span>
      </div>
      <div class="forget-password">
        <div class="body">
          <!-- step 1 验证身份 -->
          <change-password-step1-verify-phone
            ref="step1"
            v-show="stepsActive === 0"
            @formInfo="handleFormInfo"
          />
          <!-- step 2 设置密码 -->
          <change-password-step2-setting-password
            ref="step2"
            v-show="stepsActive === 1"
            :phone="phone"
            :verifyToken="verifyToken"
          />
          <!-- step 3 完成 -->
          <change-password-step3-finish ref="step3" v-show="stepsActive === 2" />
        </div>
        <el-row :gutter="10">
          <el-col :span="stepsActive === 1 ? 12 : 0">
            <!-- 上一步 -->
            <el-button v-if="stepsActive === 1" style="width: 100%;" @click="handlePrev">上一步</el-button>
          </el-col>
          <el-col :span="stepsActive === 1 ? 12 : 24">
            <!-- 下一步 -->
            <el-button type="primary" style="width: 100%;" @click="handleNext">
              <template v-if="stepsActive === 0">下一步</template>
              <template v-else-if="stepsActive === 1">下一步</template>
              <template v-else>返回首页</template>
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangePasswordStep1VerifyPhone from './components/change-password-step1-verify-phone.vue'
import ChangePasswordStep2SettingPassword from './components/change-password-step2-setting-password.vue'
import ChangePasswordStep3Finish from './components/change-password-step3-finish.vue'

// TODO: 忘记密码和修改密码抽成组件
// TODO: 添加忘记密码步骤条
@Component({
  components: {
    ChangePasswordStep1VerifyPhone,
    ChangePasswordStep2SettingPassword,
    ChangePasswordStep3Finish
  }
})
export default class ChangePassword extends Vue {
  private portal_url = process.env.VUE_APP_CLIENT_PORTAL_URL

  // 当前step
  private stepsActive: number = 0

  private phone: string = ''
  private verifyToken: string = ''

  // 上一页
  private handlePrev() {
    this.stepsActive -= 1
  }

  // 下一页
  private async handleNext() {
    if (this.stepsActive === 0) {
      await (this.$refs['step1'] as ChangePasswordStep1VerifyPhone).verify()
      this.stepsActive += 1
    } else if (this.stepsActive === 1) {
      await (this.$refs[
        'step2'
      ] as ChangePasswordStep2SettingPassword).changePwd()
      this.stepsActive += 1
    } else {
      this.$router.push({
        path: '/login?isRegnew=0'
      })
    }
  }

  /**
   * 组件之间传值
   * TODO: 使用vuex
   */
  private handleFormInfo(formInfo: any) {
    this.phone = formInfo.phone
    this.verifyToken = formInfo.verifyToken
  }
}
</script>

<style lang="css" scoped>
.forget-password {
  width: 350px;
  margin: 0 auto;
}

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