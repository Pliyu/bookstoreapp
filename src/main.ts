import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vant from 'vant'
import 'vant/lib/index.css'
import MutationTypes from './store/mutation-types'

Vue.config.productionTip = false

Vue.use(Vant)

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

store.commit(MutationTypes.INIT_STORE)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
