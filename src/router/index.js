import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const Cart = () => import('../views/Cart')
const User = () => import('../views/User')
const Detail = () => import('../views/Detail')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/user',
        component: User
    },
    {
        path: '/detail/:id',
        component: Detail
    },
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/user') return next()
    const tokenStr = window.sessionStorage.getItem('token')

    if (!tokenStr) return next('/user')// 強制跳轉登錄頁
    next()
})
export default router
