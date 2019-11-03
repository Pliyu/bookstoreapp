import {
  PENDING_PAYMENT,
  PENDING_SHIPMENTS,
  PENDING_COLLECT_GOODS,
  PENDING_COMMENT,
  CANCELED,
  DISCOUNT_PRICE,
  SHOPPING_CART,
  ENSHRINE,
  DELIVERY_ADDRESS,
  SERVICE
} from './constant'

let footTabs = [
  { path: '/home', name: '首页', icon: 'home-o' },
  { path: '/cart', name: '购物车', icon: 'shopping-cart-o' },
  { path: '/self', name: '我的', icon: 'manager-o' }
]

let orderBarTypes = [
  { title: '待付款', type: PENDING_PAYMENT, iconName: 'balance-o' },
  { title: '待发货', type: PENDING_SHIPMENTS, iconName: 'orders-o' },
  { title: '待收货', type: PENDING_COLLECT_GOODS, iconName: 'logistics' },
  { title: '待评论', type: PENDING_COMMENT, iconName: 'chat-o' },
  { title: '已取消', type: CANCELED, iconName: 'clear' }
]

let toolList = [
  { title: '优惠卷', icon: 'coupon-o', type: DISCOUNT_PRICE, color: '#e60000' },
  { title: '购物车', icon: 'shopping-cart-o', type: SHOPPING_CART, color: '#e60000' },
  { title: '收藏', icon: 'star-o', type: ENSHRINE, color: '#1989fa' },
  { title: '收货地址', icon: 'idcard', type: DELIVERY_ADDRESS, color: '#7232dd' },
  { title: '联系客服', icon: 'phone-o', type: SERVICE, color: '#1989fa' }
]

let tabsList = [
  { title: '首页', key: 'home' },
  { title: '全部', key: 'all' },
  { title: '浏览历史', key: 'history' }
]

export default {
  footTabs,
  orderBarTypes,
  toolList,
  tabsList
}
