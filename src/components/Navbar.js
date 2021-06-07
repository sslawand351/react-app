import { Link, withRouter } from "react-router-dom"

function Navbar(props) {
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
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/">{props.data.projectName}</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {props.loggedInUser?.name && <li className="nav-item active">
            Welcome {props.loggedInUser?.name}
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
        {props.loggedInUser?.token && <span onClick={() => props.logout()} className="nav-link">Log out</span>}
        {!props.loggedInUser?.token && <Link to="/signup"><span className="nav-link">SignUp</span></Link>}
        {!props.loggedInUser?.token && <Link to="/login"><span className="nav-link">Login</span></Link>}
        {/* {!isLoggedIn && <button onClick={() => login(true)} className="btn btn-danger">Login</button>} */}
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
