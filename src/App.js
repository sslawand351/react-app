import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import SignUp from './components/SignUp'
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
      <SignUp />
    </div>
  );
}

export default App;
