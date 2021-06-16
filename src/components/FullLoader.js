function FullLoader(props) {
  return <div className={`text-center full-loader ${props.class}`}>
    <div className="inner-div text-warning">
      {props.main && <h2>{props.main}</h2>}
      <div className="spinner spinner--steps text-warning icon-spinner" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p>{props.text || "Please wait... Loading..."}</p>
    </div>
  </div> 
}

export default FullLoader
