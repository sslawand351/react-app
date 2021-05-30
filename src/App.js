import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import './style.css'

var data = {
  projectName: "React Training",
  userName: "Sagar",
}

function App() {
  return (
    <div>
      <Navbar data={data} />
      <Carousel />
    </div>
  );
}

export default App;
