<template>
  <div class='bb-bottom-content'>
    <span>{{ info }}</span>
    <span>- 技术支持 -</span>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
@Component
export default class BaseBottom extends Vue {
  @Prop({ default: 'BOOKSTORE' })
  private info!: string
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
@import '~@/style/mixins.less';
.bb-bottom-content{
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: @gray1;
  .mixin-max-wh();
  font-size: @small-font-size;
  color: @gray5;
}
</style>
