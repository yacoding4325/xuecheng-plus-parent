<template>
  <div class="step-body">
    <p class="pho-success">恭喜，新密码设置成功</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ChangePasswordStep3Finish extends Vue {}
</script>

<style lang="scss" scoped>
.step-body {
  .pho-success {
    font-size: 26px;
    text-align: center;
  }

  .pho-success::before {
    content: ' ';
    display: inline-block;
    position: relative;
    margin-right: 10px;
    top: 7px;
    width: 35px;
    height: 35px;
    background: url('../../../../assets/img/success.png') center center
      no-repeat;
    background-size: cover;
  }
}
</style>