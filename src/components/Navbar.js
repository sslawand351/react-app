function Navbar(props) {
  let searchString
  let searchFor = 'Enter the search keyword'
  let search = (event) => {
    event.preventDefault()
    if (searchString) {
      searchFor = 'You search for ' + searchString
      console.log('>>>>', searchFor);
      alert(searchFor)
    }
  }
  let getSearchText = (event) => {
    searchString = event.target.value
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand" href="#home">{props.data.projectName}</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Welcome {props.data.userName}</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#link">Link</a>
          </li> */}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input onChange={getSearchText} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <span>{searchFor}</span>
          <button onClick={search} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar;