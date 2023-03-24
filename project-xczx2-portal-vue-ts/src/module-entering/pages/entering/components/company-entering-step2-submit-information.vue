<template>
  <!-- TODO: 可以拆成3个组件，方便维护 -->
  <div class="step-body">
    <!-- 机构资料 -->
    <span class="title">机构资料</span>
    <el-divider></el-divider>
    <el-form ref="form1" :model="form" :rules="rules" class="form" label-width="200px">
      <el-form-item label="公司名称：" prop="name">
        <el-input v-model="form.name" placeholder="请填写公司名称"></el-input>
      </el-form-item>
      <!-- TODO: 校验消息没有及时清除 -->
      <el-form-item label="营业执照：" prop="businessPic">
        <common-entering-step2-upload-image :imageUrl.sync="form.businessPic">请上传有年检章的企业营业执照副本扫描件</common-entering-step2-upload-image>
      </el-form-item>
      <!-- TODO: 证件有效期需大于120天 -->
      <el-form-item label="营业执照有效期：" prop="businessTerm">
        <common-entering-step2-term :term.sync="form.businessTerm" />
      </el-form-item>
      <el-form-item label="机构营业执照注册号：" prop="businessRegistNo">
        <el-input v-model="form.businessRegistNo" placeholder="请输入营业执照注册号或统一社会信用代码"></el-input>
      </el-form-item>
      <el-form-item label="教育资质证书：" prop="eduCertImg">
        <common-entering-step2-upload-image
          :imageUrl.sync="form.eduCertImg"
        >请上传可证明拥有教育培训资格的证书扫描件，如办学许可证</common-entering-step2-upload-image>
      </el-form-item>
      <!-- TODO: 证件有效期需大于120天 -->
      <el-form-item label="证件有效期：" prop="eduCertTerm">
        <common-entering-step2-term :term.sync="form.eduCertTerm" />
      </el-form-item>
      <el-form-item label="证书编号：" prop="eduCertNo">
        <el-input v-model="form.eduCertNo" placeholder="请填写证书编号"></el-input>
      </el-form-item>
    </el-form>

    <!-- 课堂信息 -->
    <div class="title">课堂信息</div>
    <el-divider></el-divider>
    <el-form ref="form2" :model="form" :rules="rules" class="form" label-width="200px">
      <el-form-item label="机构图标：" prop="logo">
        <common-entering-step2-upload-image :imageUrl.sync="form.logo">尺寸大于130X130，小于500X500</common-entering-step2-upload-image>
      </el-form-item>
      <el-form-item label="机构名称：" prop="title">
        <el-input v-model="form.title" placeholder="请填写机构名称"></el-input>
        <br />
        <p class="el-upload__tip" style>注：机构名称和机构LOGO名称与营业执照名称一致或有营业执照的关键字，如不一致需提供商标注册权</p>
      </el-form-item>
      <el-form-item label="商标注册证：" prop="trademarkPic">
        <common-entering-step2-upload-image :imageUrl.sync="form.trademarkPic">请上传商标注册证</common-entering-step2-upload-image>
      </el-form-item>
      <el-form-item label="机构简介：" prop="intro">
        <el-input
          type="textarea"
          :rows="10"
          v-model="form.intro"
          placeholder="例：传智播客，目前已经成为拥有2000多名员工的教育集团；从成立最初的单一Java学科，到现在已包括JavaEE、Python+人工智能、前端与移动开发、UI/UE设计、大数据、Go语言与区块链等14门学科培训；从屈指可数的几间教室，发展成为分布于北京、上海、广州、深圳、武汉、郑州、西安、长沙、济南、重庆、南京、杭州、成都、石家庄、合肥、太原、厦门、沈阳等18所城市直营中心的规模。"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="一句话简介：" prop="briefIntro">
        <el-input v-model="form.briefIntro" placeholder="请填写一句话简介"></el-input>
      </el-form-item>
      <el-form-item label="主营类目：" prop="mainCategory">
        <common-entering-step2-main-category :mainCategory.sync="form.mainCategory" />
      </el-form-item>
    </el-form>

    <!-- 申请人信息 -->
    <div class="title">申请人信息</div>
    <el-divider></el-divider>
    <el-form ref="form3" :model="form" :rules="rules" class="form" label-width="200px">
      <el-form-item label="申请人：" prop="linkname">
        <el-input v-model="form.linkname" placeholder="请填写申请人真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="手持身份证照片：" prop="handPhotos">
        <common-entering-step2-upload-image :imageUrl.sync="form.handPhotos">请上传手持身份证的半身照</common-entering-step2-upload-image>
      </el-form-item>
      <el-form-item label="手机：">
        <common-entering-step2-phone-verifyCode :phoneForm.sync="form" />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
      </el-form-item>
      <el-form-item label="承诺书：" prop="promiseLetter">
        <common-entering-step2-upload-image :imageUrl.sync="form.promiseLetter">
          请填写完毕本页面的信息后，点击下载
          <a href="/doc/承诺书模板.docx" download>承诺书模板</a>，
          <br />上传加盖公章的扫描件
        </common-entering-step2-upload-image>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import CommonEnteringStep2UploadImage from './common-entering-step2-upload-image.vue'
