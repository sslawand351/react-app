function NoRecordFound(props) {
  return <div className="col-md-12 p-4" style={{background: '#ffffff'}}>
    <p className="m-0">{props.text || 'No record found'}</p>
  </div>
}

export default NoRecordFound
