import { useEffect } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { placeOrderMiddleware } from "../../middleware/cart"

function Confirm(props) {
  useEffect(() => {
    if (!props.cart.address) {
      props.history.push('/checkout/address')
    }
  }, [])

  const placeOrder = (event) => {
    event.preventDefault()
    if (window.confirm('Are you sure, you want to place order?')) {
      props.dispatch(placeOrderMiddleware(localStorage.token, props.cart, props.cart.address))
    }
  }
  return <>
    <div className="title">
        <div className="row m-0">
            <div className="col">
                <h4><b>Order Confirmation</b></h4>
            </div>
        </div>
    </div>
    <hr />
    <div className="col">
      <h6>Shipping Address:</h6>
      <div>Name: {props.cart.address?.fullname}</div>
      <div>Phone: {props.cart.address?.phone}</div>
      <div>{props.cart.address?.addressLine}, {props.cart.address?.city}, {props.cart.address?.pincode}</div>
    </div>
    <hr />
    <div className="col">
      <h6>Delivery: </h6>Cash On delivery
    </div>
    <hr />
    <div>
    <br />
    <button onClick={placeOrder} className="btn btn-dark btn-block">Place Order</button></div>
  </>
}

export default connect(state => {
  return {...state.CartReducer}
})(withRouter(Confirm))
