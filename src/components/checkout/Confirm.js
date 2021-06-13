import { connect } from "react-redux"
import { withRouter } from "react-router"
import { placeOrderMiddleware } from "../../middleware/cart"

function Confirm(props) {
  if (!props.cart.address) {
    props.history.push('/checkout/address')
  }
  if (props.cart.order) {
    props.history.push('/orders')
  }

  const placeOrder = (event) => {
    event.preventDefault()
    props.dispatch(placeOrderMiddleware(localStorage.token, props.cart, props.cart.address))
  }
  return <>
    <h4>Order Confirmation</h4>
    <hr />
    <h6>Shipping Address:</h6>
    <div>Name: {props.cart.address?.fullname}</div>
    <div>Phone: {props.cart.address?.phone}</div>
    <div>{props.cart.address?.addressLine}, {props.cart.address?.city}, {props.cart.address?.pincode}</div>
    <hr />
    <h6>Delivery: </h6>Cash On delivery
    <hr />
    <div><button onClick={placeOrder} className="btn btn-dark">Place Order</button></div>
  </>
}

export default connect(state => {
  return {...state.CartReducer}
})(withRouter(Confirm))
