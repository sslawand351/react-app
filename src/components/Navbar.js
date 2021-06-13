import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { PopupMessage } from "./PopupMessage"

function Navbar(props) {
  // alert(JSON.stringify(props))
  let [error, setMessage] = useState({message: '', counter: 0})
  let searchString
  let searchFor = 'Enter the search keyword'
  let search = (event) => {
    event.preventDefault()
    if (searchString) {
      searchFor = 'You search for ' + searchString
      console.log('>>>>', searchFor);
      // alert(searchFor)
      props.history.push('/search?q=' + searchString)
    }
  }
  let getSearchText = (event) => {
    searchString = event.target.value
  }
  let i=0;
  const openCart = () => {
    if (!props.cart?.items?.length) {
      setMessage({message:'Your cart is empty. please add cake to your cart', counter:error.counter++})
    } else {
      props.history.push('/cart')
    }
  }
  useEffect(() => {
    props.history.listen((location, action) => {
      console.log(props.prevPath);
      props.setPrevPath({current: location.pathname, prev: props.prevPath.current})
      console.log("on route change", location);
    })
  }, [props.history.location.pathname])
  return <>
    <nav className="navbar sticky-top navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/"><img className="mr-2" src="/cake-logo.png" alt="" width="28" height="28" />{props.data.projectName}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {props.user?.name && <li className="nav-item active">
            Welcome {props.user?.name}
          </li>}
          {/* <li className="nav-item">
            <a className="nav-link" href="#link">Link</a>
          </li> */}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input onChange={getSearchText} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          {/* <span>{searchFor}</span> */}
          <button onClick={search} className="btn btn-outline-success my-2 my-sm-0 search-button" type="submit"><i className="fa fa-search"></i></button>
        </form>
        {props.user?.token && <Link to="/orders"><span className="nav-link">My Orders</span></Link>}
        {props.user?.token && <span onClick={() => props.logout()} className="nav-link">Log out</span>}
        {!props.user?.token && <Link to="/signup"><span className="nav-link">SignUp</span></Link>}
        {!props.user?.token && <Link to="/login"><span className="nav-link">Login</span></Link>}
        {props.user?.token && <span onClick={openCart} className="nav-link"><i className="fas fa-shopping-cart pr-2"></i>{props.cart?.items?.length != 0 && <span className="badge badge-danger">{props.cart?.items?.length}</span>}</span>}
        {/* {!isLoggedIn && <button onClick={() => login(true)} className="btn btn-danger">Login</button>} */}
      </div>
    </nav>
    {error.message && <PopupMessage message={error.message} qty={error.counter}/>}
    {props.message && props.prevPath.prev.match(/cake|cart|checkout/g) && <PopupMessage message={props.message}/>}
  </>
}

const mapStateToProps = (state, props) => {
  // alert('State  ' + JSON.stringify(state))
  return {
    ...state.CartReducer
  }
}
export default connect(mapStateToProps)(withRouter(Navbar))
