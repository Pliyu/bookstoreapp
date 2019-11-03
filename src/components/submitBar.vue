<template>
  <div class='sub-submit-bar'>
    <div class='sub-submit-bar-_bar'>
      <slot name='left'></slot>
      <div class='sub-submit-bar-_bar-text' v-if='!pIsEdit'>
        <span>合计：</span>
        <span class='sub-submit-bar-_bar-text-price'>
          ￥ {{ pTotalPrice }}
        </span>
      </div>
      <van-button class='sub-submit-bar-_bar-button'
      type='danger'
      square
      size='large'
      @click='onClickSave'>
      {{ pIsEdit ? '删除' : '去结算' }}
      </van-button>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
@Component
export default class SubmitBar extends Vue {
  @Prop({ default: 0 })
  pTotalPrice!: number
  @Prop({ default: false })
  pIsEdit!: boolean

  @Emit('click-button')
  public onClickSave (): boolean {
    return this.pIsEdit
  }
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
@import '~@/style/mixins.less';
.sub-submit-bar{
  position: absolute;
  bottom: 50px;
  width: 100%;
  border-top: 1px solid @gray5;
  border-bottom: 1px solid @gray5;
  height: 50px;
  font-size: @large-font-size;
  .mixin-max-wh();
  &-_bar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-text{
      text-align: right;
      padding-right: @small-horz-padding;
      &-price{
        color: @red;
        font-size: @larger-font-size;
      }
    }
    &-button{
      width: 160px;
    }
  }
}
</style>
