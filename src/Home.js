import Carousel from "./components/Carousel"
import ProductListing from "./components/ProductListing"

function Home(props) {
  console.log(props);
  return <>
    <Carousel />
    <div className="container">
      <ProductListing />
    </div>
  </>
}

export default Home