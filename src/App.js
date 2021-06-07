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

var data = {
  projectName: "React Training",
  userName: "Sagar",
}
console.log(process.env)
function App(props) {
  let [loggedInUser, setLoggedInUser] = useState()
  console.log('token', loggedInUser?.token)
  useEffect(() => {
    getUserByToken(localStorage.token).then(response => {
      if (response.token) {
        localStorage.token = response.token
        setLoggedInUser(response)
      } else {
        console.log(response);
        setLoggedInUser({})
      }
    }, error => {
      console.log(error);
      setLoggedInUser({})
    })
  }, [loggedInUser?.token])

  const logout = () => {
    localStorage.removeItem('token')
    props.dispatch({
      type: 'LOGOUT'
    })
    setLoggedInUser({})
  } 

  return <>
    <Router>
      <Navbar data={data} loggedInUser={loggedInUser} logout={logout} />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup">{loggedInUser?.token ? <Redirect to="/" /> : <SignUp />}</Route>
        <Route exact path="/login">{loggedInUser?.token ? <Redirect to="/" /> : <Login setLoggedInUser={setLoggedInUser} />}</Route>
        <Route exact path="/search" component={Search}></Route>
        <Route exact path="/cake/:id" component={CakeDetails}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route path="/*" component={PageNotFound}></Route>
      </Switch>
    </Router>
  </>
}

export default connect()(App);
