<template>
  <div>
    <van-tabbar v-if='isShowTabbar'
    id="foot-guide"
    v-model='active'
    @change='tabChanged'
    :fixed='true'>
      <van-tabbar-item v-for='tab in tabs'
      :key='tab.name'
      :icon='tab.icon'>
      {{ tab.name }}
      </van-tabbar-item>
      <slot name='footer'></slot>
    </van-tabbar>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class FootTabBar extends Vue {
    @Prop({ default: function () { return [] } })
    private tabs!: Array<any>

    private active: number = 0

    public get isShowTabbar (): boolean {
      return this.tabs.length > 0
    }

    public mounted ():void {
      this.updateActive()
    }
    // @Watch('tabs', { immediate: true, deep: true })
    public tabChanged (active: number) {
      this.$router.push(this.tabs[active].path)
    }

    public isMatchPath (tabPath: string): boolean {
      if (this.$route.path.indexOf(tabPath) !== -1) {
        return true
      }
      for (let match of this.$route.matched) {
        if (match.path.indexOf(tabPath) !== -1) {
          return true
        }
      }
      return false
    }

    public updateActive () {
      for (let index = 0; index < this.tabs.length; index++) {
        if (this.isMatchPath(this.tabs[index].path)) {
          this.active = index
          break
        }
      }
    }
}
</script>
<style lang='less'>
@import '~@/style/mixins.less';
#foot-guide{
  .mixin-max-wh();
  left: 50%;
  transform: translateX(-50%);
}
</style>
