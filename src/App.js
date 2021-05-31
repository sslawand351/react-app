import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import SignUp from './components/SignUp'
import './style.css'
import ProductListing from './components/ProductListing'

var data = {
  projectName: "React Training",
  userName: "Sagar",
}

function App() {

  return (
    <div>
      <Navbar data={data} />
      <Carousel />
      <SignUp />
      <ProductListing />
    </div>
  );
}

export default App;
