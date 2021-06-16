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
import { connect } from 'react-redux'
import { AuthMiddleware } from './middleware/auth'
import { cartMiddleware } from './middleware/cart'
import Checkout from './components/Checkout'
import { PopupMessage } from './components/PopupMessage'
import Orders from './components/Orders'
import Footer from './components/Footer'
import AddCake from './components/cake/AddCake'
import FullLoader from './components/FullLoader'

var data = {
  projectName: "Cake Shop",
  userName: "Sagar",
}

function App(props) {
  let [loader, setLoader] = useState(true)
  let adminUsers = ['ashu.lekhi0540@gmail.com', 'sagar.lawand@neosoftmail.com']
  useEffect(() => {
    if (localStorage.token) {
      props.dispatch(AuthMiddleware({token: localStorage.token}))
    }
    setTimeout(() => {
      setLoader(false)
    }, 1000)
  }, [])

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
  }

  return <>
    <Router>
      {loader && <FullLoader main="Welcome to Cake Shop" />}
    {props.authMessage && <PopupMessage message={props.authMessage}/>}
    {props.cartMessage && <PopupMessage message={props.cartMessage}/>}
      <Navbar data={data} logout={logout} user={props.user} adminUsers={adminUsers} cartItemsCount={props.cartItemsCount} />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup">{props.user?.token ? <Redirect to="/" /> : <SignUp />}</Route>
        <Route exact path="/login">{props.user?.token ? <Redirect to="/" /> : <Login />}</Route>
        <Route exact path="/search" component={Search}></Route>
        <Route exact path="/cake/:id" component={CakeDetails}></Route>
        <Route exact path="/cart">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <Cart loader={loader} />}</Route>
        <Route path="/checkout">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <Checkout />}</Route>
        <Route exact path="/orders">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <Orders />}</Route>
        {props.user?.email && adminUsers.indexOf(props.user?.email) !== -1 && <Route exact path="/admin/cake/add">{!props.user?.token && !localStorage.token ? <Redirect to="/" /> : <AddCake />}</Route>}
        <Route path="/*" component={PageNotFound}></Route>
      </Switch>
      <Footer projectName={data.projectName} />
    </Router>
  </>
}

const mapStateToProps = (state, props) => {
  return {
    ...state.AuthReducer,
    authMessage: state.AuthReducer.message,
    cartMessage: state.CartReducer.message,
    cartItemsCount: state.CartReducer?.cart?.items?.length || 0
  }
}

export default connect(mapStateToProps)(App)
