import { login } from "../apis/Api"

const loginMiddleware = user => {
  return dispatch => {
    dispatch({
      type: 'LOGIN_INIT'
    })
    login(user.email.value, user.password.value)
      .then(response => {
        if (!response.token) {
          dispatch({
            type: 'LOGIN_FAILURE',
            payload: {...response}
          })
        } else {
          localStorage.token = response.token
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {...response}
          })
        }
      }, error => {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: {...error}
        })
      })
  }
}

export default loginMiddleware
