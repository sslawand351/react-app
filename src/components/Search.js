import queryString from "query-string"
import { getCakesBySearchKeyword } from "../apis/Api"
import Product from "./Product"
import { useEffect, useState } from "react"
import Loader from "./Loader"
import NoRecordFound from "./NoRecordFound"

function Search (props) {
  console.log(props)
  let query = queryString.parse(props.location.search)
  console.log(props.match.params)
  console.log(queryString.parse(props.location.search))

  let [cakes, setCakes] = useState()

  useEffect(() => {
    getCakesBySearchKeyword(query.q).then((response) => {
      console.log('cakes', response);
      setCakes(response)
    }, (error) => {
      console.log('cakes error', error);
    })
  }, [query.q])
  if (!cakes) {
    return <Loader text="Please wait loading cakes" />
  }
  return <div className="container">
    <div className="col-md-12 mt-4 mb-4">
			<h2>Search Page for {query.q}</h2>
			{cakes.length === 0 ? <NoRecordFound text="No cakes found" /> :
        <div className="row">
        {cakes.map((product, index) => {
          return <Product product={product} key={index} />
        })}
      </div>}
    </div>
  </div>
}

export default Search