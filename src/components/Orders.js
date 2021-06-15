import { useEffect, useState } from "react"
import { getOrders } from "../apis/Api"
import Loader from "./Loader"
import NoRecordFound from "./NoRecordFound"

function Orders() {
  let [orders, setOrders] = useState()

  useEffect(()=> {
    getOrders(localStorage.token).then(response => {
      setOrders(response.cakeorders || [])
    })
  }, [])

  if (!orders) {
    return <Loader text="Please wait loading cake orders" />
  }

  return <div className="container mt-5 mb-5 orders">
    <h2>My Orders</h2>
    <div id="accordion">
    {orders.length === 0 ? <NoRecordFound text="No order found" /> : orders.map((order, index) => {
      return (
        <div className="card" key={index}>
        <div className="card-header" id={"heading" + index}>
          <h5 className="mb-0">
            <button className={index === 0 ? "btn btn-link" : "btn btn-link collapsed"} data-toggle="collapse" data-target={"#collapse" + index} aria-expanded={index === 0 ? "true" : "false"} aria-controls={"collapse" + index}>
              Order #{order.orderid}
            </button>
          </h5>
        </div>
        <div id={"collapse" + index} className={index === 0 ? "collapse show" : "collapse"} aria-labelledby={"heading" + index} data-parent="#accordion">
          <div className="card-body">
            <div className="row m-0">
            <div className="col-md-6">
              <b>Order Information</b>
              <div>Price: &#x20B9; {order.price}</div>
              <div>Payment mode: {order.mode}</div>
              <div>Status: {order.pending ? 'Pending' : 'Completed'}</div>
              <div>Purchased on: {order.orderdate}</div>
            </div>
            <div className="col-md-6">
              <b>Shipping Address:</b>
              <div>{order.name}</div>
              <div>Phone: {order.phone}</div>
              <div>{order.address}, {order.city}, {order.pincode}</div>
            </div>
            </div>
            <br />
            <div className="col-md-12">
              <div className="title">
                  <div className="row m-0">
                      <div className="col">
                          <h6><b>Items</b></h6>
                      </div>
                  </div>
              </div>
            {order.cakes.map((item, index) => {
                let className = index%2 ? "row m-0" : "row m-0 border-top border-bottom"
                if (order.cakes.length === index + 1 && index%2 !== 0) {
                  className = "row m-0 border-bottom"
                }
                return <div className={className} key={index}>
                  <div className="row main align-items-center">
                      <div className="col-2"><img className="" src={item.image} alt="" width="60" height="60" /></div>
                      <div className="col">
                          <div className="row">{item.name}</div>
                      </div>
                      <div className="col">Qty: <span className="btn btn-sm border ml-2 mr-2 qty">{item.quantity}</span></div>
                      <div className="col">&#x20B9; {item.price}</div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
      )
    })}
    </div>
  </div>
}

export default Orders
