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
    <div className="card">
      <div className="row">
        {orders.map((order, index) => {
          return <div><pre>{JSON.stringify(order, null, 2)}</pre></div>
        })}
      </div>
    </div>
  </div>
}

export default Orders
