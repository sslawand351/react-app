import { useEffect } from "react"
import { connect } from "react-redux"
import { cartMiddleware } from "../middleware/cart"

function Cart(props) {
  console.log(props.cart.length)
  return <>
    <div className="col-md-12">
      <div className="row">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Cake ID</th>
            <th scope="col">Cake</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.cart.map((item, index) => {
            return <tr>
              <th scope="row">{index + 1}</th>
              <td>{item.cakeid}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td><button onClick={() => { /* remove from cart */}} className="btn btn-danger btn-sm">Remove</button></td>
            </tr>
          })}
        </tbody>
      </table>
      </div>
    </div>
  </>
}

export default connect(state => {
  return {
    ...state.CartReducer
  }
})(Cart)
