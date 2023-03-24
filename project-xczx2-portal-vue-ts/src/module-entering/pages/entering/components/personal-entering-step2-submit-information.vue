<template>
  <!-- TODO: 可以拆成3个组件，方便维护 -->
  <div class="step-body">
    <!-- 身份证明 -->
    <span class="title">身份证明</span>
    <el-divider></el-divider>
    <el-form ref="form1" :model="form" :rules="rules" class="form" label-width="200px">
      <el-form-item label="真实姓名：" prop="name">
        <el-input v-model="form.name" placeholder="真实姓名，需要与身份证一致"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码：" prop="idCard">
        <el-input v-model="form.idCard" placeholder="请填写身份证号码"></el-input>
      </el-form-item>
      <!-- TODO: 校验消息没有及时清除 -->
      <el-form-item label="资格证书：" prop="teacherCertImg">
        <el-tabs v-model="certIndex">
          <el-tab-pane label="教师资格证" name="0">
            <common-entering-step2-upload-image
              :imageUrl.sync="form.teacherCertImg"
            >请提交有效期内的教师资格证照片，需确保头像和文字清晰</common-entering-step2-upload-image>
          </el-tab-pane>
          <el-tab-pane label="高学历证" name="1">
            <common-entering-step2-upload-image
              :imageUrl.sync="form.eduCertImg"
            >请提交大学本科以上学历水平证件照片，如学生证、毕业证等（需包含照片、姓名、专业、官方印章等有效信息）</common-entering-step2-upload-image>
          </el-tab-pane>
          <el-tab-pane label="专业证书" name="2">
            <common-entering-step2-upload-image
              :imageUrl.sync="form.majorCertImg"
            >请提交教学能力或专业能力证明，如职称证书、考级证书等（需包含官方印章等有效信息）</common-entering-step2-upload-image>
          </el-tab-pane>
          <!-- TODO: 等待后端提供"本人微博账号"，"其他"字段 -->
        </el-tabs>
      </el-form-item>
      <el-form-item label="证书编号：" prop="teacherCertNo">
        <el-input
          v-show="certIndex === '0'"
          v-model="form.teacherCertNo"
          placeholder="请填写证书编号，如音乐教师资格证（10字内，会标注在老师主页）"
        ></el-input>
        <el-input v-show="certIndex === '1'" v-model="form.eduCertNo" placeholder="请填写证书编号"></el-input>
        <el-input v-show="certIndex === '2'" v-model="form.majorCertNo" placeholder="请填写证书编号"></el-input>
      </el-form-item>
    </el-form>

    <!-- 个人信息 -->
    <span class="title">个人信息</span>
    <el-divider></el-divider>
    <el-form ref="form2" :model="form" :rules="rules" class="form" label-width="200px">
      <el-form-item label="头像：" prop="logo">
        <common-entering-step2-upload-image :imageUrl.sync="form.logo">请提交有效期内的教师资格证照片，需确保头像和文字清晰</common-entering-step2-upload-image>
      </el-form-item>
      <el-form-item label="主营类目：" prop="mainCategory">
        <common-entering-step2-main-category :mainCategory.sync="form.mainCategory" />
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
      </el-form-item>
      <el-form-item label="个人简介：" prop="intro">
        <el-input
          type="textarea"
          :rows="10"
          v-model="form.intro"
          placeholder="例：传智播客，目前已经成为拥有2000多名员工的教育集团；从成立最初的单一Java学科，到现在已包括JavaEE、Python+人工智能、前端与移动开发、UI/UE设计、大数据、Go语言与区块链等14门学科培训；从屈指可数的几间教室，发展成为分布于北京、上海、广州、深圳、武汉、郑州、西安、长沙、济南、重庆、南京、杭州、成都、石家庄、合肥、太原、厦门、沈阳等18所城市直营中心的规模。"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
      <!-- TODO: 等待后端提供开始时间、结束时间字段，并且支持多条记录 -->
      <el-form-item label="教学工作经历：" prop="workExperience">
        <el-input
          type="textarea"
          :rows="10"
          v-model="form.workExperience"
          placeholder="请填写教学工作经历"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
      <!-- TODO: 等待后端提供开始时间、结束时间字段，并且支持多条记录 -->
      <el-form-item label="教学工作成果：" prop="workResults">
        <el-input
          type="textarea"
          :rows="10"
          v-model="form.workResults"
          placeholder="教学工作成果"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="手机：">
        <common-entering-step2-phone-verifyCode :phoneForm.sync="form" />
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
import CommonEnteringStep2MainCategory from './common-entering-step2-main-category.vue'
import CommonEnteringStep2PhoneVerifyCode from './common-entering-step2-phone-verifyCode.vue'
import { savePersonalOrg } from '@/api/teaching-personal-org'
import { ITeachingPersonalOrgDTO } from '@/entity/teaching-personal-org'

