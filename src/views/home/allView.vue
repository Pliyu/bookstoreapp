<template>
  <van-list
  v-model='loading'
  :finished='finished'
  finished-text='没有更多了'
  @load='onLoad'>
  </van-list>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class componentName extends Vue {
  public loading: boolean = false
  public finished: boolean = false

  public onLoad (): void {}
}
</script>
<style lang='less'>
@import '~@/style/variables.less';
</style>
