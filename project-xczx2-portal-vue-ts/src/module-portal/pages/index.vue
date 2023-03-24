<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// @Component({})
export default {
  name: 'app',
    components: {
    },
    created: function () {
      this.$router.push('/organization/course-list')
    }
}
</script>

<style lang="scss" scoped>

</style>
