import React from "react"
import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <React.Fragment>
      <h2>Page Not Found</h2>
      <Link to="/"><button className="btn btn-primary">Click here to go to Home page</button></Link>
    </React.Fragment>
  )
}

export default PageNotFound
