<template>
  <div class="step-body">
    <div class="banner">
      <el-button type="primary" size="medium" class="btn-add el-button" @click="handleAdd">+添加教师</el-button>
    </div>

    <!-- 数据列表 -->
    <el-table
      class="dataList"
      v-loading="listLoading"
      :data="listData"
      border
      style="width: 100%"
      :header-cell-style="{textAlign: 'center'}"
    >
      <el-table-column prop="teacherName" label="教师名称" align="center" width="100"></el-table-column>
      <el-table-column prop="position" label="教师职位" align="center" width="100"></el-table-column>
      <el-table-column prop="introduction" label="教师简介" width="600"></el-table-column>
      <el-table-column label="教师照片" align="center" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.photograph" :alt="scope.row.teacherName" width="90" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框 -->
    <SaveTeacherDialog
      ref="dialog"
      :dialogVisible.sync="isDialogVisible"
      :teacherData="teacherData"
      @complete="getList"
    />
  </div>
</template>


<script lang="ts">
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { IKVData } from '@/api/types'
import { getTeachers, deleteTeacher } from '@/api/courses'
import { ICourseTeacherList } from '@/entity/course-add-teacher'
import SaveTeacherDialog from './course-add-step3-teacher-dialog.vue'
import MixinTools from '@/utils/mixins.vue'

@Component({
  name: 'CourseAddStep3Teacher',
  components: { SaveTeacherDialog }
})
export default class extends mixins(MixinTools) {
  @Prop({ type: Number })
  courseBaseId!: number

  // 查询
  private listData: ICourseTeacherList[] = [] // 数据体
  private listLoading: boolean = false // 是否载入中
  private isDialogVisible: boolean = false

  // 当前编辑的老师
  private teacherData: ICourseTeacherList = {
    courseId: this.courseBaseId,
    teacherName: '',
    position: '',
    introduction: ''
  }

  // 获取老师列表
  public async getList() {
    this.listLoading = true
    this.listData = await getTeachers(this.courseBaseId)
    this.listLoading = false
  }

  // 添加
  private handleAdd() {
    this.teacherData = {
      courseId: this.courseBaseId,
      teacherName: '',
      position: '',
      introduction: ''
    }
    this.isDialogVisible = true
  }

  // 修改
  private handleEdit(data: ICourseTeacherList) {
    // debugger
    this.teacherData = data
    this.isDialogVisible = true
  }

  // 删除
  private async handleDelete(data: ICourseTeacherList) {
    try {
      await this.showDeleteConfirm()
      await deleteTeacher(this.courseBaseId, data.courseTeacherId)
      await this.getList()
    } catch (error) {}
  }
}
</script>

<style lang="scss" scoped>
.step-body {
  // width: 600px;
  margin: 0px auto;
  .banner {
    text-align: right;
    padding-bottom: 10px;
  }
}
</style>
