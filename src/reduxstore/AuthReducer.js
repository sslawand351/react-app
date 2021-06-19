function AuthReducer(state={}, action) {
  // console.log(action)
  switch (action.type) {
    case 'CLEAR_MESSAGE': return {...state, message: null}

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
        isLoading: false
      }
    case 'GET_USER_BY_TOKEN_FAILURE':
      return {
        ...state,
        error: {...action.payload},
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

    // TODO: move this action to cake Reducer 
    case 'ADD_CAKE_SUCCESS':
      return {...state, message: 'Cake added successfully'}

    default: return state
  }
}

export default AuthReducer
