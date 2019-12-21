<template>
  <base-page header-title='我的' :left-arrow='false' :foot-tabs='footTabs'>
    <div class='self-top'>
      <div class='self-top-header'>
        <div class='self-top-header-img'>
          <img v-if='hasAvatar' :src='hasAvatar' alt="" />
          <img v-else src='../../assets/avatardefault.png' alt='' />
        </div>
        <div class='self-top-header-info'>
          <span v-if='hasAvatar'>姓名</span>
          <van-button v-else
          class='self-top-header-info-button'
          round
          type='info'
          size="small"
          @click='onClickSign'>点击登录</van-button>
        </div>
      </div>
      <div class='self-top-case'>
        <div class='self-top-case-top'>
          <span class='self-top-case-top-self'>我的订单</span>
          <span class='self-top-case-top-order'>查看全部订单<van-icon name='arrow'></van-icon></span>
        </div>
        <order-bar-card @click-bar='onClickBar'></order-bar-card>
      </div>
    </div>
    <div class='self-center'>
      <tool-items @click-tool='onClickTool'></tool-items>
    </div>
    <base-bottom></base-bottom>
  </base-page>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import BasePage from '@/components/basePage.vue'
import consts from '@/common/const'
import OrderBarCard from '@/components/orderBarCard.vue'
import ToolItems from '@/components/toolItems.vue'
import BaseBottom from '@/components/baseBottom.vue'

@Component({
  components: {
    BasePage,
    OrderBarCard,
    BaseBottom,
    ToolItems
  }
})
export default class Self extends Vue {
  public footTabs: Array<object> = consts.footTabs
  public userInfo: any = {}

  public get hasAvatar (): string {
    if (!this.userInfo || !this.userInfo.avatar) {
      return ''
    }
    return this.userInfo.avatar
  }
  public onClickBar (bar: any): void {
    console.log(bar)
  }
  public onClickSign (): void {
    this.$router.push('/login')
  }
  public onClickTool (toolItem: any): void {
    this.$toast('即将开放，敬请期待')
    console.log(toolItem.type)
    return
  }
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
@import '~@/style/mixins.less';
.self-top{
  background: @gray1;
  &-header{
    height: 105px;
    background: @base-color;
    display: flex;
    padding: @item-space @large-item-space;
    &-img{
      width: 75px;
      height: 75px;
      border-radius: 50%;
      &-icon{
        font-size: @larger-font-size;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    &-info{
      margin-left: @item-space;
      font-size: @h2-font-size;
      margin-top: @small-horz-padding * 3;
      &-button{
        border: 1px solid @white;
        padding: 0 @horizontal-padding;
      }
    }
  }
  &-case{
    position: relative;
    top:-30px;
    background: @white;
    border-radius: 10px;
    margin: 0 @large-item-space;
    box-shadow: 0 4px 8px #e6e6e6;
    &-top{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid @gray4;
      padding: @horizontal-padding - 0.075 @small-horz-padding - 0.1;
      font-size: @normal-font-size;
      &-self{
        padding: 0 @small-horz-padding;
        font-weight: 600;
      }
      &-order{
        padding: 0 @small-horz-padding;
        color: @gray5;
      }
    }
  }
}
.self-center{
  margin: @large-item-space 0;
}
</style>
