import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams, withRouter } from "react-router"
import { getCakeById } from "../apis/Api"
import { addToCartMiddleware } from "../middleware/cart"
import Loader from "./Loader"

const CakeDetails = (props) => {
  let cakeParams = useParams()
  let [cake, setCake] = useState()

  if (props.redirect) {
    props.dispatch({type: 'CLEAR_REDIRECT'})
  }

  const onClickAddToCart = (event) => {
    props.dispatch(addToCartMiddleware(localStorage.token, {
      cakeid: cake.cakeid,
      image: cake.image,
      name: cake.name,
      price: cake.price,
      weight: cake.weight
    }))
  }

  useEffect(() => {
    getCakeById(cakeParams.id)
      .then(response => {
        document.title = response.name + ' | Cake Shop'
        setCake(response)
      }, error => console.log(error))
  }, [cakeParams.id])

  const onError = (event) => {
    event.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoHD8IwNVC1TNA4pn6ZR4wzez4aibm7pxQjw&usqp=CAU"
  }

  if (!cake) {
    return <Loader text="Please wait loading cake" />
  }

  let ratings = Math.floor(cake.ratings)
  return <div className="container mt-4">
    <h1>{cake.name}</h1>
    <section className="cake-details mb-5 pt-4 pb-4">
    <div className="col-md-12 row">
      <div className="col-md-5 mb-4 mb-md-0">
        <div className="mdb-lightbox">
          <div className="row product-gallery mx-1">
            <div className="col-12 mb-0">
              <div className="view overlay rounded z-depth-1 main-img">
                <a href={cake.image} data-size="710x823">
                  <img src={cake.image} onError={onError} alt={cake.name} className="img-fluid z-depth-1" style={{width:"100%"}}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <h5>{cake.name}</h5>
        <p className="mb-2 text-muted text-uppercase small">{cake.reviews} reviews</p>
        <ul className="rating">
          {Array(ratings).fill(0).map((value, index) => <li key={index}><i className="fas fa-star fa-sm text-primary"></i></li>)}
          {ratings < cake.ratings && <li key={ratings + 1}><i className="fas fa-star-half-alt fa-sm text-primary"></i></li>}
          {Array(Math.floor(5 - cake.ratings)).fill(0).map((value, index) => <li key={ratings + index}><i className="far fa-star fa-sm text-primary"></i></li>)}
        </ul>
        <p><span className="mr-1"><strong>₹{cake.price}</strong></span></p>
        <p className="pt-1">{cake.description}</p>
        <div className="table-responsive">
          <table className="table table-sm table-borderless mb-0">
            <tbody>
              <tr>
                <th className="pl-0 w-25" scope="row"><strong>Flavour</strong></th>
                <td>{cake.flavour}</td>
              </tr>
              <tr>
                <th className="pl-0 w-25" scope="row"><strong>Ingredients</strong></th>
                <td>{cake.ingredients.join()}</td>
              </tr>
              <tr>
                <th className="pl-0 w-25" scope="row"><strong>Occasion</strong></th>
                <td>{cake.type}</td>
              </tr>
              <tr>
                <th className="pl-0 w-25" scope="row"><strong>Weight</strong></th>
                <td>{cake.weight} kg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        {/* <button type="button" className="btn btn-primary btn-md mr-1 mb-2">Buy now</button> */}
        {!props.isLoading && <button onClick={onClickAddToCart} type="button" className="btn btn-light btn-md mr-1 mb-2"><i
            className="fas fa-shopping-cart pr-2"></i>Add to cart</button>}
        {props.isLoading && <button type="button" className="btn btn-light btn-md mr-1 mb-2" disabled><i
            className="fas fa-shopping-cart pr-2"></i> Please wait... Adding to cart</button>}
      </div>
    </div>
  
  </section></div>
}

export default connect((state, props) => {
  if (state.CartReducer.redirect) {
    props.history.push(state.CartReducer.redirect)
  }
  return {
    ...state.CartReducer
  }
})(withRouter(CakeDetails))
