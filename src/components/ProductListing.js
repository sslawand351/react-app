import Product from './Product'
import products from '../data'

function ProductListing() {
	return (
		<div className="col-md-12">
			<div className="row">
				{products.map((product, index) => {
					return <Product product={product} key={index} />
				})}
			</div>
		</div>
	)
}

export default ProductListing
