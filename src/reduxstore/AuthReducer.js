import store from "./store"

function AuthReducer(state={}, action) {
  console.log(action)
  switch (action.type) {
    case 'LOGIN_INIT':
      console.log(action)
      state = {...state, isLoading: true}
      return state
    case 'LOGIN_SUCCESS':
      state = {...state, user: {...action.payload}, isLoading: false}
      return state
    case 'LOGIN_FAILURE':
      state = {...state, error: {...action.payload}, isLoading: false}
      return state
    case 'LOGOUT':
      state = {...state, user: {}}
      return state
    default: return state
  }
}

export default AuthReducer
