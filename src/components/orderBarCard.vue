<template>
  <div class='obc-content'>
    <div class='obc-content-iconbut'
    v-for='(orderBar, index) in orderBarList'
    :key='index'
    @click='onClickIcon(orderBar)'>
      <van-icon class='obc-content-iconbut-icon'
      :name='orderBar.iconName'>
      </van-icon>
      <div class='obc-content-iconbut-title'>{{ orderBar.title }}</div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import consts from '@/common/const'
@Component
export default class OrderBarCard extends Vue {
  public orderBarList: Array<object> = consts.orderBarTypes

  @Emit('click-bar')
  onClickIcon (orderBar: object) {}
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
.obc-content{
  display: flex;
  justify-content: space-between;
  padding: @horizontal-padding - 0.075 @small-horz-padding;
  &-iconbut {
    font-size: @large-font-size - 1;
    text-align: center;
    margin: @horizontal-padding @vertical-padding;
    &-icon{
      font-size: @h1-font-size;
    }
    &-title{
      width: 100%;
    }
  }
}
</style>
