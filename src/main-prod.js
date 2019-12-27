import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import './assets/css/global.css'

Vue.use(MintUI)
Vue.use(axios)
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // config是本次的request對象,在攔截器的最後必須return config
    return config
})

Vue.prototype.$http = axios// 將axios掛載到全局的vue對象上,可透過this.$http訪問

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
