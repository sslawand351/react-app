function CartReducer(state={
    cart: []
}, action) {
    console.log(action);
    switch (action.type) {
        case 'ADD_TO_CART_REQUEST_INIT':
            state = {...state, isLoading: true}
            return state
        case 'ADD_TO_CART_SUCCESS':
            state = {...state, isLoading: false, cakeAddedToCart: true}
            let cartItem
            if (cartItem = state.cart.find(newItem => newItem.cakeid === action.payload.data.cakeid)) {
                cartItem.quantity += 1
                cartItem.price += action.payload.data.price
            } else {
                state.cart.push(action.payload.data)
            }
            return state
        case 'ADD_TO_CART_FAILURE':
            state = {...state, ...action.payload, isLoading: false}
            return state
        case 'REMOVE_FROM_CART':
            state = {...state}
            // state.cart.;
            return state
        case 'LOAD_CART':
            let cart = action.payload.data.reduce(updateCartItemQty, [])
            state = {...state, cart:cart || []}
            return state
        default: return state
    }
}

const updateCartItemQty = (cart, item) => {
    let cartItem
    if (cartItem = cart.find(newItem => newItem.cakeid === item.cakeid)) {
        cartItem.quantity += 1
        cartItem.price += item.price
        return cart
    }
    cart.push(item)
    return cart
}
export default CartReducer
