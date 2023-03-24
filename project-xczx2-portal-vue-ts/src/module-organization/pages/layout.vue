<template>
  <div>
    <PortalHeader />
    <div class="page-container">
      <div class="course-list portal-content">
        <org-banner></org-banner>
        <nav-bar></nav-bar>
        <router-view />
      </div>
    </div>
    <PortalFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PortalHeader from '@/components/portal-header/index.vue' // @ is an alias to /src
import PortalFooter from '@/components/portal-footer/index.vue'
import OrgBanner from '../components/org-banner.vue'
import NavBar from '../components/nav-bar.vue'

@Component({
  name: 'Layout',
  components: {
    PortalHeader,
    PortalFooter,
    OrgBanner,
    NavBar
  }
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/base';
.course-list {
  .nav-bar {
    margin-top: 16px;
  }
}
</style>
