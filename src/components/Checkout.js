import { Link, Route, useRouteMatch } from "react-router-dom";
import Address from "./checkout/Address";
import Confirm from "./checkout/Confirm";
import Summary from "./checkout/Summary";

function Checkout() {
  let { path } = useRouteMatch()
  return <div className="col-md-12">
    <div className="row">
      <div className="col-md-8">
        <Route exact path={`${path}/summary`}><Summary /></Route>
        <Route exact path={`${path}/address`}><Address /></Route>
        <Route exact path={`${path}/confirm`}><Confirm /></Route>
      </div>
      <div className="col-md-4">
        <ul>
          <li key="1"><Link to={`${path}/summary`}>Summary</Link></li>
          <li key="2"><Link to={`${path}/address`}>Address</Link></li>
          <li key="3"><Link to={`${path}/confirm`}>Confirm</Link></li>
        </ul>
      </div>
    </div>
  </div>
}

export default Checkout
