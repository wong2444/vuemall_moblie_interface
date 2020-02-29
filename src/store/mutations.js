import {
    ADD_COUNTER,
    ADD_TO_CART,
    LOGIN,
    LOGOUT
} from "./mutation-types";

export default {
    //mutations唯一目的是修改state中的狀態
    //mutations中的方法盡可能完成的事件單一點
    [ADD_COUNTER](state, payload) {
        payload.goods_qty += payload.goods_qty
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    },
    [LOGIN](state, payload) {
        delete payload.password
        window.sessionStorage.setItem('token', payload.token)
        state.user = payload
    },
    [LOGOUT](state) {
        window.sessionStorage.removeItem('token')
        state.user = {username: '', token: '', id: '', rid: '', mobile: '', email: ''}
    }
}
