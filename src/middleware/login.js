import { getUserByToken, login } from "../apis/Api"

const loginMiddleware = user => {
  return dispatch => {
    // if (user.token) {
    //   getUserByToken(user.token).then(response => {
    //     if (response.token) {
    //       dispatch({type: 'LOGIN_SUCCESS', payload: {...response}})
    //     } else {
    //       dispatch({
    //         type: 'LOGIN_FAILURE',
    //         payload: {...response}
    //       })
    //     }
    //   }, error => {
    //     dispatch({
    //       type: 'LOGIN_FAILURE',
    //       payload: {...error}
    //     })
    //   })
    //   return
    // }
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
        //   setLoginErrorMessage(response.message)
        } else {
          console.log('LOGIN_SUCCESS')
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
