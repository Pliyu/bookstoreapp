<template>
  <base-page header-title='首页' :left-arrow='false' :foot-tabs='footTabs'>
    <div class='home-top'>
      <van-tabs class='home-top-left'
      @change='onChange'>
        <van-tab v-for='(tab, index) in tabsList'
        :key='index'
        :title='tab.title'></van-tab>
      </van-tabs>
      <div class='home-top-right'>
        <span class='home-top-right-icon'><van-icon name='search'></van-icon></span>
        <span><van-icon name='shopping-cart-o' @click='onClickCart'></van-icon></span>
      </div>
    </div>
    <component ref='tabView' :is='homeComponent'></component>
  </base-page>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BasePage from '@/components/basePage.vue'
import consts from '@/common/const'
import HomeView from './homeView.vue'
import AllView from './allView.vue'
import HistoryView from './historyView.vue'

@Component({
  components: {
    BasePage,
    HomeView,
    AllView,
    HistoryView
  }
})
export default class Home extends Vue {
  public footTabs: Array<object> = consts.footTabs
  public tabsList: Array<object> = consts.tabsList

  public homeComponent: string = 'HomeView'

  public onChange (index: number, title: string): void {
    this.homeComponent = index === 0 ? 'HomeView' : index === 1 ? 'AllView' : 'HistoryView'
  }
  public onClickCart (): void {
    this.$router.push('/cart')
  }
}
</script>

<style lang='less'>
@import '~@/style/variables.less';
.home-top{
  display: flex;
  justify-content: space-between;
  color: @gray6;
  &-left{
    flex: 1;
  }
  &-right{
    flex: 1;
    font-size: @h2-font-size;
    text-align: right;
    border-bottom: 1px solid #ebedf0;
    span{
      margin-top: 0.1rem;
      padding: @small-horz-padding - 0.1;
      display: inline-block;
    }
  }
}
</style>
