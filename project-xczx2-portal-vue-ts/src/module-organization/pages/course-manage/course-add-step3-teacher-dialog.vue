<template>
  <el-dialog title="课程教师" :visible.sync="syncDialogVisible">
    <div class="form-dialog">
      <el-form ref="form" :model="teacherData" :rules="rules" label-width="120px">
        <el-form-item label="教师姓名：" prop="teacherName">
          <el-input v-model="teacherData.teacherName"></el-input>
        </el-form-item>
        <el-form-item label="教师职位：" prop="position">
          <el-input v-model="teacherData.position"></el-input>
        </el-form-item>
        <el-form-item label="教师简介：" prop="introduction">
          <el-input v-model="teacherData.introduction" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="教师照片：" prop="photograph">
          <common-entering-step2-upload-image :imageUrl.sync="teacherData.photograph">
            图片要求
            <br />尺寸大于500*900 分辨率不小于96dpi
          </common-entering-step2-upload-image>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
// .form-dialog {
//   text-align: center;
//   min-height: 80px;
//   width: 90%;
// }
</style>

<script lang="ts">
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator'
import { submitTeacher } from '@/api/courses'
import { ICourseTeacherList } from '@/entity/course-add-teacher'
import { ElForm } from 'element-ui/types/form'
import CommonEnteringStep2UploadImage from '@/module-entering/pages/entering/components/common-entering-step2-upload-image.vue'

@Component({
  name: 'SaveTeacherDialog',
  components: {
    CommonEnteringStep2UploadImage
  }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean

  @Prop()
  private teacherData!: ICourseTeacherList

  // constructor() {
  //   super()
  //   this.teacherData = {
  //     teacherName: '',
  //     position: '',
  //     introduction: ''
  //   }
  // }

  public restForm() {
    // this.teacherData = {
    //   teacherName: '',
    //   position: '',
    //   introduction: ''
    // }
    let form: ElForm = this.$refs['form'] as ElForm
    form.resetFields()
  }

  // 验证规则
  private rules = {
    teacherName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    position: [
      {
        required: true,
        message: '请输入职位',
        trigger: 'blur'
      }
    ]
    // introduction: [
    //   { required: true, message: '请输入教师简介', trigger: 'change' }
    // ]
  }
  public validateForm(): Promise<boolean> {
    return new Promise(resolve => {
      let form: ElForm = this.$refs['form'] as ElForm
      form.validate(valid => resolve(valid))
    })
  }

  handleCancel() {
    this.syncDialogVisible = false
    this.restForm()
  }
  async handleSubmit() {
    if (await this.validateForm()) {
      if(this.teacherData.photograph){
        // alert(this.teacherData.photograph.replace(`${process.env.VUE_APP_SERVER_PICSERVER_URL}`,''))
        this.teacherData.photograph = this.teacherData.photograph.replace(`${process.env.VUE_APP_SERVER_PICSERVER_URL}`,'')

      }
      await submitTeacher(this.teacherData)
      this.syncDialogVisible = false
      this.restForm()
      this.$emit('complete')
    }
  }
}
</script>
