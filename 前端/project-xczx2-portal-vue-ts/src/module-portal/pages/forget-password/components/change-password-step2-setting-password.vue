
<template>
  <div class="signItem">
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item label="新密码：" prop="password">
        <el-input v-model="form.password" placeholder></el-input>
      </el-form-item>
      <el-form-item label="验证新密码：" prop="confirmPwd">
        <el-input v-model="form.confirmPwd" placeholder></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { changePwd } from '@/api/learning-user'

@Component
export default class ChangePasswordStep2SettingPassword extends Vue {
  @Prop({ required: true, type: String, default: '' })
  phone!: string
  @Prop({ required: true, type: String, default: '' })
  verifyToken!: string
  // 表单数据
  private form: any = {
    phone: '',
    password: '',
    confirmPwd: ''
  }
  // 验证详情
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
  // 表单验证
  private rules: any = {
    password: [{ validator: this.validatePassword, trigger: 'change' }],
    confirmPwd: [{ validator: this.validateConfirmPwd, trigger: 'change' }]
  }

  /**
   * 新密码提交
   */
  public async changePwd(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let form = this.$refs['form'] as ElForm
      form.validate(async (isValid: boolean) => {
        if (isValid) {
          this.form.phone = this.phone
          await changePwd(this.verifyToken, this.form)
          resolve()
        } else {
          reject()
        }
      })
    })
  }
}
</script>