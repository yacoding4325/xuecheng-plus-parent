<template>
  <div class="workspace">
    <div class="banner">
      <span class="primary-title">机构资料</span>
      <span class="btn-edit" v-if="isEdit===false">
        <el-button type="text" size="mini" @click="isEdit=true" icon="el-icon-edit">修改</el-button>
      </span>
      <el-button
        v-if="isEdit"
        type="primary"
        size="medium"
        class="btn-add el-button"
        @click="handleSave"
        :loading="loading"
      >保存</el-button>
    </div>

    <!-- 表单 -->
    <div class="form">
      <el-form
        ref="form"
        v-if="companyData"
        :model="companyData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="机构名称：" prop="name">
          <el-input v-model="companyData.name" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="机构所在地区：" prop="address">
          <el-input v-model="companyData.address" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="机构联系方式：" prop="phone">
          <el-input v-model="companyData.phone" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="机构邮箱：" prop="email">
          <el-input v-model="companyData.email" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="机构简介：" prop="briefIntro">
          <el-input v-model="companyData.briefIntro" :disabled="!isEdit"></el-input>
        </el-form-item>
        <el-form-item label="课程类目：" prop="mainCategory">
          <el-input v-model="companyData.mainCategory" :disabled="!isEdit"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- end -->
  </div>
</template>



<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { IKVData } from '@/api/types' // 通用 interface
import { getCompany, updateCompany } from '@/api/teaching-company' // api interface 课程
import { ITeachingCompany } from '@/entity/teaching-company'
import { ICourseCategory } from '@/entity/course-add-base'
import MixinTools from '@/utils/mixins.vue'
import { Form as ElForm } from 'element-ui'

@Component({
  name: 'CompanyInfo',
  components: {}
})
export default class extends mixins(MixinTools) {
  private isEdit: boolean = false
  private loading: boolean = false
  private companyData!: ITeachingCompany
  private categoryTreeData: ICourseCategory[] = []
  private defaultProps = {
    children: 'childrenTreeNodes',
    value: 'id',
    label: 'label'
  }

  constructor(props) {
    super(props)
    // this.companyData = {
    //   name: '',
    //   address: '',
    //   phone: '',
    //   email: '',
    //   briefIntro: '',
    //   mainCategory: ''
    // }
    // TODO: 测试此功能
    this.companyData = {
      address: '',
      name: '',
      phone: '',
      title: '',
      verifyCode: '',
      verifyKey: ''
    }
  }

  private rules = {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
  }

  ///////////////////////////
  /// 业务

  private async getDate() {
    this.companyData = await getCompany()
  }

  ///////////////////////////
  /// 生命周期

  created() {
    this.getDate()
  }

  ///////////////////////////
  /// 事件

  private async handleSave() {
    let form: ElForm = this.$refs['form'] as ElForm
    form.validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        await updateCompany(this.companyData)
        this.showMessage('添加成功')
        setTimeout(() => {
          this.loading = false
          this.isEdit = false
          return true
        }, 0.5 * 1000)
      } else {
        return false
      }
    })
  }

  ///////////////////////////
}
</script>


<style lang="scss" scoped>
.workspace {
  .banner {
    .btn-add {
      float: right;
    }
    .btn-edit {
      padding-left: 10px;
    }
  }
  .form {
    padding-top: 20px;
    width: 600px;
    margin: 0px auto;
  }
}
</style>
