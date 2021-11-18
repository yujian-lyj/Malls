export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //查找数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                // oldProduct.count += 1;
                context.commit('addCounter', oldProduct)
                resolve('当前商品数量+1')
            } else {
                payload.count = 1
                    // context.state.cartList.push(payload)
                context.commit('addToCart', payload)
                resolve('成功添加到购物车')
            }
        })

    }
}