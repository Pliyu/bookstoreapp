<template>
  <div class='ti-body-content'>
    <div class='ti-body-content-iconBut'
    v-for='(tool, index) in toolItemList'
    :key='index'
    @click='onClickItem(tool)'>
    <div class='ti-body-content-iconBut-icon'
    :style="{
      'background': tool.color,
      'box-shadow': getBoxShadow(tool) }">
      <van-icon class='ti-body-content-iconBut-icon-ele'
      color='white'
      :name='tool.icon'></van-icon>
    </div>
      <div class='ti-body-content-iconBut-title'>
        {{ tool.title }}
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import consts from '@/common/const'
@Component({
  components: {
  }
})
export default class ToolItems extends Vue {
  public toolItemList = consts.toolList

  public getBoxShadow (tool: any): string {
    return `${tool.color} 0 3px 6px`
  }
  @Emit('click-tool')
  public onClickItem (tool: object): void {}
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
.ti-body-content{
  background: @white;
  display: flex;
  flex-wrap: wrap;
  &-iconBut{
    width: 25%;
    text-align: center;
    margin: @vertical-padding 0;
    &-icon{
      width: 50%;
      height: 0;
      padding-bottom: 50%;
      text-align: center;
      border-radius: 50%;
      font-size: @h1-font-size;
      margin: 0 auto;
      position: relative;
      &-ele{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
      }
    }
    &-title{
      font-size: @large-font-size - 1;
      color: @gray6;
      margin-top: @small-horz-padding;
    }
  }
}
</style>
