<template>
  <div class="workspace">
    <div class="banner">
      <span class="primary-title">{{title}}</span>
    </div>

    <!-- 步骤 -->
    <div class="steps">
      <!-- 导航 -->
      <div class="nav">
        <el-steps :active="stepsActive" simple style>
          <el-step title="基本信息">
            <template slot="icon">1</template>
          </el-step>
          <el-step title="课程大纲">
            <template slot="icon">2</template>
          </el-step>
          <el-step title="教师设置">
            <template slot="icon">3</template>
          </el-step>
        </el-steps>
      </div>

      <div class="body">
        <!-- step 1 基本信息 -->
        <CourseAddStep1BaseInfo
          v-show="stepsActive === 0"
          ref="step1"
          :courseBaseId.sync="courseBaseId"
          :teachmode="teachmode"
        />

        <!-- step 2 课程大纲 -->
        <CourseAddStep2Outline
          v-show="stepsActive === 1"
          ref="step2"
          :courseBaseId="courseBaseId"
          :teachmode="teachmode"
        />

        <!-- step 3 教师设置 -->
        <CourseAddStep3Teacher v-show="stepsActive === 2" ref="step3" :courseBaseId="courseBaseId" />
      </div>

      <!-- 按钮 上一步 下一步 完成 -->
      <div class="footer">
        <!-- 上一步 -->
        <el-button @click="handlePrev" v-if="stepsActive > 0">上一步</el-button>
        <!-- 下一步 -->
        <el-button type="primary" @click="handleNext">
          <template v-if="stepsActive==0 || stepsActive==1">保存并进行下一步</template>
          <template v-else-if="stepsActive==2">保存</template>
        </el-button>
      </div>
    </div>

    <!-- end -->
  </div>
</template>



<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import CourseAddStep1BaseInfo from './course-add-step1-base.vue'
import CourseAddStep2Outline from './course-add-step2-outline.vue'
import CourseAddStep3Teacher from './course-add-step3-teacher.vue'

@Component({
  name: 'CourseAdd',
  components: {
    CourseAddStep1BaseInfo,
    CourseAddStep2Outline,
    CourseAddStep3Teacher
  }
})
export default class extends Vue {
  private courseBaseId: number = 0 // 课程id
  private teachmode: string = '' // 课程模式
  private stepsActive: number = 0 // 当前step
  private title: string = '录播课程'

  constructor() {
    super()
  }

  async created() {
    if (this.$route.query['teachmode'] !== undefined) {
      this.teachmode = String(this.$route.query['teachmode'])
      if (this.teachmode === '200003') {
        this.title = '直播课程'
      }
    }
    if (this.$route.query['courseBaseId'] !== undefined) {
      this.courseBaseId = Number(this.$route.query['courseBaseId'])
      this.title += '-修改'
    } else {
      this.title += '-新增'
    }
  }

  async mounted() {
    // 读取基本信息
    await (this.$refs['step1'] as CourseAddStep1BaseInfo).getData()
  }

  // 上一页
  handlePrev() {
    this.stepsActive -= 1
  }

  // 下一页
  async handleNext() { 
    // try {
    if (this.stepsActive == 0) {
      // 保存基本信息
      await (this.$refs['step1'] as CourseAddStep1BaseInfo).saveData()
      // 读取大纲
      await (this.$refs['step2'] as CourseAddStep2Outline).getList()
      // next
      this.stepsActive += 1
    } else if (this.stepsActive == 1) {
      // 读取教师列表
      await (this.$refs['step3'] as CourseAddStep3Teacher).getList()
      // next
      this.stepsActive += 1
    } else if (this.stepsActive == 2) {
      this.$router.push({
        path: '/organization/course-list'
      })
    }
    // } catch (error) {
    // }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  padding: 20px;
  .nav {
    padding-bottom: 20px;
  }
  .body {
    padding: 30px 0px 50px 0px;
    // background-color: darkcyan;
  }
  .footer {
    padding: 20px 0px 20px 0px;
    border-top: 1px solid #ededed;
    text-align: center;
  }
}
</style>
