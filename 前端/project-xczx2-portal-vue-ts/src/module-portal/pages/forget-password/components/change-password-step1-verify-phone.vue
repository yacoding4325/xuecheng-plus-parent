
<template>
  <div class="signItem">
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="form.phone" placeholder></el-input>
      </el-form-item>
      <el-form-item label="验证码：" prop="verifyCode">
        <el-row :gutter="10" justify="space-between">
          <el-col :span="16">
            <el-input v-model="form.verifyCode" placeholder></el-input>
          </el-col>
          <el-col :span="8">
            <el-button
              type="primary"
              :disabled="isSending"
              class="verify-button"
              @click="smsMsg"
            >{{ buttonTips }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { smsMsg } from '@/api/common'
import { verify } from '@/api/learning-user'

const TIME_COUNT = 90
@Component
export default class ChangePasswordStep1VerifyPhone extends Vue {
  // 验证码
  private isSending: boolean = false
  private sendTimer: number = 0
  private sendCount: number = 0
  // 表单数据
  private form: any = {
    phone: '',
    verifyCode: '',
    verifyKey: ''
  }
  // 手机号正则，参考：http://caibaojian.com/phone-regexp.html
  private validatePhone = (rule: any, value: any, callback: any) => {
    if (!/^1[0-9]{10}$/.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }
  // 表单验证
  private rules: any = {
    phone: [
      { required: true, message: '请填写手机号', trigger: 'change' },
      { validator: this.validatePhone, trigger: 'change' }
    ],
    verifyCode: [{ required: true, message: '请填写验证码', trigger: 'change' }]
  }
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
    let form = this.$refs['form'] as ElForm
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

  /**
   * 验证短信验证码
   */
  public async verify(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let form = this.$refs['form'] as ElForm
      form.validate(async (isValid: boolean) => {
        if (isValid) {
          let verifyToken: string = await verify(this.form)
          this.$emit('formInfo', {
            phone: this.form.phone,
            verifyToken: verifyToken
          })
          resolve()
        } else {
          reject()
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.verify-button {
  width: 100%;
}
</style>