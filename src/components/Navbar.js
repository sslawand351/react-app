import { useEffect } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

function Navbar(props) {
  let searchString
  let searchFor = 'Enter the search keyword'

  useEffect(() => {
    const titleGroups = [
      {url: 'login', title: 'Login | ' + props.data.projectName},
      // {url: '/', title: data.projectName},
      {url: 'signup', title: 'Sign Up | ' + props.data.projectName},
      {url: 'cake', title: 'cake-name | ' + props.data.projectName},
      {url: 'cart', title: 'Shopping Cart | ' + props.data.projectName},
      // {url: 'checkout', title: 'Checkout | ' + props.data.projectName},
      {url: 'orders', title: 'My Orders | ' + props.data.projectName},
      {url: 'summary', title: 'Order Summary | Checkout | ' + props.data.projectName},
      {url: 'address', title: 'Order Address | Checkout | ' + props.data.projectName},
      {url: 'confirm', title: 'Order Confirmation | Checkout | ' + props.data.projectName},
      {url: 'search', title: 'Search Result for search-keyword | ' + props.data.projectName},
    ]
    const updateTitle = () => {
      let grp = titleGroups.find(grp => {
        let regex = new RegExp(grp.url,"g")
        return props.location.pathname.match(regex)
      })
      // console.log(grp)
      // let title = grp.title
      if (!grp) {
        document.title = props.data.projectName
      }
      if (grp && ['cake', 'search'].indexOf(grp.url) === -1) {
        // console.log(grp.url)
        document.title = grp ? grp.title : props.data.projectName
      }
    }
    updateTitle()
  }, [props.location.pathname])

  const search = (event) => {
    event.preventDefault()
    if (searchString) {
      searchFor = 'You search for ' + searchString
      console.log('>>>>', searchFor);
      props.history.push('/search?q=' + searchString)
    }
  }

  const getSearchText = (event) => {
    searchString = event.target.value
  }

  const openCart = () => {
    if (!props.cartItemsCount) {
      props.dispatch({type: 'CART_IS_EMPTY'})
    } else {
      props.history.push('/cart')
    }
  }

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
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input onChange={getSearchText} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button onClick={search} className="btn btn-outline-success my-2 my-sm-0 search-button" type="submit"><i className="fa fa-search"></i></button>
        </form>
        {props.user?.token && <Link to="/orders"><span className="nav-link">My Orders</span></Link>}
        {props.user?.token && props.adminUsers.indexOf(props.user?.email) !== -1 && <Link to="/admin/cake/add"><span className="nav-link">Add New Cake</span></Link>}
        {props.user?.token && <span onClick={() => props.logout()} className="nav-link">Log out</span>}
        {!props.user?.token && <Link to="/signup"><span className="nav-link">SignUp</span></Link>}
        {!props.user?.token && <Link to="/login"><span className="nav-link">Login</span></Link>}
        {props.user?.token && <span onClick={openCart} className="nav-link"><i className="fas fa-shopping-cart pr-2"></i>{props.cartItemsCount !== 0 && <span className="badge badge-danger">{props.cartItemsCount}</span>}</span>}
      </div>
    </nav>
  </>
}

const mapStateToProps = (state, props) => {
  return {
    ...state.CartReducer
  }
}
export default connect(mapStateToProps)(withRouter(Navbar))
