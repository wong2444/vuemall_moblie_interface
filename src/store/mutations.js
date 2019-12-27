import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types";

export default {
    //mutations唯一目的是修改state中的狀態
    //mutations中的方法盡可能完成的事件單一點
    [ADD_COUNTER](state, payload) {
        payload.goods_qty+=payload.goods_qty
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}
