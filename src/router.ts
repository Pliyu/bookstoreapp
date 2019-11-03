import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/cart/cart.vue')
    },
    {
      path: '/self',
      name: 'self',
      component: () => import('@/views/self/self.vue')
    }
  ]
})
