import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import request from './utils/api'
import store from './common/store' // 引入vuex

Vue.prototype.$request = request
Vue.config.productionTip = false
Vue.use(uView)
App.mpType = 'app'
const app = new Vue({
  store,
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif