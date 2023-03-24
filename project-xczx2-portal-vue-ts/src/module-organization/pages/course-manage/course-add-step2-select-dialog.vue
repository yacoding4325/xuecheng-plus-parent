<template>
  <el-dialog :title="title" width="500px" :visible.sync="syncDialogVisible">
    <div class="types">
      <el-select
        v-model="selValue"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteQuery"
        :loading="loading"
      >
        <!-- 视频 文档 -->
        <template v-if="options.items !== undefined && (type === 'video' || type === 'doc')">
          <el-option
            v-for="item in options.items"
            :key="item.id"
            :label="item.filename"
            :value="item.id"
          ></el-option>
        </template>
        <!-- 作业 -->
        <template v-if="options.items !== undefined && type === 'work'">
          <el-option
            v-for="item in options.items"
            :key="item.workId"
            :label="item.title"
            :value="item.workId"
          ></el-option>
        </template>
      </el-select>
    </div>
    <div slot="footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.types {
  text-align: center;
  height: 80px;
  .item {
    display: inline-block;
    width: 50%;
    height: 100%;
    // background-color: bisque;
    padding-top: 20px;
    .selected-item {
      margin: 0px auto;
    }
  }
  .el-select {
    width: 90%;
  }
}
</style>

<script lang="ts">
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator'
import CourseAddTypeItem from './course-addtype-item.vue'
import { IMediaPageList, IMediaBaseDTO } from '@/entity/media-page-list'
import { getMediaPageList } from '@/api/media'
import { getWorkPageList } from '@/api/works'
import { IWorkPageList, IWorkDTO } from '@/entity/work-page-list'

@Component({
  name: 'OutlineSelectDialog',
  components: { CourseAddTypeItem }
})
export default class extends Vue {
  @PropSync('dialogVisible', { type: Boolean, default: false })
  syncDialogVisible!: boolean
  @Prop({ required: true, type: String, default: '' })
  type!: string
  @Prop({ required: true, type: String, default: '' })
  title!: string

  private loading: boolean = false
  private options: any = {}
  private selValue: any = null

  public restForm() {
    this.loading = false
    this.options = {}
    this.selValue = null
  }

  async remoteQuery(query) {
    this.loading = true
    if (query !== '') {
      if (this.type === 'video') {
        this.options = await getMediaPageList(undefined, {
          filename: query,
          type: '001002',
          auditStatus: '002003'
        })
      } else if (this.type === 'doc') {
        this.options = await getMediaPageList(undefined, {
          filename: query,
          type: '001003'
        })
      } else if (this.type === 'work') {
        this.options = await getWorkPageList(
          {
            title: query
          },
          undefined
        )
      }
    } else {
      this.options = {}
    }
    this.loading = false
  }

  handleSelect(item) {
    console.log(item)
  }
  handleCancel() {
    this.syncDialogVisible = false
  }
  handleSubmit() {
    if (this.type === 'video' || this.type === 'doc') {
      this.$emit('onSelected', {
        type: this.type,
        value: this.options.items.filter(item => item.id === this.selValue)[0]
      })
    } else if (this.type === 'work') {
      this.$emit('onSelected', {
        type: this.type,
        value: this.options.items.filter(
          item => item.workId === this.selValue
        )[0]
      })
    }
    this.syncDialogVisible = false
  }
}
</script>
