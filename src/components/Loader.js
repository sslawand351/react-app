function Loader (props) {
  return <div className="text-center m-5">
    <div className="spinner spinner--steps text-warning icon-spinner m-3" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <p>{props.text}</p>
  </div>
}

export default Loader