@Component({
  components: {
    CommonEnteringStep2UploadImage,
    CommonEnteringStep2MainCategory,
    CommonEnteringStep2PhoneVerifyCode
  }
})
export default class PersonalEnteringStep2Submitform extends Vue {
  private form: ITeachingPersonalOrgDTO = {
    email: '',
    idCard: '',
    intro: '',
    logo: '',
    mainCategory: '',
    name: '',
    phone: '',
    promiseLetter: '',
    teacherCertImg: '',
    verifyCode: '',
    verifyKey: ''
  }
  private certIndex: string = '0'

  // TODO: 资格证书和证书编号一一对应
  // 资格证书
  private validateCertImg = (rule: any, value: any, callback: any) => {
    if (!value && !this.form.eduCertImg && !this.form.majorCertImg) {
      callback(new Error('请至少提交一张教师资格证、高学历证、专业证书照片'))
    } else {
      callback()
    }
  }
  // 证书编号
  private validateCertNo = (rule: any, value: any, callback: any) => {
    if (!value && !this.form.eduCertNo && !this.form.majorCertNo) {
      callback(new Error('请填写证书编号'))
    } else {
      callback()
    }
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
    // 身份证明
    name: [
      {
        required: true,
        message: '真实姓名，需要与身份证一致',
        trigger: 'change'
      }
    ],
    idCard: [
      {
        required: true,
        message: '请填写身份证号码',
        trigger: 'change'
      }
    ],
    teacherCertImg: [{ validator: this.validateCertImg, trigger: 'change' }],
    teacherCertNo: [{ validator: this.validateCertNo, trigger: 'change' }],

    // 个人信息
    logo: [
      {
        required: true,
        message: '请请上传居中清晰头像，不合规范会审核不通过（查看图例）',
        trigger: 'change'
      }
    ],
    mainCategory: [
      {
        required: true,
        message: '请选择主营类目',
        trigger: 'change'
      }
    ],
    email: [
      {
        required: true,
        message: '请填写邮箱',
        trigger: 'change'
      }
    ],
    intro: [
      {
        required: true,
        message: '请填写个人简介',
        trigger: 'change'
      }
    ],
    workExperience: [
      {
        required: true,
        message: '请填写教学工作经历',
        trigger: 'change'
      }
    ],
    workResults: [
      {
        required: true,
        message: '请填写教学工作成果',
        trigger: 'change'
      }
    ],
    phone: [
      { required: true, message: '请填写手机号码', trigger: 'change' },
      { validator: this.validatePhone, trigger: 'change' }
    ],
    verifyCode: [
      { required: true, message: '请填写验证码', trigger: 'change' }
    ],
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
  public async savePersonalOrg(): Promise<boolean> {
    // TODO: 这种嵌套方式不好，不优雅
    return new Promise((resolve, reject) => {
      let form1 = this.$refs['form1'] as ElForm
      form1.validate((valid: boolean) => {
        if (!valid) {
          reject()
          return
        }

        let form2 = this.$refs['form2'] as ElForm
        form2.validate(async (valid: boolean) => {
          if (!valid) {
            reject()
            return
          }

          await savePersonalOrg(this.form)
          resolve()
        })
      })
    })
  }
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