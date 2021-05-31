function Product(props) {
  console.log(props);
  if (!props.product) {
    return null
  }
  return (
    <div className="col-md-3">
      <div className="card p-3" id={props.product.cakeid}>
        <img className="card-img-top" src={props.product.image} alt={props.product.name} style={{width: "100%", maxHeight: "200px"}} />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <p className="card-text"><span className="currency">₹&nbsp;</span>{props.product.price}</p>
          {props.product.description && <span>{props.product.description}</span>}
          {props.product.discount && <span>Discount: {props.product.discount}</span>}
        </div>
      </div>
    </div>
  )
}

export default Product
