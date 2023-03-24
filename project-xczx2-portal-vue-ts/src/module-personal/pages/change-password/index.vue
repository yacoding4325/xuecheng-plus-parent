
<template>
  <div class="personal-content pull-right">
    <div class="set-cant">
      <div class="top">
        <div class="tit">
          <span>
            <em>当前位置:</em> 个人中心 > 修改密码
          </span>
        </div>
      </div>
      <div class="pho-cont-one">
        <div class="step-box">
          <span class="start">
            <em>1</em>
            <i>验证身份</i>
          </span>
          <span class="no-start">
            <em>2</em>
            <i>设置密码</i>
          </span>
          <span class="no-start">
            <em>3</em>
            <i>完成</i>
          </span>
        </div>
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
        <div class="footer">
          <!-- 上一步 -->
          <el-button v-if="stepsActive === 1" @click="handlePrev">上一步</el-button>
          <!-- 下一步 -->
          <el-button type="primary" @click="handleNext">
            <template v-if="stepsActive === 0">下一步</template>
            <template v-else-if="stepsActive === 1">下一步</template>
            <template v-else>返回首页</template>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangePasswordStep1VerifyPhone from './components/change-password-step1-verify-phone.vue'
import ChangePasswordStep2SettingPassword from './components/change-password-step2-setting-password.vue'
import ChangePasswordStep3Finish from './components/change-password-step3-finish.vue'

