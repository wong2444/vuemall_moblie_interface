import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // config是本次的request對象,在攔截器的最後必須return config
    return config
})

export default axios
