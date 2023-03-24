<template>
  <div class="only-setting">
    <div class="title">个人设置</div>
    <div class="portrait">
      <img src="../../../assets/img/myImg.jpg" alt />
      <p>{{ userInfo.name }}</p>
      <p>{{ userInfo.phone | phoneFormat }}</p>
    </div>
    <div class="title">账户设置</div>
    <div class="account">
      <div class="item">
        <div class="ico" style="background-position: -41px 10px"></div>
        <div>
          <p>
            <em>密码</em>
            已绑定（{{ userInfo.phone | phoneFormat }}）
          </p>
          <p>您可以享受手机相关的安全及提醒服务</p>
        </div>
        <router-link to="/personal/change-password" class="submit">修改密码</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MixinTools from '@/utils/mixins.vue'
import Pagination from '@/components/pagination/index.vue'

import { profile } from '@/api/learning-user'
import { IUserInfo } from '@/entity/user-login'
import { UserModule } from '@/store/modules/user'

@Component({
  components: {
    Pagination
  }
})
export default class Setting extends mixins(MixinTools) {
  private userInfo: IUserInfo = {}

  /**
   * 生命周期钩子
   */
  created() {
    this.userInfo.username = this.userInfo.phone = UserModule.name
    this.userInfo.name = '梦醒时分'
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables';
.only-setting {
  padding: 20px;
  .title {
    color: $master-color-5;
    font-size: 18px;
    margin: 20px 0 10px 0;
    span {
      color: $master-color-3;
      font-size: 14px;
    }
  }
  .portrait {
    background: $master-color-0;
    overflow: hidden;
    padding: 20px;
    font-size: 18px;
    img {
      float: left;
      margin-right: 10px;
    }
    .ch {
      font-size: 14px;
      color: $master-color-5;
    }
  }
  .account,
  .social {
    background: $master-color-0;
    overflow: hidden;
    padding: 20px;
    .item {
      overflow: hidden;
      p {
        color: $master-color-4;
        line-height: 24px;
        em {
          color: $black;
          padding-right: 10px;
          font-weight: bold;
        }
      }
      .ico {
        background: url('../../../assets/img/setIco.png') no-repeat;
        float: left;
        font-size: 26px;
        color: $master-color-8;
        padding-top: 10px;
        margin-right: 10px;
        height: 61px;
        width: 40px;
      }
      .submit {
        border: solid 1px $master-color-4;
        color: $master-color-4;
        background: $master-color-0;
        float: right;
        position: relative;
        bottom: 30px;
        right: 20px;
        padding: 0 20px;
        text-decoration: none;
      }
    }
  }
}
</style>
