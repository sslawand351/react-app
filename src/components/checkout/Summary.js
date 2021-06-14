import { connect } from "react-redux"
import { Link } from "react-router-dom"

function Summary(props) {

  return <>
        <div className="title">
            <div className="row m-0">
                <div className="col">
                    <h4><b>Order Summary</b></h4>
                </div>
                <div className="col align-self-center text-right text-muted">{props.cart.items.length} items</div>
            </div>
        </div>
        {props.cart.items.map((item, index) => {
          let className = index%2 ? "row m-0" : "row m-0 border-top border-bottom"
          if (props.cart.items.length === index + 1 && index%2 !== 0) {
            className = "row m-0 border-bottom"
          }
          return <div className={className} key={index}>
            <div className="row main align-items-center">
                <div className="col-2"><img className="" src={item.image} alt="" width="60" height="60" /></div>
                <div className="col">
                    {/* <div className="row text-muted">Shirt</div> */}
                    <div className="row">{item.name}</div>
                </div>
                <div className="col">Qty: <span className="btn btn-sm border ml-2 mr-2 qty">{item.quantity}</span></div>
                <div className="col">&#x20B9; {item.price}</div>
            </div>
          </div>
        })}
        <br />
        <br />
        <Link to="/checkout/address"><button className="btn btn-dark btn-block">Next</button></Link>
        {/* <div className="back-to-shop"><a href="#">&#8592;</a><span className="text-muted">Back to shop</span></div> */}
  </>
}

export default connect(state => {
  return {
    ...state.CartReducer
  }
})(Summary)
