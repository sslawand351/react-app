function AuthReducer(state={}, action) {
  console.log(action)
  state.message = null
  switch (action.type) {
    case 'USER_REGISTRATION_SUCCESS':
      return {
        ...state,
        message:'You are successfully registered. We have sent email to your email address. Please verify your email address to login'
      }
    case 'LOGIN_INIT':
      return {...state, isLoading: true}

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: {...action.payload},
        message: 'You are logged in successfully',
        isLoading: false
      }
    case 'GET_USER_BY_TOKEN_SUCCESS':
      return {
        ...state,
        user: {...action.payload},
        message: null,
        isLoading: false
      }
    case 'GET_USER_BY_TOKEN_FAILURE':
      return {
        ...state,
        error: {...action.payload},
        message: null,
        isLoading: false
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: {...action.payload},
        message: action.payload.message || 'Error occurred while login',
        isLoading: false
      }
    case 'LOGOUT':
      return {...state, user: {}, message: 'You are logged out successfully'}

    default: return state
  }
}

export default AuthReducer
