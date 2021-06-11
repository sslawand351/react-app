import Product from './Product'
import { useEffect, useState } from 'react';
import {getAllCakes} from './../apis/Api'
import Loader from './Loader';
import NoRecordFound from './NoRecordFound';

function ProductListing() {
  let [cakes, setCakes] = useState()

  useEffect(() => {
    getAllCakes().then((response) => {
      // console.log('cakes', response);
      setCakes(response)
    }, (error) => {
      console.log('cakes error', error);
    })
  }, [])
  if (!cakes) {
    return <Loader text="Please wait loading cakes" />
  }
  return (
    <div className="col-md-12 mt-4 mb-4">
      <h2>Cakes</h2>
      <div className="row">
        {cakes.length === 0 ? <NoRecordFound text="No cakes found" /> :
        cakes.map((product, index) => {
          return <Product product={product} key={index} />
        })}
      </div>
    </div>
  )
}

export default ProductListing
