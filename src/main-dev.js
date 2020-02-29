import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from '../http'
import './assets/css/global.css'

Vue.use(MintUI)
Vue.use(axios)


Vue.prototype.$http = axios// 將axios掛載到全局的vue對象上,可透過this.$http訪問

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
