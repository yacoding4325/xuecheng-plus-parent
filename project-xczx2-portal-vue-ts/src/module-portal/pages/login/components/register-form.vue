<template>
  <div class="signItem">
    <el-form ref="form" :model="form" :rules="rules" class="form" label-position="top">
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="短信验证码：" prop="verifyCode">
        <el-row :gutter="10" justify="space-between">
          <el-col :span="15">
            <el-input v-model="form.verifyCode" placeholder="请输入短信验证码"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button
              type="primary"
              :disabled="isSending"
              class="verify-button"
              @click="smsMsg"
            >{{ buttonTips }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="设置密码：" prop="password">
        <el-input v-model="form.password" placeholder="6-16位密码，区分大小写"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirmPwd">
        <el-input v-model="form.confirmPwd" placeholder="重复密码"></el-input>
      </el-form-item>
      <el-form-item prop="signAgreement">
        <el-checkbox v-model="form.signAgreement">同意协议并注册</el-checkbox>
        <a href="/doc/学成网注册协议.docx" download>《学成网注册协议》</a>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click="handleRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { smsMsg } from '@/api/common'
import { register } from '@/api/learning-user'

const TIME_COUNT = 90
@Component
export default class RegisterForm extends Vue {
  private loading = false
  // 验证码
  private isSending: boolean = false
  private sendTimer: number = 0
  private sendCount: number = 0
  // 表单数据
  private form: any = {
    phone: '',
    verifyCode: '',
    password: '',
    confirmPwd: '',
    verifyKey: '',
    signAgreement: false
  }
  // 验证详情
  // 手机号正则，参考：http://caibaojian.com/phone-regexp.html
  private validatePhone = (rule: any, value: any, callback: any) => {
    if (!/^1[0-9]{10}$/.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }
  // TODO: 密码其他校验
  private validatePassword: any = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (this.form.confirmPwd !== '') {
        let form = this.$refs['form'] as ElForm
        form.validateField('confirmPwd', () => {})
      }
      callback()
    }
  }
  private validateConfirmPwd: any = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== this.form.password) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
  private validateSignAgreement: any = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请阅读并同意协议'))
    } else {
      callback()
    }
  }
  // 表单验证
  // TODO: 增加rules校验
  private rules: any = {
    phone: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'change'
      },
      { validator: this.validatePhone, trigger: 'change' }
    ],
    verifyCode: [
      {
        required: true,
        message: '请输入短信验证码',
        trigger: 'change'
      }
    ],
    password: [{ validator: this.validatePassword, trigger: 'change' }],
    confirmPwd: [{ validator: this.validateConfirmPwd, trigger: 'change' }],
    signAgreement: [
      { validator: this.validateSignAgreement, trigger: 'change' }
    ]
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
   * 用户注册
   */
  public async handleRegister() {
    let form: ElForm = this.$refs['form'] as ElForm
    form.validate(async (isValid: boolean) => {
      if (isValid) {
        this.loading = true
        await register(this.form)

        this.$emit('changeState', false)
        this.loading = false
      } else {
        return false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.verify-button {
  width: 100%;
}
</style>