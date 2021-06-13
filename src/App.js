import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import './style.css'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './Home'
import PageNotFound from './components/PageNotFound'
import Login from './components/Login'
import Search from './components/Search'
import CakeDetails from './components/CakeDetails'
import Cart from './components/Cart'
import { useEffect, useState } from 'react'
import { getUserByToken } from './apis/Api'
import { connect } from 'react-redux'
import loginMiddleware from './middleware/login'
import { AuthMiddleware } from './middleware/auth'
import { cartMiddleware } from './middleware/cart'
import Checkout from './components/Checkout'
import { PopupMessage } from './components/PopupMessage'
import { createBrowserHistory } from "history";
import Orders from './components/Orders'

var data = {
  projectName: "Cake Shop",
  userName: "Sagar",
}
function App(props) {
  // console.log(props.history)
  let [prevPath, setPrevPath] = useState({current: props.history.location.pathname, prev: props.history.location.pathname})
  // console.log(prevPath)
  // let [user, setLoggedInUser] = useState()
  // console.log('token', props)
  useEffect(() => {
    // getUserByToken(localStorage.token).then(response => {
    //   if (response.token) {
    //     localStorage.token = response.token
    //     setLoggedInUser(response)
    //   } else {
    //     console.log(response);
    //     setLoggedInUser({})
    //   }
    // }, error => {
    //   console.log(error);
    //   setLoggedInUser({})
    // })
    if (localStorage.token) {
      props.dispatch(AuthMiddleware({token: localStorage.token}))
    }
  }, [props.user?.token])

  useEffect(() => {
    if (localStorage.token) {
      props.dispatch(cartMiddleware(localStorage.token))
    }
  }, [props.user?.token, props.cart?.length])

  

  const logout = () => {
    localStorage.removeItem('token')
    props.dispatch({
      type: 'LOGOUT'
    })
    // setLoggedInUser({})
  } 

  return <>
    <Router>
    {props.authMessage && <PopupMessage message={props.authMessage}/>}
      <Navbar data={data} logout={logout} user={props.user} prevPath={prevPath} setPrevPath={setPrevPath}/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup">{props.user?.token ? <Redirect to="/" /> : <SignUp />}</Route>
        <Route exact path="/login">{props.user?.token ? <Redirect to="/" /> : <Login prevPath={prevPath.prev} />}</Route>
        <Route exact path="/search" component={Search}></Route>
        <Route exact path="/cake/:id" component={CakeDetails}></Route>
        <Route exact path="/cart">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <Cart />}</Route>
        <Route path="/checkout">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <Checkout />}</Route>
        <Route exact path="/orders">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <Orders />}</Route>
        <Route path="/*" component={PageNotFound}></Route>
      </Switch>
    </Router>
  </>
}

const mapStateToProps = (state, props) => {
  // alert('State  ' + JSON.stringify(state))
  // if () {

  // }
  // console.log(state.AuthReducer.message)
  // console.log(state.CartReducer.message)
  return {
    ...state.AuthReducer,
    authMessage: state.AuthReducer.message
  }
}
export default connect(mapStateToProps)(App)
