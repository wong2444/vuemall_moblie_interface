import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types";

export default {
    addCart(context, payload) {
        return new Promise(resolve => {
            // 1.查看是否添加过
            const oldProduct = context.state.cartList.find(item => item.goods_id === payload.goods_id)
            // 2.+1或者新添加
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('當前商品數量加1')
            } else {
                // payload.checked = true
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加新的商品')
            }
        })

    }
}

