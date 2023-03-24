<template>
  <div class="signItem">
    <el-form
      ref="loginForm"
      label-position="top"
      label-width="80px"
      :model="loginForm"
      :rules="loginRules"
    >
      <el-form-item label="账户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="20">
            <el-checkbox v-model="autoLogin">自动登录</el-checkbox>
          </el-col>
          <el-col :span="4">
            <router-link to="/forget-password">忘记密码</router-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm, Input } from 'element-ui'
import { isValidUserName } from '@/utils/validate'
import { UserModule } from '@/store/modules/user'

@Component
export default class LoginForm extends Vue {
  private autoLogin: boolean = false
  private loading = false

  private validateUserName = (rule: any, value: string, callback: Function) => {
    if (!isValidUserName(value)) {
      callback(new Error('Please enter the correct user name'))
    } else {
      callback()
    }
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    if (value.length < 6) {
      callback(new Error('The password can not be less than 6 digits'))
    } else {
      callback()
    }
  }

  private loginRules = {
    // username: [{ validator: this.validateUserName, trigger: 'blur' }],
    // password: [{ validator: this.validatePassword, trigger: 'blur' }]
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }

  private loginForm = {
    username: '',
    password: ''
    //username: '15022222227',
    //password: '123456'
  }

  private handleLogin() {
    // localStorage.setItem('loginName', this.loginForm.loginName)
    // localStorage.setItem('password', this.loginForm.password)
    let loginForm: ElForm = this.$refs.loginForm as ElForm
    loginForm.validate(async (valid: boolean) => {
      if (valid) {
        // this.loading = true
        await UserModule.Login(this.loginForm)
        location.href = `${process.env.VUE_APP_CLIENT_PORTAL_URL}/pages/learing-index.html`
        // this.loading = false
      } else {
        return false
      }
    })
  }
}
</script>
