function Loader (props) {
  return <div className="text-center">
    <div className="spinner-border text-primary m-5" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <p>{props.text}</p>
  </div>
}

export default Loader
