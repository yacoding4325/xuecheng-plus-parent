<template>
  <div class="org-banner">
    <div class="left">
      <img class="logo" src="@/assets/img/logo@2x.png" />
    </div>
    <div class="right">
      <div class="top">北京博学谷科技有限公司</div>
      <div class="bottom">
        <span class="create-time">创建时间：2016-12-12</span>
        <span class="authentication">未认证</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.org-banner {
  .left {
    float: left;
    padding-right: 16px;
    .logo {
      width: 61px;
      height: 69px;
    }
  }
  .right {
    padding-top: 8px;
    // display: table-cell;
    // vertical-align: middle;
    height: 69px;
    // background-color: antiquewhite;
    .top {
      // margin-top: 10px;
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
    .bottom {
      margin-top: 5px;
      .create-time {
        display: inline-block;
        width: 160px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
      }
      .authentication {
        display: inline-block;
        width: 50px;
        height: 20px;
        background: rgba(255, 235, 222, 1);
        border-radius: 2px;
        border: 1px solid rgba(255, 124, 44, 1);

        text-align: center;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(250, 100, 0, 1);
        line-height: 17px;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "OrgBanner"
})
export default class extends Vue {}
</script>
