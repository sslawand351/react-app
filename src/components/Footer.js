import { Link } from "react-router-dom"

function Footer(props) {
    return <footer className="page-footer font-small white" style={{background: "rgb(42 27 22)", color:"#fff"}}>
    <div className="footer-copyright text-center py-3">© 2021 Copyright:
      <Link to="/" style={{color:"#fff"}}> {props.projectName}</Link>
    </div>
  </footer>
}

export default Footer
