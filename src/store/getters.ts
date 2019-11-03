import { GetterTree } from 'vuex'
import { State } from './types'
import baseFloat from '@/common/baseFloat'

const getter: GetterTree<State, any> = {
  isLogin (state: any): Boolean {
    if (state.userOauth && state.userOauth.token) {
      return true
    }
    return false
  },
  cartList (state: any): Array<object> {
    return state.cartList
  },
  totalPrice (state: any): number {
    let totalPrice = 0
    let cartList = [...state.cartList]
    for (let cart of cartList) {
      if (cart.isChecked) {
        totalPrice = baseFloat.add(totalPrice, baseFloat.multiplyPrec(cart.count, cart.price, 2))
      }
    }
    return totalPrice
  }
}

export default getter
