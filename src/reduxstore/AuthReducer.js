import store from "./store"

function AuthReducer(state={}, action) {
  switch (action.type) {
    case 'LOGIN':
      store.token = action.payload?.token
      alert(store.token)
      return state
    case 'LOGOUT':
      store.token = undefined
      alert(store.token)
      return state
    default: return state
  }
}

export default AuthReducer
