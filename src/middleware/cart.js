import { addToCart, createOrder, getCart, removeCakeFromCart, removeOneCakeFromCart } from "../apis/Api"

export const addToCartMiddleware = (token, cart) => {
  return dispatch => {
    if (!token) {
      dispatch({
        type: 'ADD_TO_CART_FAILURE',
        payload: {
          message: 'You need to login first',
          redirect: '/login'
        }
      })
      return
    }

    dispatch({type: 'CART_REQUEST_PROCESSING_INIT'})

    addToCart(token, cart).then(response => {
      if (!response.data) {
        dispatch({
          type: 'ADD_TO_CART_FAILURE',
          payload: {...response}
        })
        return;
      }

      dispatch({
        type: 'ADD_TO_CART_SUCCESS',
        payload: {...response}
      })
    }, error => dispatch({
      type: 'ADD_TO_CART_FAILURE',
      payload: {...error}
    }))
  }
}

export const removeOneCakeFromCartMiddleware = (token, cakeid) => {
  return dispatch => {
    dispatch({type: 'CART_REQUEST_PROCESSING_INIT'})

    removeOneCakeFromCart(token, cakeid).then(response => {
      dispatch({
        type: 'REMOVE_ONE_CAKE_FROM_CART_SUCCESS',
        payload: {cakeid:cakeid}
      })
    })
  }
}

export const removeCakeFromCartMiddleware = (token, cakeid) => {
  return dispatch => {
    dispatch({type: 'CART_REQUEST_PROCESSING_INIT'})

    removeCakeFromCart(token, cakeid).then(response => {
      dispatch({
        type: 'REMOVE_CAKE_FROM_CART_SUCCESS',
        payload: {cakeid:cakeid}
      })
    })
  }
}

export const cartMiddleware = (token) => {
  return dispatch => {
    dispatch({type: 'CART_REQUEST_PROCESSING_INIT'})

    getCart(token).then(response => {
      dispatch({type:'LOAD_CART', payload: {...response}})
    })
  }
}

export const placeOrderMiddleware = (token, cart, address) => {
  return dispatch => {
    dispatch({
      type: 'CREATE_ORDER_INIT'
    })
    createOrder(token, cart, address).then(response => {
      dispatch({type:'ORDER_CREATED', payload: response.data})
    }, error => {
      dispatch({type: 'ORDER_CREATION_FAILURE'})
    })
  }
}
