<template>
  <div class="step-body">
    <el-form
      ref="form"
      v-if="baseInfoData"
      :model="baseInfoData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="课程名称：" prop="name">
        <el-input v-model="baseInfoData.name"></el-input>
      </el-form-item>
      <el-form-item label="课程标签：" prop="tags">
        <el-input v-model="baseInfoData.tags"></el-input>
      </el-form-item>
      <el-form-item label="课程分类：" prop="uiCategoryTreeSelected">
        <el-cascader
          v-if="categoryTreeData.length > 0"
          v-model="baseInfoData.uiCategoryTreeSelected"
          :options="categoryTreeData"
          :props="defaultProps"
          @change="handleCategoryTreeChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="课程等级：" prop="grade">
        <el-select v-model="baseInfoData.grade" placeholder="请选择">
          <el-option
            v-for="item in gradeData"
            :key="item.code"
            :label="item.desc"
            :value="item.code"
          ></el-option>
        </el-select> 
      </el-form-item>
      <el-form-item label="课程简介：">
        <el-input v-model="baseInfoData.description" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <!--<el-form-item label="课程目标：">
        <el-input v-model="baseInfoData.objectives" type="textarea" :rows="5"></el-input>
      </el-form-item>-->
      <el-form-item label="适用人群：" prop="users">
        <el-input v-model="baseInfoData.users" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="课程封面：" prop="pic">
        <common-entering-step2-upload-image :imageUrl.sync="baseInfoData.pic">
          图片要求 点击查看课程封面模版规范
          <br />尺寸大于1080*608 分辨率小于96dpi
        </common-entering-step2-upload-image>
        <!-- <el-input v-model="baseInfoData.pic"></el-input> -->
      </el-form-item>
      <el-form-item label="课程类型：" prop="charge">
        <template v-for="item in chargeData">
          <el-radio :key="item.code" v-model="baseInfoData.charge" :label="item.code">{{item.desc}}</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="原价：" prop="originalPrice">
        <el-input v-model="baseInfoData.originalPrice" style="width:150px;"></el-input>
        <!-- <span>&nbsp;元</span> -->
      </el-form-item>
       <el-form-item label="现价：" prop="price">
        <el-input v-model="baseInfoData.price" style="width:150px;"></el-input>
        <!-- <span>&nbsp;元</span> -->
      </el-form-item>
      <el-form-item label="咨询QQ：" prop="qq">
        <el-input v-model="baseInfoData.qq" style="width:150px;"></el-input>
      </el-form-item>
      <el-form-item label="微信号：" prop="wechat">
        <el-input v-model="baseInfoData.wechat" style="width:150px;"></el-input>
      </el-form-item>
      <el-form-item label="电话：" prop="phone">
        <el-input v-model="baseInfoData.phone" style="width:150px;"></el-input>
      </el-form-item>
            <el-form-item label="有效期(天)：" prop="validDays">
        <el-input v-model="baseInfoData.validDays" style="width:150px;"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>


<script lang="ts">
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator'
import { IKVData } from '@/api/types'
import { COUSE_GRADE_STATUS, COURSE_CHARGE_TYPE_STATUS } from '@/api/constants'
import { category, submitBaseInfo, getBaseInfo } from '@/api/courses'
import { ICourseCategory, ICourseBaseInfo } from '@/entity/course-add-base'
import { ElForm } from 'element-ui/types/form'
import CommonEnteringStep2UploadImage from '@/module-entering/pages/entering/components/common-entering-step2-upload-image.vue'

@Component({
  name: 'CourseAddStep1BaseInfo',
  components: {
    CommonEnteringStep2UploadImage
  }
})
export default class extends Vue {
  @PropSync('courseBaseId', {})
  syncCourseBaseId!: number

  @Prop({ type: String })
  teachmode!: string

  private baseInfoData!: ICourseBaseInfo // 课程基本信息
  private categoryTreeData: ICourseCategory[] = [] // 课程分类
  private defaultProps = {
    children: 'childrenTreeNodes',
    value: 'id',
    label: 'label'
  }
  // private categoryTreeSelected: string[] = ['', ''] // 被选中的项目
  private gradeData: IKVData[] = COUSE_GRADE_STATUS // 课程等级
  private chargeData: IKVData[] = COURSE_CHARGE_TYPE_STATUS // 课程类型 收费 免费

  constructor() {
    super()
    this.baseInfoData = {
      charge: '201000',
      price: 0,
      qq:'',
      wechat:'',
      phone:'',
      validDays:365,
      mt: '',
      st: '',
      name: '',
      pic: '',
      teachmode: this.teachmode,
      users: '',

      tags: '',
      grade: '',
      objectives: '',

      uiCategoryTreeSelected: []
    }
  }

  // 读取数据
  public async getData() {
    // alert(this.baseInfoData.pic)
    if (this.syncCourseBaseId != 0) {
      let data = await getBaseInfo(this.syncCourseBaseId)
      data.uiCategoryTreeSelected = [data.mt, data.st]
      this.baseInfoData = data
      this.baseInfoData.pic = `${process.env.VUE_APP_SERVER_PICSERVER_URL}`+this.baseInfoData.pic    
    }
  }

  // 保存数据
  public async saveData(): Promise<boolean> {

    return new Promise(async (resolve, reject) => {
      let valid: boolean = await this.validateForm()
      if (valid) {
            //图片路径去掉网址
        this.baseInfoData.pic = this.baseInfoData.pic.replace(`${process.env.VUE_APP_SERVER_PICSERVER_URL}`,'')
               const result: ICourseBaseInfo = await submitBaseInfo(this.baseInfoData)
        if (result.id !== undefined) {
          this.syncCourseBaseId = result.id
          resolve()
        }
      } else {
        this.$message.error('请正确输入表单内容')
        reject()
      }
    })
  }

  // 验证规则
  private rules = {
    name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
    uiCategoryTreeSelected: [
      {
        required: true,
        message: '请选择课程分类',
        trigger: 'change'
      }
    ],
    charge: [{ required: true, message: '请输入收费规则', trigger: 'blur' }],
    grade: [{ required: true, message: '请输入课程等级', trigger: 'blur' }],
    users: [{ required: true, message: '请输入适用人群', trigger: 'blur' }]
    // price: [
    //   {
    //     required: true,
    //     message: '请正确输入课程价格',
    //     trigger: 'change'
    //   }
    // ]
  }
  public validateForm(): Promise<boolean> {
    return new Promise(resolve => {
      let form: ElForm = this.$refs['form'] as ElForm
      form.validate(valid => resolve(valid))
    })
  }

  async created() {
    this.categoryTreeData = await category()
  }

  // 事件 handle
  private handleCategoryTreeChange(data) {
    console.log(data)
    this.baseInfoData.mt = data[0]
    this.baseInfoData.st = data[1]
  }

  // 监控 watch
  // 搜索栏
  // @Watch('baseInfoData', { deep: true, immediate: true })
  // private watchListQueryData(newVal: ICourseBaseInfo) {
  //   if (newVal === undefined) {
  //     return
  //   }
  //   this.categoryTreeSelected = [newVal.mt, newVal.st]
  // }
}
</script>

<style lang="scss" scoped>
.step-body {
  width: 800px;
  margin: 0px auto;
}
</style>