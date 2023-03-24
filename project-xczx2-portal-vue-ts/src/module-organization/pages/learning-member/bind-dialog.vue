<template>
  <el-dialog title="绑定用户" :visible.sync="syncDialogVisible">
    <div class="types">
      <el-form label-width="100px" v-loading="loading">
        <!-- 查询手机号 -->
        <el-form-item label="成员手机号：">
          <el-input v-model="phone" @change="remoteQuery" placeholder="输入手机号 回车确认"></el-input>
        </el-form-item>
        <!-- 用户信息 -->
        <el-form-item label="成员昵称：">
          <el-input v-model="member.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="member.phone" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="成员介绍：">
          <el-input v-model="member.intro" type="textarea" :rows="5" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">提交</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.types {
  text-align: center;
}
</style>

<script lang="ts">
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator'
import { IMemberDTO } from '@/entity/learning-member'
import { findUserByPhone, bindUser } from '@/api/learning-member'

@Component({
  name: 'MemberBindDialog',
  components: {}
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean

  private loading: boolean = false
  private phone: string = ''
  private member: IMemberDTO = {
    name: '',
    phone: '',
    username: '',
    verifyCode: '',
    verifyKey: ''
  }
  private selValue: any = null

  public restForm() {
    this.loading = false
    this.phone = ''
    this.member = {
      name: '',
      phone: '',
      username: '',
      verifyCode: '',
      verifyKey: ''
    }
    this.selValue = null
  }

  async remoteQuery() {
    if (this.phone == '') {
      return
    }
    this.loading = true
    this.member = await findUserByPhone(this.phone)
    this.loading = false
  }

  handleCancel() {
    this.syncDialogVisible = false
  }
  async handleSubmit() {
    if (this.member.userId) {
      await bindUser(this.member.phone, this.member.userId)
      this.syncDialogVisible = false
      this.$emit('getList')
    }
  }
}
</script>
