<template>
  <header>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'PortalHeader'
})
export default class extends Vue {
  private userName: string = UserModule.name
  private portal_url: string = process.env.VUE_APP_CLIENT_PORTAL_URL
  private keyword: string = ''

  /**
   * 跳转到课程列表页
   */
  private handleSearchCourse() {
    window.open(
      `${this.portal_url}/pages/learing-list.html?k=${this.keyword}`,
      '_blank'
    )
  }

  /**
   * 退出登录
   */
  private handleLogout() {
    UserModule.LogOut()
  }
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
