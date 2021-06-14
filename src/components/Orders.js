import { useEffect, useState } from "react"
import { getOrders } from "../apis/Api"
import Loader from "./Loader"

function Orders() {
  let [orders, setOrders] = useState()

  useEffect(()=> {
    getOrders(localStorage.token).then(response => {
      setOrders(response.cakeorders)
    })
  }, [])

  if (!orders) {
    return <Loader text="Please wait loading cake orders" />
  }

  return <div className="container mt-5 mb-5">
    <h2>My Orders</h2>
    <div className="card">
      <div className="row">
        <div className="col-md-12 table-responsive">
        <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Order Id</th>
              <th scope="col">Payment mode</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Order Date</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order, index) => {
            return <tr key={index}>
              <td>{order.name}<br />Phone: {order.phone}<br />{order.address}, {order.city}, {order.pincode}</td>
              <td>{order.orderid}</td>
              <td>{order.mode}</td>
              <td>&#x20B9; {order.price}</td>
              <td>{order.pending ? 'Pending' : 'Completed'}</td>
              <td>{order.orderdate}</td>
            </tr>
          })}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  </div>
}

export default Orders
