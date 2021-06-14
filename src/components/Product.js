import { Link } from "react-router-dom"

function Product(props) {
  // console.log(props);
  if (!props.product) {
    return null
  }
  return (
    <div className="col-md-3 mt-3 mb-3">
      <div className="card zoom" id={props.product.cakeid}>
        <Link to={'/cake/' + props.product.cakeid}><img 
        // placeholderImg="https://via.placeholder.com/240x200.png?text=240x200"
        className="card-img-top" src={props.product.image} alt={props.product.name} style={{width: "100%", height:"200px", maxHeight: "200px"}} /></Link>
        <div className="card-body">
          <h6 className="card-title">{props.product.name}</h6>
          <p className="card-text"><span className="currency">₹&nbsp;</span>{props.product.price}</p>
          {props.product.description && <span>{props.product.description}</span>}
          {props.product.discount && <span>Discount: {props.product.discount}</span>}
        </div>
      </div>
    </div>
  )
}

export default Product
