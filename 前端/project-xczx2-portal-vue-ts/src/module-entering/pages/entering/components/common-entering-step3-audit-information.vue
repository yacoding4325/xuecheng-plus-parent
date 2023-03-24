<template>
  <div class="audit-information">
    <img src="@/assets/img/audit_information.png" class="img" />
    <div class="tips">资料已提交，请等待管理员审核，我们将在2个工作日内完成审核工作。</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CommonEnteringStep3AuditInformation extends Vue {}
</script>

<style lang="scss" scoped>
.audit-information {
  .img {
    display: block;
    margin: 122px auto 0;
  }

  .tips {
    margin-top: 53px;
    color: #666666;
    font-size: 18px;
    text-align: center;
  }
}
</style>