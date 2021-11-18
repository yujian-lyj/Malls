export default {
    //mutations唯一目的修改state中的状态
    addCounter(state, payload) {
        payload.count++
    },
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}