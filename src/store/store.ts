import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import { State } from './types'

Vue.use(Vuex)

const state: State = {
  userOauth: {}, // 用户Token
  userInfo: {},
  cartList: [{
    title: '云边有个小卖部',
    num: 2,
    price: 23.3,
    imgPath: '../../assets/xs1.jpg',
    desc: '云边有个小卖部(张嘉佳)',
    count: 1,
    skuid: 100001,
    isChecked: true
  },
  {
    title: '云边有个小卖部(2)',
    num: 3,
    price: 43.3,
    imgPath: '../../assets/xs1.jpg',
    desc: '云边有个小卖部(张嘉佳)',
    count: 1,
    skuid: 100002,
    isChecked: true
  },
  {
    title: '云边有个小卖部(3)',
    num: 4,
    price: 41.3,
    imgPath: '../../assets/xs1.jpg',
    desc: '云边有个小卖部(张嘉佳)',
    count: 1,
    skuid: 100005,
    isChecked: true
  }]
}

const store: Store<any> = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store
