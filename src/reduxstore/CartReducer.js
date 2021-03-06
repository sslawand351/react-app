function CartReducer(state={
  cart: {
    items: [],
    shippingPrice: 0,
    totalPrice: 0,
    totalQty: 0
  }
}, action) {
  let cart, cartItem, cartItemIndex

  switch (action.type) {
    case 'CART_IS_EMPTY': return {
      ...state,
      message: 'Your cart is empty. please add cake to your cart'
    }
    case 'CLEAR_MESSAGE': return {...state, message: null}
    case 'CLEAR_REDIRECT': return {...state, redirect: null}
    case 'RESET_NEWORDER': return {...state, newOrder: null}
    case 'CART_REQUEST_PROCESSING_INIT': return {...state, isLoading: true}

    case 'ADD_TO_CART_SUCCESS':
      cart = {...state.cart}
      cart.totalQty += 1
      cartItem = cart.items.find(newItem => newItem.cakeid === action.payload.data.cakeid)

      if (cartItem) {
        cartItem.price += (action.payload.data.price/cartItem.quantity)
        cartItem.quantity += 1
        cart.totalPrice += cartItem.price/cartItem.quantity
      } else {
        cart.items.push(action.payload.data)
        cart.totalPrice += action.payload.data.price
      }

      return {
        ...state,
        cart:cart,
        response:{
            success:true,
            message: 'Cake added to cart successfully'
        },
        isLoading: false,
        cakeAddedToCart: true,
        message: 'Cake added to cart successfully',
        redirect: '/cart',
        isLoading: false
      }
    case 'ADD_TO_CART_FAILURE':
      return {...state, ...action.payload, isLoading: false}

    case 'REMOVE_ONE_CAKE_FROM_CART_SUCCESS':
      cart = {...state.cart}
      // find index of cart item matches cakeid
      cartItemIndex = cart.items.findIndex(newItem => newItem.cakeid === action.payload.cakeid)
      // assign cart item of position cartItemIndex from cart items array
      cartItem = cart.items[cartItemIndex] ?? null;

      if (!cartItem) {
        // invalid cakeid passed
        return {
          ...state,
          response:{
              error:true,
              message: 'Error occurred. please check cakeid sent is correct'
          },
          message: 'Error occurred. please check cakeid sent is correct'
        }
      }

      // update cart total price and total qty
      cart.totalPrice -= (cartItem.price/cartItem.quantity)
      cart.totalQty -= 1

      // if cart item qty is 1 then remove cart item else update qty and price
      if (cartItem.quantity === 1) {
        cart.items.splice(cartItemIndex, 1);
      } else {
        cartItem.price -= (cartItem.price/cartItem.quantity)
        cartItem.quantity -= 1
      }

      return {
        ...state,
        cart:cart,
        response:{
            success:true,
            message: 'Cake qty updated to cart successfully'
        },
        message: 'Cake qty updated to cart successfully',
        isLoading: false
      }
    case 'REMOVE_CAKE_FROM_CART_SUCCESS':
      cart = {...state.cart}
      // find index of cart item matches cakeid
      cartItemIndex = cart.items.findIndex(newItem => newItem.cakeid === action.payload.cakeid)
      // assign cart item of position cartItemIndex from cart items array
      cartItem = cart.items[cartItemIndex] ?? null;

      if (!cartItem) {
        // invalid cakeid passed
        return {
          ...state,
          response:{
            error:true,
            message: 'Error occurred. please check cakeid sent is correct'
          },
          message: 'Error occurred. please check cakeid sent is correct'
        }
      }

      // removed cart item
      cart.items.splice(cartItemIndex, 1)
      cart.totalPrice -= cartItem.price
      cart.totalQty -= cartItem.quantity

      return {
        ...state,
        cart:cart,
        response:{
          success:true,
          message: 'Cake removed from cart successfully'
        },
        message: 'Cake removed from cart successfully',
        isLoading: false
      }
    case 'LOAD_CART':
      cart = action.payload.data.reduce(updateCartItemQty, {items:[], totalPrice:0, totalQty: 0})
      return {...state, cart:cart, isLoading: false}

    case 'CART_SET_ADDRESS':
      cart = {...state.cart, address: {...action.payload}}
      return {...state, cart:cart}

    case 'CREATE_ORDER_INIT':
      return {...state, orderCreationInit: true}

    case 'ORDER_CREATED':
      cart = {
        items: [],
        shippingPrice: 0,
        totalPrice: 0,
        totalQty: 0
      }
      return {
        ...state,
        cart: cart,
        newOrder:{...action.payload.order},
        message: action.payload.messageg,
        orderCreationInit: false
      }
    case 'ORDER_CREATION_FAILURE':
      return {...state, orderCreationInit: false}

    default: return state
  }
}

const updateCartItemQty = (cart, item) => {
  cart.totalPrice += item.price
  cart.totalQty += item.quantity
  let cartItem = cart.items.find(newItem => newItem.cakeid === item.cakeid)

  if (cartItem) {
    cartItem.quantity += item.quantity
    cartItem.price += item.price
    return cart
  } 

  cart.items.push(item)
  return cart
}

export default CartReducer
