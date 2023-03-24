<template>
  <div
    class="clouse-type"
    :class="{ selected: addtype == syncSelectedTypeCode }"
    @click="handleTypeSelected"
  >
    <div class="icon">
      <img src="@/assets/img/icon_zhiboke@2x.png" v-if="addtype == '200003'" />
      <img src="@/assets/img/icon_luboke@2x.png" v-if="addtype == '200002'" />
    </div>
    <div class="title">{{title}}</div>
  </div>
</template>

<style lang="scss" scoped>
.clouse-type {
  cursor: pointer;
  width: 152px;
  height: 174px;
  border-radius: 6px;
  text-align: center;
  padding-top: 20px;
  // 未选中
  background: rgba(249, 249, 249, 1);
  border: 0px;

  .icon {
    margin: 0px auto;
    width: 80px;
    height: 80px;
    border: 1px dotted #e4e7ed;
    img {
      height: 80px;
      width: 80px;
    }
  }
  .title {
    padding-top: 20px;
    color: #666666;
  }
  &.selected {
    background: rgba(249, 253, 255, 1);
    border: 1px solid rgba(0, 164, 255, 1);
  }
}
// .clouse-type .selected {
//   background: rgba(249, 249, 249, 1);
//   border: 0px;
// }
</style>

<script lang="ts">
import { Component, Prop, PropSync, Watch, Vue } from 'vue-property-decorator'

@Component({
  name: 'CourseAddTypeItem'
})
export default class extends Vue {
  @PropSync('selectedTypeCode', { type: String, default: 'zhibo' })
  syncSelectedTypeCode!: String
  @Prop({ type: String, default: '200003' }) addtype!: string
  @Prop({ type: String, default: '' }) title!: string

  handleTypeSelected() {
    this.syncSelectedTypeCode = this.addtype
  }
}
</script>
