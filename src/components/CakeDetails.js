import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams, withRouter } from "react-router"
import { getCakeById } from "../apis/Api"
import { addToCartMiddleware } from "../middleware/cart"
import Loader from "./Loader"

const CakeDetails = (props) => {
  let cakeParams = useParams()
  let [cake, setCake] = useState()
  // let [message, setErrorMessage] = useState()
  // if (props.redirect) {
  //   props.dispatch({type: 'CLEAR_REDIRECT'})
  //   props.history.push(props.redirect)
  // }
  console.log('cake props', props)

  const onClickAddToCart = (event) => {
    // if (!localStorage.token) {
    //   // setErrorMessage('Please login before add to cart')
    //   return;
    // }
    // setErrorMessage('')
    props.dispatch(addToCartMiddleware(localStorage.token, {
      cakeid: cake.cakeid,
      image: cake.image,
      name: cake.name,
      price: cake.price,
      weight: cake.weight
    }))
    // addToCart(localStorage.token, {
    //   cakeid: cake.cakeid,
    //   image: cake.image,
    //   name: cake.name,
    //   price: cake.price,
    //   weight: cake.weight
    // }).then(response => {
    //   if (!response.data) {
    //     setErrorMessage(response.message)
    //     return;
    //   }
    //   props.dispatch({
    //     type: 'ADD_TO_CART',
    //     payload: {...cake}
    //   })
    // })
  }

  useEffect(() => {
    getCakeById(cakeParams.id)
      .then(response => setCake(response), error => console.log(error))
  }, [cakeParams.id])

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
                  <img src={cake.image} alt={cake.name} className="img-fluid z-depth-1" style={{width:"100%"}}/>
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
        {/* <div className="table-responsive mb-2">
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td className="pl-0 pb-0 w-25">Quantity</td>
                <td className="pb-0">Select size</td>
              </tr>
              <tr>
                <td className="pl-0">
                  <div className="def-number-input number-input safari_only mb-0">
                    <button onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                      className="minus"></button>
                    <input className="quantity" min="0" name="quantity" value="1" type="number" />
                    <button onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                      className="plus"></button>
                  </div>
                </td>
                <td>
                  <div className="mt-1">
                    <div className="form-check form-check-inline pl-0">
                      <input type="radio" className="form-check-input" id="small" name="materialExampleRadios"
                        checked />
                      <label className="form-check-label small text-uppercase card-link-secondary"
                        for="small">Small</label>
                    </div>
                    <div className="form-check form-check-inline pl-0">
                      <input type="radio" className="form-check-input" id="medium" name="materialExampleRadios" />
                      <label className="form-check-label small text-uppercase card-link-secondary"
                        for="medium">Medium</label>
                    </div>
                    <div className="form-check form-check-inline pl-0">
                      <input type="radio" className="form-check-input" id="large" name="materialExampleRadios" />
                      <label className="form-check-label small text-uppercase card-link-secondary"
                        for="large">Large</label>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <button type="button" className="btn btn-primary btn-md mr-1 mb-2">Buy now</button>
        {!props.isLoading && <button onClick={onClickAddToCart} type="button" className="btn btn-light btn-md mr-1 mb-2"><i
            className="fas fa-shopping-cart pr-2"></i>Add to cart</button>}
        {props.isLoading && <button type="button" className="btn btn-light btn-md mr-1 mb-2" disabled><i
            className="fas fa-shopping-cart pr-2"></i> Please wait... Adding to cart</button>}
        {/* <h6 className="text-danger">{props.error?.message}</h6> */}
      </div>
    </div>
  
  </section></div>
}

export default connect((state, props) => {
  // props.history.listen((location, action) => {
  //   // console.log(location, action)
  //   if (action === 'PUSH') {
  //     state.CartReducer.error = undefined
  //     state.CartReducer.redirect = undefined
  //   }
  // })

  if (state.CartReducer.redirect) {
    // props.dispatch({type: 'CLEAR_REDIRECT'})
    props.history.push(state.CartReducer.redirect)
  }
  return {
    ...state.CartReducer
  }
})(withRouter(CakeDetails))