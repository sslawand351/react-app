import { addToCart, getCart } from "../apis/Api"

export const addToCartMiddleware = (token, cart) => {
  return dispatch => {
    if (!token) {
      dispatch({
        type: 'ADD_TO_CART_FAILURE',
        payload: {
          error: {message: 'Please login before add to cart'},
        }
      })
      return
    }
    dispatch({type: 'ADD_TO_CART_REQUEST_INIT'})
    addToCart(token, cart).then(response => {
      if (!response.data) {
        // setErrorMessage(response.message)
        dispatch({
          type: 'ADD_TO_CART_FAILURE',
          payload: {error: {...response}}
        })
        return;
      }
      dispatch({
        type: 'ADD_TO_CART_SUCCESS',
        payload: {...response}
      })
    }, error => dispatch({
      type: 'ADD_TO_CART_FAILURE',
      payload: {error:{...error}}
    }))
  }
}

export const cartMiddleware = (token) => {
  return dispatch => {
    getCart(token).then(response => {
      dispatch({type:'LOAD_CART', payload: {...response}})
    })
  }
}