import { Link } from "react-router-dom"

function Product(props) {
  if (!props.product) {
    return null
  }

  const onError = (event) => {
    event.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoHD8IwNVC1TNA4pn6ZR4wzez4aibm7pxQjw&usqp=CAU"
  }

  return (
    <div className="col-md-3 mt-3 mb-3">
      <div className="card zoom cake" id={props.product.cakeid}>
        <Link to={'/cake/' + props.product.cakeid}><img 
        // placeholderImg="https://via.placeholder.com/240x200.png?text=240x200"
        className="card-img-top" src={props.product.image} onError={onError} alt={props.product.name} style={{width: "100%", height:"200px", maxHeight: "200px"}} /></Link>
        <div className="card-body">
          <h6 className="card-title">{props.product.name}</h6>
          <p className="card-text"><span className="currency">₹&nbsp;</span>{props.product.price}</p>
          {/* {props.product.description && <span>{props.product.description}</span>} */}
          {props.product.discount && <span>Discount: {props.product.discount}</span>}
        </div>
      </div>
    </div>
  )
}

export default Product
