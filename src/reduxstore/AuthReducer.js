function AuthReducer(state={}, action) {
  console.log(action)
  state.message = null
  switch (action.type) {
    case 'LOGIN_INIT':
      console.log(action)
      state = {...state, isLoading: true}
      return state
    case 'LOGIN_SUCCESS':
      state = {...state, user: {...action.payload}, message: 'You are logged in successfully', isLoading: false}
      return state
    case 'GET_USER_BY_TOKEN_SUCCESS':
      return {...state, user: {...action.payload}, message: null, isLoading: false}
    case 'LOGIN_FAILURE':
      state = {...state, error: {...action.payload}, message: action.payload.message || 'Error occurred while login', isLoading: false}
      return state
    case 'LOGOUT':
      state = {...state, user: {}, message: 'You are logged out successfully'}
      return state
    default: return state
  }
}

export default AuthReducer
