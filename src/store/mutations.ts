import { MutationTree } from 'vuex'
import { State } from './types'
import MutationTypes from './mutation-types'
import SysUtil from '@/common/localStorage'
import store from './store'
import { getSkuItem } from '@/common/miscutil'

const mutations: MutationTree<State> = {
  [MutationTypes.INIT_USER_OAUTH] (state): void {
    let userOauth = SysUtil.getLocalStore('userOauth')
    if (!userOauth) {
      console.warn('cannot get userOauth from local store')
      return
    }
    state.userOauth = JSON.parse(userOauth)
    if (!state.userOauth) {
      state.userOauth = {}
    }
  },

  [MutationTypes.SET_USER_OAUTH] (state, userOauth: object): void {
    Object.assign(state.userOauth, userOauth)
    state.userInfo = { ...state.userOauth }
    SysUtil.setLocalStore('userOauth', state.userOauth)
  },

  [MutationTypes.CLEAR_USER_OAUTH] (state): void {
    state.userOauth = {}
    SysUtil.removeLocalStore('userOauth')
  },

  [MutationTypes.INIT_CART_LIST] (state): void {
    let cartList = SysUtil.getLocalStore('cartList')
    if (!cartList) {
      console.warn('cannot get cartList from local store')
      return
    }
    state.cartList = JSON.parse(cartList)
    if (!state.cartList) {
      state.cartList = []
    }
  },

  [MutationTypes.SET_CART_LIST] (state, cartList) {
    if (cartList) {
      state.cartList = cartList
    } else {
      state.cartList = []
    }
    SysUtil.setLocalStore('cartList', state.cartList)
  },

  [MutationTypes.ADD_CART_LIST] (state, cartItem) {
    let cartList = [...state.cartList]
    let index = getSkuItem(cartList, cartItem.skuid)
    if (index !== -1) {
      console.log('cart exist skuItem')
      return
    } else {
      cartItem['isChecked'] = true
      cartList.push(cartItem)
    }
    state.cartList = [...cartList]
    SysUtil.setLocalStore('cartList', state.cartList)
  },

  [MutationTypes.UPDATE_CART_LIST] (state, cartItem) {
    let cartList = [...state.cartList]
    let index = getSkuItem(cartList, cartItem.skuid)
    if (index === -1 && cartItem.count === 0) {
      console.warn('cannot find sku:' + cartItem.skuid)
      return
    }
    if (cartItem.count === 0) {
      cartList.splice(index, 1)
    } else {
      index === -1 ? cartList.push(cartItem) : cartList[index] = cartItem
    }
    state.cartList = [...cartList]
    SysUtil.setLocalStore('cartList', state.cartList)
  },

  [MutationTypes.BATCH_DELETE_CART_LIST] (state, cartIds) {
    let cartList = state.cartList.filter((cart) => {
      if (cartIds.indexOf(cart.skuid) === -1) {
        return { ...cart }
      }
    })
    state.cartList = cartList
    SysUtil.setLocalStore('cartList', state.cartList)
  },

  [MutationTypes.CLEAR_CART_LIST] (state) {
    state.cartList = []
    SysUtil.removeLocalStore('cartList')
  },

  [MutationTypes.INIT_STORE] (state): void {
    store.commit(MutationTypes.INIT_USER_OAUTH)
  },
  [MutationTypes.CLEAR_STORE] (state): void {
    store.commit(MutationTypes.CLEAR_USER_OAUTH)
  }
}

export default mutations
