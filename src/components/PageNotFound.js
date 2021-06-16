import React from "react"
import { Link } from "react-router-dom"

function PageNotFound() {
  return (
    <React.Fragment>
      <div className="container mt-5 mb-5 div-404">
        <img className="img-404" src="/404.jpg" alt="Page not found" />
        <Link to="/" className="link-404"><span>Click here to go to Home page</span></Link>
      </div>
    </React.Fragment>
  )
}

export default PageNotFound
