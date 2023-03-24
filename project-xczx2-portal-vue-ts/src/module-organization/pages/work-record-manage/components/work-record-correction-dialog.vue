<template>
  <el-dialog :title="'题目：' + question" :visible.sync="syncDialogVisible">
    <el-form ref="form" :model="workRecord">
      <el-form-item>{{ answer }}</el-form-item>
      <el-form-item>
        <el-input
          type="textarea"
          :rows="5"
          v-model="workRecord.correctComment"
          placeholder="请输入作业点评"
          maxlength="500"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="syncDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleCorrectionWorkRecord">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Emit } from 'vue-property-decorator'
import { Form as ElForm } from 'element-ui'
import { IWorkRecordDTO } from '@/entity/work-record-page-list'
import { correctionWorkRecord } from '@/api/work-record'

@Component
export default class WorkRecordCorrectionDialog extends Vue {
  @PropSync('dialogVisible', { type: Boolean, required: true, default: false })
  syncDialogVisible!: boolean
  @Prop({ type: String, required: true, default: '' })
  readonly question!: string
  @Prop({ type: String, required: true, default: '' }) readonly answer!: string
  @Prop({ type: Object, required: true }) readonly workRecord!: IWorkRecordDTO

  /**
   * 批改作业
   */
  private async handleCorrectionWorkRecord() {
    let correction = {
      workRecordId: this.workRecord.workRecordId,
      correctComment: this.workRecord.correctComment
    }

    // 提交表单
    await correctionWorkRecord(correction)

    // 用户提示
    this.$message.success('批改作业成功')
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
