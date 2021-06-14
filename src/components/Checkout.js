import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Route, useRouteMatch, withRouter } from "react-router-dom";
import Address from "./checkout/Address";
import Confirm from "./checkout/Confirm";
import Summary from "./checkout/Summary";

function Checkout(props) {
  let { path } = useRouteMatch()
  useEffect(() => {
    if (props.newOrder) {
      props.dispatch({type: 'RESET_NEWORDER'})
      props.history.push('/orders')
      return
    }
    if (!props.cart?.items.length) {
      props.dispatch({type: 'CART_IS_EMPTY'})
      props.history.push('/')
    }
  }, [props.newOrder?.orderid, props.cart?.items.length])
  
  let [address, setAddress] = useState({
    fullname:{value:props.cart.address?.fullname || '', error: null},
    phone:{value:props.cart.address?.phone || '', error: null},
    addressLine:{value:props.cart.address?.addressLine || '', error: null},
    city:{value:props.cart.address?.city || '', error: null},
    pincode:{value:props.cart.address?.pincode || '', error: null},
  })
  return <div className="container">
    <div className="row">
      {/* <div className="col-md-8">
        <Route exact path={`${path}/summary`}><Summary /></Route>
        <Route exact path={`${path}/address`}><Address /></Route>
        <Route exact path={`${path}/confirm`}><Confirm /></Route>
      </div> */}
      <div className="col-md-12">
        <ul>
          <li key="1"><Link to={`${path}/summary`}>Summary</Link></li>
          <li key="2"><Link to={`${path}/address`}>Address</Link></li>
          <li key="3">{props.cart.address ? <Link to={`${path}/confirm`}>Confirm</Link> : <Link to={`${path}/address`}>Confirm</Link>}</li>
        </ul>
      </div>
      <div className="col-md-12">
    <div className="cart-block card">
      <div className="row">
          <div className="col-md-8 cart">
            <Route exact path={`${path}/summary`}><Summary /></Route>
            <Route exact path={`${path}/address`}><Address address={address} setAddress={setAddress} /></Route>
            <Route exact path={`${path}/confirm`}><Confirm /></Route>
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
              <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col text-right">&#x20B9; 0</div>
              </div>
              <div className="row mt-5" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                  <div className="col">TOTAL PRICE</div>
                  <div className="col text-right">&#x20B9; {props.cart.totalPrice}</div>
              </div>
          </div>
      </div>
    </div>
      </div>
    </div>
  </div>
}

export default connect(state => {
  console.log(state.CartReducer)
  return {
    ...state.CartReducer
  }
})(withRouter(Checkout))
