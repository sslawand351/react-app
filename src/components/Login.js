import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { isEmpty, isValidEmail } from "../form-validation";
import loginMiddleware from "../middleware/login";

function Login(props) {
  // alert(JSON.stringify(props))
  // console.log(props)
  if (props.user?.token) {
    props.history.push('/')
  }

  let [user, setUser] = useState({
    email:{value:null, error: null},
    password:{value:null, error: null}
  })

  const onChangeEmail = (event) => {
    let email = event.target.value.trim()
    setUser({
      ...user,
      email: {value:email, error: isEmpty(email) || !isValidEmail(email)}
    })
  }

  const validatePassword = (event) => {
    let password = event.target.value
    setUser({
      ...user,
      password: {value:password, error: isEmpty(password)}
    })
  }

  const onLogin = (event) => {
    event.preventDefault()
    let emailError = isEmpty(user.email.value) || !isValidEmail(user.email.value)
    let passwordError = isEmpty(user.password.value)
    let isValid = !emailError && !passwordError
    setUser({
      email: {value:user.email.value, error: emailError},
      password: {value:user.password.value, error: passwordError}
    })
    if (isValid) {
      props.dispatch(loginMiddleware(user))
    
    // login(user.email.value, user.password.value).then(response => {
    //   if (!response.token) {
    //     setLoginErrorMessage(response.message)
    //   } else {
    //     props.dispatch({
    //       type: 'LOGIN',
    //       payload: {...response}
    //     })
    //     localStorage.token = response.token
    //     props.setLoggedInUser(response)
    //     props.history.push('/')
    //   }
    // }, error => console.log(error))
    }
  }
  return (
    <div className="text-center mt-5 mb-5 ml-3 mr-3">
    <form className="form-signin">
      <img className="mb-4" src="/cake-logo.png" alt="" width="72" height="72" />
      <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
      {/* <div className="text-danger mb-2"><span>{props.error?.message}</span></div> */}
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      <input onChange={onChangeEmail} type="email" id="inputEmail" className={user.email.error ? 'form-control is-invalid' : 'form-control'} placeholder="Email address" required="" autoFocus="" />
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input onChange={validatePassword} type="password" id="inputPassword" className={user.password.error ? 'form-control is-invalid' : 'form-control'} placeholder="Password" required="" />
      <div className="mb-3"></div>
      {!props.isLoading && <button onClick={onLogin} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>}
      {props.isLoading && <button className="btn btn-lg btn-secondary btn-block" type="submit" disabled>Please wait. Loading ...</button>}
      <p className="mt-5 mb-3 text-muted">© 2021-2022</p>
    </form>
    </div>
  )
}

export default connect((state, props) => {
  return {
    ...state.AuthReducer,
    redirect: state.CartReducer.redirect,
    message: state.CartReducer.message
  }
})(withRouter(Login))
