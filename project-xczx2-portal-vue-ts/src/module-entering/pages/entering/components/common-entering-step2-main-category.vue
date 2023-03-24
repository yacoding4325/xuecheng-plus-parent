<template>
  <el-select v-if="categoryTreeData.length > 0" v-model="syncedMainCategory" placeholder="请选择主营类目">
    <el-option
      v-for="(item, index) in categoryTreeData"
      :key="index"
      :label="item.label"
      :value="item.id"
    ></el-option>
  </el-select>
</template>


<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
import { category } from '@/api/courses'
import { ICourseCategory } from '@/entity/course-add-base'

@Component
export default class CommonEnteringStep2MainCategory extends Vue {
  @PropSync('mainCategory', { type: String, required: false, default: '' })
  syncedMainCategory!: string

  private categoryTreeData: ICourseCategory[] = []

  /**
   * 生命周期钩子
   */
  async created() {
    this.categoryTreeData = await category()
  }
}
</script>