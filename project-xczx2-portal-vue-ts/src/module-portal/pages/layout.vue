<template>
  <div>
    <PortalHeader />
    <div class="page-container">
      <router-view />
    </div>
    <PortalFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PortalHeader from '@/components/portal-header/index.vue' // @ is an alias to /src
import PortalFooter from '@/components/portal-footer/index.vue'

@Component({
  name: 'Layout',
  components: {
    PortalHeader,
    PortalFooter
  }
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/base';
.page-container {
  padding: 20px;
  min-height: 400px;
}
</style>
