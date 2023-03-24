<template>
  <el-dialog
    :title="`${getAction()}作业`"
    :visible.sync="syncDialogVisible"
    @open="clearValidate"
    @close="clearValidate"
  >
    <el-form ref="form" :model="work" :rules="rules" :label-width="formLabelWidth">
      <el-form-item label="作业名称：" prop="title">
        <el-input v-model="work.title" placeholder="请输入作业名称"></el-input>
      </el-form-item>
      <el-form-item label="题干：" prop="question">
        <el-input
          type="textarea"
          :rows="5"
          v-model="work.question"
          placeholder="请输入作业要求"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="syncDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddWork">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { IWorkVO } from '@/entity/work-page-list'
import { addWork } from '@/api/works'

@Component
export default class WorkAddDialog extends Vue {
  @PropSync('dialogVisible', { type: Boolean, required: true, default: false })
  syncDialogVisible!: boolean
  @Prop({ type: Object, required: true }) readonly work!: IWorkVO

  private formLabelWidth: string = '120px'
  // 验证规则
  private rules: any = {
    title: [{ required: true, message: '请输入作业名称', trigger: 'change' }],
    question: [{ required: true, message: '请输入作业要求', trigger: 'change' }]
  }
  // 用户操作
  getAction() {
    return !this.work.workId ? '新增' : '编辑'
  }

  /**
   * 清除校验
   */
  private clearValidate() {
    this.$nextTick(() => {
      let form: ElForm = this.$refs['form'] as ElForm
      form.clearValidate()
    })
  }

  /**
   * 新增/编辑作业
   */
  private async handleAddWork() {
    // 表单验证
    let isValid: boolean = true
    let form: ElForm = this.$refs['form'] as ElForm
    form.validate((valid: boolean) => {
      isValid = valid
    })
    if (!isValid) {
      return isValid
    }
    // 提交表单
    await addWork(this.work)

    // 用户提示
    this.$message.success(`${this.getAction()}作业成功`)
    this.syncDialogVisible = false

    // 刷新列表
    this.refreshList()
  }

  /**
   * 刷新列表
   */
  @Emit('refreshList')
  private refreshList() {}
}
</script>
