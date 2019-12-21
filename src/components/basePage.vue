<template>
  <div>
    <van-nav-bar id="header-nav-bar"
    :title='headerTitle'
    fixed
    :left-text='leftArrow ? "返回" : ""'
    :left-arrow='leftArrow'
    :z-index='101'
    @click-left='onClickBack'>
      <slot name='left' slot='left'></slot>
      <slot name='title' slot='title'></slot>
      <slot name='right' slot='right'></slot>
    </van-nav-bar>
    <div class='header-placeholder'></div>
    <div>
     <slot />
    </div>
    <div class='foot-placeholder'></div>
    <foot-tab-bar v-if='isShowFootTab' :tabs='footTabs'></foot-tab-bar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { goBack } from '@/common/miscutil'
import FootTabBar from './footTabbar.vue'

@Component({
  name: 'basePage',
  components: {
    FootTabBar
  }
})
export default class BasePage extends Vue {
  @Prop({ default: '' })
  private headerTitle!: string

  @Prop({ default: true })
  private leftArrow!: Boolean

  @Prop({ default: null })
  private clickBack!: Function

  @Prop({ default: function () { return [] } })
  private footTabs!: Array<any>

  public get isShowFootTab (): boolean {
    if (this.footTabs && this.footTabs.length > 0) {
      return true
    }
    return false
  }

  onClickBack () {
    if (!this.leftArrow) {
      return
    }
    if (this.clickBack) {
      this.clickBack()
    } else {
      goBack(this.$router)
    }
  }
}
</script>

<style lang="less">
@import '~@/style/mixins.less';
#header-nav-bar{
  .mixin-max-wh();
  .mixin-fixed-cl();
}
.header-placeholder{
  height: 46px;
}
.foot-placeholder{
  height: 50px;
}
</style>
