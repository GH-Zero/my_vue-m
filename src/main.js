import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入适配文件
import 'amfe-flexible'
// 将单位px转入rem

// 引入全局less文件
import './style/index.css'
// 引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

import './utils/dayjs'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