@Component({
  components: {
    ChangePasswordStep1VerifyPhone,
    ChangePasswordStep2SettingPassword,
    ChangePasswordStep3Finish
  }
})
export default class ChangePassword extends Vue {
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
        path: '/personal/my-course'
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

<style lang="scss" scoped>
.body {
  padding: 60px 0px 50px 0px;
  // background-color: darkcyan;
}

.footer {
  padding: 20px 0px 20px 0px;
  // border-top: 1px solid #ededed;
  text-align: center;
}

@import '@/scss/variables';
.personal-content {
  // width: 930px;
  //修改邮箱
  .set-cant {
    padding: 0 10px;
    .top {
      .tit {
        padding: 10px 0;
        font-size: 18px;
        line-height: 45px;
        color: $black;
        em {
          color: $master-color-4;
        }
      }
    }
    .mail-cont {
      background: $master-color-0;
      padding: 30px 40px;
      min-height: 415px;
      p {
        margin: 20px;
      }
      input {
        width: 50%;
      }
      .sendBut {
        background: $master-color-5;
        color: $master-color-0;
        display: inline-block;
        padding: 2px 15px;
      }
    }
    .mail-success {
      background: $master-color-0;
      padding: 60px 40px;
      min-height: 415px;
      text-align: center;
      .lab-font {
        font-size: 22px;
        line-height: 70px;
      }
      .go-back a {
        background: $master-color-5;
        color: $master-color-0;
        display: inline-block;
        padding: 2px 15px;
      }
    }
    .mail-change {
      background: $master-color-0;
      position: relative;
      min-height: 415px;
      .title {
        color: $master-color-4;
        padding-left: 80px;
        padding-top: 30px;
        span {
          color: $master-color-5;
        }
      }
      .cont-box {
        position: relative;
        padding: 0 40px;
        text-align: center;
        .phone,
        .mail {
          display: inline-block;
          position: absolute;
          width: 350px;
          height: 260px;
          padding: 40px 20px;
          border: solid 1px $master-color-8;
          margin: 20px 50px;
          a {
            display: inline-block;
            padding: 2px 20px;
            background: $master-color-5;
            color: $master-color-0;
          }
          .ico {
            font-size: 30px;
            color: $master-color-8;
          }
          .tit {
            font-size: 18px;
          }
          .lab {
            font-size: 14px;
            margin-bottom: 30px;
            color: $master-color-4;
          }
        }
        .phone {
          left: 30px;
        }
        .mail {
          right: 30px;
        }
      }
    }
    //修改昵称
    .name-cont {
      background: $master-color-0;
      position: relative;
      min-height: 415px;
      .top-lab {
        position: absolute;
        width: 100%;
        padding: 5px 10px;
        top: 0px;
        background: $master-color-9;
        color: $master-color-8;
      }
      .top-lab:before {
        content: ' ';
        position: relative;
        display: inline-block;
        background: url('../../../assets/img/labIco.png') center left no-repeat;
        width: 20px;
        height: 15px;
        top: 1px;
        left: 0px;
      }
      .name-box {
        width: 350px;
        padding-top: 80px;
        margin: 0px auto;
        div {
          margin: 10px 0;
        }
        .name {
          width: 250px;
        }
        .num-code {
          width: 180px;
        }
        .code {
          display: inline-block;
          text-align: center;
          background: $master-color-6;
          color: $master-color-5;
          font-size: 18px;
          width: 70px;
        }
        .sub-lab {
          background: $master-color-5;
          color: $master-color-0;
          border: none;
          padding: 2px 20px;
          margin: 20px 100px;
        }
      }
    }
    //修改手机号
    .pho-cont-one {
      background: $master-color-0;
      position: relative;
      min-height: 415px;
      .step-box {
        position: relative;
        width: 80%;
        padding-top: 20px;
        margin: 0px auto;
        span {
          display: inline-block;
          position: relative;
          z-index: 3;
          width: 50px;
          height: 50px;
          line-height: 30px;
          border-radius: 50%;
          text-align: center;
          color: $master-color-0;
          font-size: 20px;
          em {
            display: inline-block;
            position: relative;
            z-index: 6;
          }
          i {
            display: inline-block;
            position: absolute;
            font-size: 12px;
            text-align: center;
            width: 100px;
            left: 50%;
            margin-left: -50px;
            top: 40px;
            color: $master-color-5;
          }
        }
        span:nth-child(2) {
          margin: 0 39%;
        }
        .finish {
          position: relative;
          width: 30px;
          height: 30px;
          margin: 10px;
          background: rgba(0, 165, 255, 1);
          z-index: 5;
        }
        .finish::before,
        .finish::after {
          content: ' ';
          display: inline-block;
          position: absolute;
          z-index: 4;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          left: -5px;
          top: -5px;
          background: rgba(0, 165, 255, 1);
        }
        .finish::after {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          z-index: 5;
          left: -10px;
          top: -10px;
          background: rgba(0, 165, 255, 0.5);
        }
        .start {
          position: relative;
          width: 30px;
          height: 30px;
          margin: 10px;
          background: rgba(0, 165, 255, 1);
          z-index: 5;
        }
        .start::before,
        .start::after {
          content: ' ';
          display: inline-block;
          position: absolute;
          z-index: 4;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          left: -5px;
          top: -5px;
          background: rgba(0, 165, 255, 0.4);
        }
        .start::after {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          z-index: 5;
          left: -10px;
          top: -10px;
          background: rgba(0, 165, 255, 0.2);
        }
        .no-start {
          position: relative;
          width: 30px;
          height: 30px;
          margin: 10px;
          background: rgba(150, 150, 150, 1);
          z-index: 5;
        }
        .no-start::before,
        .no-start::after {
          content: ' ';
          display: inline-block;
          position: absolute;
          z-index: 4;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          left: -5px;
          top: -5px;
          background: rgba(150, 150, 150, 0.6);
        }
        .no-start::after {
          content: ' ';
          display: inline-block;
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          z-index: 3;
          left: -10px;
          top: -10px;
          background: rgba(150, 150, 150, 0.2);
        }
      }
      .step-box::before {
        content: ' ';
        position: absolute;
        background: $master-color-4;
        width: 90%;
        height: 2px;
        left: 5%;
        top: 45px;
      }
      .formItem {
        margin-top: 80px;
        margin-left: 20px;
        p {
          margin: 10px 0;
        }
        .lab {
          margin-left: 150px;
          color: $master-color-4;
        }
        .lab:before {
          content: ' ';
          position: relative;
          display: inline-block;
          background: url('../../../assets/img/labIco.png') center left
            no-repeat;
          width: 20px;
          height: 15px;
          top: 1px;
          left: 0px;
        }
        .code {
          display: inline-block;
          text-align: center;
          background: $master-color-6;
          color: $master-color-5;
          line-height: 34px;
          margin-left: 4px;
          font-size: 18px;
          width: 100px;
        }
        .tit {
          display: inline-block;
          width: 150px;
          text-align: right;
        }
        .code-input {
          width: 200px;
        }
        .speak-code {
          width: 200px;
        }
        .submit {
          background: $master-color-0;
          color: $master-color-5;
          padding: 0 20px;
          margin: 0 5px;
          line-height: 32px;
          border: solid 1px $master-color-5;
        }
        .pho-success {
          font-size: 26px;
          text-align: center;
        }
        .pho-success::before {
          content: ' ';
          display: inline-block;
          position: relative;
          margin-right: 10px;
          top: 7px;
          width: 35px;
          height: 35px;
          background: url('../../../assets/img/success.png') center center
            no-repeat;
          background-size: cover;
        }
        .go-back {
          text-align: center;
          a {
            display: inline-block;
            background: $master-color-5;
            color: $master-color-0;
            padding: 0 25px;
          }
        }
        .last-step {
          margin-left: 150px;
          margin-top: 20px;
          input {
            background: $master-color-5;
            color: $master-color-0;
            padding: 0 20px;
            margin: 0 5px;
            line-height: 34px;
            border: none;
          }
        }
        .mare-change {
          margin-left: 150px;
        }
      }
    }
    //修改头像
    .protrait-cont {
      background: $master-color-0;
      position: relative;
      min-height: 415px;
      padding-left: 20px;
      .protrait-cont {
        float: left;
        padding-top: 40px;
        img {
          width: 120px;
          border: solid 3px $master-color-8;
        }
      }
      .protrait-up {
        display: inline-block;
        color: $master-color-4;
        position: relative;
        padding-left: 20px;
        top: 40px;
        float: left;
        min-height: 90px;
        max-width: 660px;
        .file-loading {
          position: relative;
          width: 90px;
          top: 10px;
          z-index: 2;
          opacity: 0;
        }
        .ck-up {
          position: absolute;
          background: $master-color-5;
          color: $master-color-0;
          padding: 2px 15px;
          bottom: 16px;
          cursor: pointer;
        }
      }
    }
  }
  //个人设值
  .only-setting {
    padding: 20px;
    .title {
      color: $master-color-5;
      font-size: 18px;
      margin: 20px 0 10px 0;
      span {
        color: $master-color-3;
        font-size: 14px;
      }
    }
    .portrait {
      background: $master-color-0;
      overflow: hidden;
      padding: 20px;
      font-size: 18px;
      img {
        float: left;
        margin-right: 10px;
      }
      .ch {
        font-size: 14px;
        color: $master-color-5;
      }
    }
    .account,
    .social {
      background: $master-color-0;
      overflow: hidden;
      padding: 20px;
      .item {
        overflow: hidden;
        p {
          color: $master-color-4;
          line-height: 24px;
          em {
            color: $black;
            padding-right: 10px;
            font-weight: bold;
          }
        }
        .ico {
          background: url('../../../assets/img/setIco.png') no-repeat;
          float: left;
          font-size: 26px;
          color: $master-color-8;
          padding-top: 10px;
          margin-right: 10px;
          height: 61px;
          width: 40px;
        }
        .submit {
          border: solid 1px $master-color-4;
          color: $master-color-4;
          background: $master-color-0;
          float: right;
          position: relative;
          bottom: 30px;
          right: 20px;
          padding: 0 20px;
        }
      }
    }
  }
}
</style>