import { useEffect } from "react"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { addToCartMiddleware, removeCakeFromCartMiddleware, removeOneCakeFromCartMiddleware } from "../middleware/cart"
import FullLoader from "./FullLoader"
import NoRecordFound from "./NoRecordFound"
import { PopupMessage } from "./PopupMessage"

function Cart(props) {
  useEffect(() => {
    if (props.redirect) {
      props.dispatch({type: 'CLEAR_REDIRECT'})
    }
  }, [props.redirect])

  const removeFromCart = (event) => {
    let cakeid = event.target.getAttribute('data-cakeid')
    props.dispatch(removeCakeFromCartMiddleware(localStorage.token, cakeid))
  }

  const decreaseQty = (event) => {
    let cakeid = event.target.getAttribute('data-cakeid')
    props.dispatch(removeOneCakeFromCartMiddleware(localStorage.token, cakeid))
  }

  const increaseQty = (event) => {
    let cake = JSON.parse(event.target.getAttribute('data-cake'))

    props.dispatch(addToCartMiddleware(localStorage.token, {
      cakeid: cake.cakeid,
      image: cake.image,
      name: cake.name,
      price: cake.price/cake.quantity,
      weight: cake.weight
    }))
  }

  return <>
  {!props.loader && props.isLoading && <FullLoader text="Please wait..." class="cart-loader" />}
  {props.message && <PopupMessage message={props.message} qty={props.cart.totalQty}/>}
  <div className="container mt-5 mb-5">
    <div className="cart-block card">
      <div className="row">
          <div className="col-md-8 cart">
              <div className="title">
                  <div className="row m-0">
                      <div className="col">
                          <h4><b>Shopping Cart</b></h4>
                      </div>
                      <div className="col align-self-center text-right text-muted">{props.cart.items.length} items</div>
                  </div>
              </div>
              {props.cart.items.length === 0 ? <NoRecordFound text="Your cart is empty" />: props.cart.items.map((item, index) => {
                let className = index%2 ? "row m-0" : "row m-0 border-top border-bottom"
                if (props.cart.items.length === index + 1 && index%2 !== 0) {
                  className = "row m-0 border-bottom"
                }
                return <div className={className} key={index}>
                  <div className="row main align-items-center">
                      <div className="col-2"><img className="" src={item.image} alt="" width="60" height="60" /></div>
                      <div className="col">
                          <div className="row">{item.name}</div>
                      </div>
                      <div className="col"> <span onClick={decreaseQty} data-cakeid={item.cakeid} className="btn btn-sm border up-qty">-</span><span className="btn btn-sm border ml-2 mr-2 qty">{item.quantity}</span><span onClick={increaseQty} data-cake={JSON.stringify(item)} className="btn btn-sm border up-qty">+</span> </div>
                      <div className="col">&#x20B9; {item.price} <span onClick={removeFromCart} data-cakeid={item.cakeid} className="btn btn-sm close">&#10005;</span></div>
                  </div>
                </div>
              })}
              <div className="back-to-shop"><Link to="/">&#8592; <span className="text-muted">Back to shop</span></Link></div>
          </div>
          <div className="col-md-4 summary">
              <div>
                  <h5><b>Summary</b></h5>
              </div>
              <hr />
              <div className="row">
                  <div className="col">ITEMS {props.cart.items.length}</div>
                  <div className="col text-right">&#x20B9; {props.cart.totalPrice}</div>
              </div>
              <div className="row mt-5" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                  <div className="col">TOTAL PRICE</div>
                  <div className="col text-right">&#x20B9; {props.cart.totalPrice}</div>
              </div>
              <Link to="/checkout/summary"><button className="btn">CHECKOUT</button></Link>
          </div>
      </div>
    </div>
    </div>
  </>
}

export default connect(state => {
  return {
    ...state.CartReducer
  }
})(withRouter(Cart))