import CommonEnteringStep2Term from './common-entering-step2-term.vue'
import CommonEnteringStep2MainCategory from './common-entering-step2-main-category.vue'
import CommonEnteringStep2PhoneVerifyCode from './common-entering-step2-phone-verifyCode.vue'
import { submitCompany } from '@/api/teaching-company'
import { ITeachingCompany } from '@/entity/teaching-company'

@Component({
  components: {
    CommonEnteringStep2UploadImage,
    CommonEnteringStep2Term,
    CommonEnteringStep2MainCategory,
    CommonEnteringStep2PhoneVerifyCode
  }
})
export default class CompanyEnteringStep2Submitform extends Vue {
  private form: ITeachingCompany = {
    address: '',
    name: '',
    phone: '',
    title: '',
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
  // TODO: 增加rules校验
  private rules: any = {
    // 机构资料
    name: [{ required: true, message: '请填写公司名称', trigger: 'change' }],
    businessPic: [
      {
        required: true,
        message: '请上传有年检章的企业营业执照副本扫描件',
        trigger: 'change'
      }
    ],
    businessTerm: [
      { required: true, message: '请选择营业执照有效期', trigger: 'change' }
    ],
    businessRegistNo: [
      {
        required: true,
        message: '请输入营业执照注册号或统一社会信用代码',
        trigger: 'change'
      }
    ],
    eduCertImg: [
      {
        required: true,
        message: '请上传可证明拥有教育培训资格的证书扫描件，如办学许可证',
        trigger: 'change'
      }
    ],
    eduCertTerm: [
      { required: true, message: '请选择证件有效期', trigger: 'change' }
    ],
    eduCertNo: [
      { required: true, message: '请填写证书编号', trigger: 'change' }
    ],

    // 课堂信息
    logo: [{ required: true, message: '请上传机构图标', trigger: 'change' }],
    title: [{ required: true, message: '请填写机构名称', trigger: 'change' }],
    trademarkPic: [
      { required: true, message: '请上传商标注册证', trigger: 'change' }
    ],
    intro: [{ required: true, message: '请填写机构简介', trigger: 'change' }],
    briefIntro: [
      { required: true, message: '请填写一句话简介', trigger: 'change' }
    ],
    mainCategory: [
      { required: true, message: '请选择主营类目', trigger: 'change' }
    ],

    // 申请人信息
    linkname: [
      { required: true, message: '请填写申请人真实姓名', trigger: 'change' }
    ],
    handPhotos: [
      { required: true, message: '请上传手持身份证的半身照', trigger: 'change' }
    ],
    phone: [
      { required: true, message: '请填写手机号码', trigger: 'change' },
      { validator: this.validatePhone, trigger: 'change' }
    ],
    verifyCode: [
      { required: true, message: '请填写验证码', trigger: 'change' }
    ],
    email: [{ required: true, message: '请填写邮箱', trigger: 'change' }],
    promiseLetter: [
      {
        required: true,
        message:
          '请填写完毕本页面的信息后，点击下载承诺书模板，上传加盖公章的扫描件',
        trigger: 'change'
      }
    ]
  }

  /**
   * 提交资料
   */
  public async submitCompany(): Promise<boolean> {
    // TODO: 这种嵌套方式不好，不优雅
    // https://github.com/yiminghe/async-validator
    return new Promise((resolve, reject) => {
      let form1 = this.$refs['form1'] as ElForm
      form1.validate((valid: boolean) => {
        if (!valid) {
          reject()
          return
        }

        let form2 = this.$refs['form2'] as ElForm
        form2.validate((valid: boolean) => {
          if (!valid) {
            reject()
            return
          }

          let form3 = this.$refs['form3'] as ElForm
          form3.validate(async (valid: boolean) => {
            if (!valid) {
              reject()
              return
            }

            await submitCompany(this.form)
            resolve()
          })
        })
      })
    })

    // TODO: 研究下这种写法
    // if (await this.formValidate('form1')) return false
    // if (await this.formValidate('form2')) return false
    // if (await this.formValidate('form3')) return false

    // await submitCompany(this.form)
    // return true
  }

  // private formValidate(formName: string): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     let form1 = this.$refs[formName] as ElForm
  //     form1.validate((valid: boolean) => {
  //       if (!valid) {
  //         return reject()
  //       } else {
  //         return resolve(true)
  //       }
  //     })
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.step-body {
  .title {
    font-size: 24px;
  }

  .form {
    width: 700px;
    padding-top: 40px;

    .el-upload__tip {
      line-height: 20px;
    }
  }
}
</style>