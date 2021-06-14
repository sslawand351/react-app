import { getUserByToken } from "../apis/Api"

export const AuthMiddleware = user => {
  return dispatch => {
    if (user.token) {
      getUserByToken(user.token).then(response => {
        if (response.token) {
          dispatch({type: 'GET_USER_BY_TOKEN_SUCCESS', payload: {...response}})
        } else {
          dispatch({
            type: 'GET_USER_BY_TOKEN_FAILURE',
            payload: {...response}
          })
        }
      }, error => {
        dispatch({
          type: 'GET_USER_BY_TOKEN_FAILURE',
          payload: {...error}
        })
      })
    }
  }
}
