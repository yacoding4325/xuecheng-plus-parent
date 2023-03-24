<template>
  <el-row type="flex" justify="space-between">
    <el-col :span="10">
      <el-form-item prop="phone">
        <el-input v-model="form.phone" placeholder="请填写手机号码"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item prop="verifyCode">
        <el-input v-model="form.verifyCode" placeholder="验证码"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-button :disabled="isSending" class="verify-button" @click="smsMsg">{{ buttonTips }}</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { smsMsg } from '@/api/common'

const TIME_COUNT = 90
@Component
export default class CommonEnteringStep2PhoneVerifyCode extends Vue {
  @PropSync('phoneForm', {
    type: Object,
    required: false,
    default: () => {
      return {
        phone: '',
        verifyCode: '',
        verifyKey: ''
      }
    }
  })
  form!: any

  // 验证码
  private isSending: boolean = false
  private sendTimer: number = 0
  private sendCount: number = 0

  // computed
  get buttonTips() {
    if (!this.isSending) {
      return '获取验证码'
    }
    return `${this.sendCount}s`
  }

  /**
   * 发送短信验证码
   */
  private async smsMsg() {
    let form = this.$parent.$parent as ElForm
    form.validateField('phone', async (errorMessage: string) => {
      if (errorMessage) {
        return
      }
      this.isSending = true
      this.sendCount = TIME_COUNT
      this.form.verifyKey = await smsMsg(this.form.phone)

      this.sendTimer = setInterval(() => {
        if (this.sendCount > 0) {
          this.sendCount--
        } else {
          clearInterval(this.sendTimer)
          this.isSending = false
        }
      }, 1000)
    })
  }
}
</script>

<style lang="scss" scoped>
.verify-button {
  width: 100%;
}
</style>