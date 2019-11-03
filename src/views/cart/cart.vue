<template>
  <base-page header-title='购物车' :left-arrow='false' :foot-tabs='footTabs'>
    <span @click='onClickEdit'
    class='cart-header-right'
    slot='right'>
      {{ !isEdit ? '管理' : '完成' }}
    </span>
    <div v-if='isLogin'
    class='cart-empty-content'>
      <div class='cart-empty-content-tips'>
        <img src='../../assets/logo.png' alt=''/>
        <span>登录才能看到购物车哦</span>
      </div>
      <div class='cart-empty-content-button'>
        <van-button type='info' round size='large' @click='onClickSign'>点击登录</van-button>
      </div>
      <base-bottom></base-bottom>
    </div>
    <div v-else
    class='cart-data'>
      <div v-if='isShowCart'
      class='cart-data-list'>
        <div class='cart-data-list-items'
        v-for='cart in cartList'
        :key='cart.skuid'>
          <div class='cart-data-list-items-checkbox'>
            <van-checkbox
            v-model='cart.isChecked'
            @change='onOddChange(cart)'></van-checkbox>
          </div>
          <cart-item class='cart-data-list-items-cart'
          :p-title='cart.title'
          :p-price='cart.price'
          :p-thumb='cart.imgPath'
          :p-num='cart.num'
          :p-desc='cart.desc'>
            <van-stepper class='cart-data-list-items-cart-stepper'
            slot="num"
            min='0'
            v-model='cart.count'
            @change='onChange($event, cart)'></van-stepper>
          </cart-item>
        </div>
        <submit-bar
        :p-total-price='totalPrice'
        :p-is-edit='isEdit'
        @click-button='onClickSubBar'>
          <van-checkbox class='cart-submit-box'
          slot='left'
          v-model='selectAll'
          @change='onAllChange'>
            全选
          </van-checkbox>
        </submit-bar>
      </div>
      <div v-else
      class='cart-data-empty'>
        <img src='../../assets/cart.png' alt='' />
        <span>购物车还是空的,快快采购~~</span>
        <base-bottom></base-bottom>
      </div>
    </div>
  </base-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import BasePage from '@/components/basePage.vue'
import consts from '@/common/const'
import BaseBottom from '@/components/baseBottom.vue'
import { Getter, Mutation } from 'vuex-class'
import CartItem from '@/components/cartItem.vue'
import { Dialog } from 'vant'
import MutationTypes from '@/store/mutation-types'
import SubmitBar from '@/components/submitBar.vue'

@Component({
  components: {
    BasePage,
    BaseBottom,
    CartItem,
    SubmitBar
  }
})
export default class Cart extends Vue {
  public footTabs: Array<object> = consts.footTabs
  public isEdit: boolean = false
  public selectAll: boolean = true
  public isChangeItemState: boolean = false

  public created (): void {
    this.judgeAllCheckBox()
  }
  private get isShowCart (): boolean {
    if (this.cartList.length !== 0) {
      return true
    }
    return false
  }
  @Getter('isLogin')
  isLogin!: boolean
  @Getter('cartList')
  cartList!: Array<any>
  @Getter('totalPrice')
  totalPrice!: number

  @Mutation(MutationTypes.UPDATE_CART_LIST) public updateCartList!: any
  @Mutation(MutationTypes.SET_CART_LIST) public setCartList!: any
  @Mutation(MutationTypes.BATCH_DELETE_CART_LIST) public bacthDeleteCartList: any

  public onClickSign (): void {
    this.$router.push('/login')
  }
  public onChange (count: number, cart: any): void {
    if (count === 0) {
      this.deleteItem(cart)
      return
    }
    this.updateCartList(cart)
  }
  public deleteItem (cart: any): void {
    Dialog.confirm({
      message: '你确认是否删除该商品？'
    }).then(() => {
      this.updateCartList(cart)
    }).catch(() => {
      cart.count = 1
    })
  }
  public onClickEdit (): void {
    this.isEdit = !this.isEdit
  }
  public onAllChange (): void {
    if (this.isChangeItemState) {
      this.isChangeItemState = false
      return
    }
    this.cartList.forEach((cart) => { cart.isChecked = this.selectAll })
    this.setCartList(this.cartList)
  }
  public onOddChange (cart: any): void {
    let isSelAll = true
    for (let cart of this.cartList) {
      if (!cart.isChecked) {
        isSelAll = false
        break
      }
    }
    if (isSelAll !== this.selectAll) {
      this.isChangeItemState = true
      this.selectAll = isSelAll
    }
    this.updateCartList(cart)
  }
  public judgeAllCheckBox (): void {
    for (let cart of this.cartList) {
      if (!cart.isChecked) this.selectAll = false
    }
  }
  public onClickSubBar (isEdit: boolean): void {
    let cartList = []
    let cartIds: Array<number> = []
    for (let cart of this.cartList) {
      if (cart.isChecked) {
        cartList.push(cart)
        cartIds.push(cart.skuid)
      }
    }
    if (isEdit) {
      let length = cartList.length
      Dialog.confirm({
        message: `确认将${length}本书籍删除？`,
        confirmButtonText: '删除',
        confirmButtonColor: 'red',
        cancelButtonText: '我在想想',
        cancelButtonColor: 'gray'
      }).then(() => {
        this.bacthDeleteCartList(cartIds)
      }).catch(() => {
        console.log('cancel delete cart')
      })
    } else {
      this.saveCartList(cartList)
    }
  }
  public saveCartList (cartList: any): void {
    console.log(cartList)
  }
}
</script>

<style lang="less">
@import '~@/style/variables.less';
.cart-header-right{
  font-size: @large-font-size;
  color: @blue;
}
.cart-empty-content{
  background: @gray1;
  margin: 0 auto;
  height: 90vh;
  &-tips{
    text-align: center;
    font-size: @larger-font-size;
    background: @gray1;
    color: @gray5;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 260px;
      height: 260px;
    }
  }
  &-button{
    margin: 0 @large-item-space  * 4;
    padding: @large-item-space * 3 0;
  }
}
.cart-data{
  &-list{
    &-items{
      display: flex;
      flex-flow: row nowrap;
      &-checkbox{
        display: flex;
        align-items: center;
        padding: 0 @small-horz-padding;
        background: @card-gray;
      }
      &-cart{
        flex-grow: 1;
        &-stepper{
          margin-top: @large-item-space * 2;
        }
      }
    }
  }
  &-empty{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: @larger-font-size;
    background: @gray1;
    padding: 35% 0;
    color: @gray5;
  }
}
.cart-submit-box{
  flex: 1;
  padding-left: @small-horz-padding;
}
</style>
