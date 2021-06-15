import {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import { cakeImageUpload } from "../../apis/Api";
import { isEmpty, isNumber } from "../../form-validation";

const AddCake = (props) => {
    const dispatch = useDispatch()
    const [cakeName, setCakeName] = useState()
    const [cakeDesc, setCakeDesc] = useState('')
    const [cakePrice, setCakePrice] = useState()
    const [cakeWeight, setCakeWeight] = useState()
    const [cakeImage, setCakeImage] = useState()
    const [uploadCakeImage, setUploadCakeImage] = useState()
    const [cakeType, setCakeType] = useState('')
    const [cakeEggless, setCakeEggless] = useState(false)
    const [cakeFlavour, setCakeFlavour] = useState('')
    const [ingredients, setIngredients] = useState([''])
    let cakeIngredients = []

    const token = localStorage.getItem('token')

    if (!token) {
        props.history.push('/login')
    }

    const fileUpload = (event) => {
      setCakeImage(URL.createObjectURL(event.target.files[0]))

      let formData = new FormData()
      formData.append('file', event.target.files[0])

      cakeImageUpload(formData).then(response => {
          setUploadCakeImage(response.imageUrl)
      }, err => {})
    }

    const handleAdd = () => {
      let values = [...ingredients]
      values.push('')
      setIngredients(values)
    }

    const handleChange = (i, event) => {
      let values = [...ingredients]
      values[i] = event.target.value
      setIngredients(values)
    }

    const handleRemove = i => {
      let values = [...ingredients]
      values.splice(i, 1)
      setIngredients(values)
    }

    const addCake = (event) => {
      event.preventDefault()
      console.log('cakeIngredients', ingredients)
      let isValid = !isEmpty(uploadCakeImage) && !isEmpty(cakeName) && !isEmpty(cakePrice)
        && !isNumber(cakePrice) && !isEmpty(cakeWeight) && !isNumber(cakeWeight)
      if (isValid) {
        dispatch({
          type: 'ADD_CAKE',
          payload: {
            name: cakeName,
            description: cakeDesc,
            price: cakePrice,
            weight: cakeWeight,
            image: uploadCakeImage,
            type: cakeType,
            eggless: cakeEggless,
            flavour: cakeFlavour,
            ingredients: [...new Set(ingredients)]
          }
        })
        props.history.push('/')
      } else {
        setUploadCakeImage(uploadCakeImage || '')
        setCakeName(cakeName || '')
        setCakePrice(cakePrice || '')
        setCakeWeight(cakeWeight || '')
      }
    }

    return <div className="container mt-5 mb-5">
      <h4>Add Cake</h4>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group cake_image">
              <label htmlFor="cakeImage">Cake Image</label>
              <div className="custom-file">
                <input type="file" onChange={fileUpload} name="cake_image" className="custom-file-input" />
                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
              </div>
              <span className="text-danger">{typeof uploadCakeImage == 'string' && isEmpty(uploadCakeImage) ? 'Please upload cake image': ''}</span>
              {cakeImage && <img src={cakeImage} alt="Cake" style={{width: '20%'}}/> }
            </div>
            <div className="row">
              <div className="form-group cake_name col-md-6">
                <label htmlFor="cakeName">Cake Name</label>
                <input name='cake_name' onChange={e => setCakeName(e.target.value)} className="form-control" placeholder="Cake Name"/>
                <span className="text-danger">{typeof cakeName == 'string' && isEmpty(cakeName) ? 'Please enter cake name': ''}</span>
              </div>
              <div className="form-group cake_price col-md-6">
                <label htmlFor="price">Price</label>
                <input name='cake_price' onChange={e => setCakePrice(e.target.value)} className="form-control" placeholder="Cake Price"/>
                <span className="text-danger">{typeof cakePrice == 'string' && isEmpty(cakePrice) ? 'Please enter cake price': ''}
                {typeof cakePrice == 'string' && cakePrice.trim() != '' && isNumber(cakePrice) ? 'Please enter valid cake price': ''}</span>
              </div>
            </div>
            <div className="form-group cake_desc">
              <label htmlFor="description">Description</label>
              <textarea value={cakeDesc} name='cake_desc' onChange={e => setCakeDesc(e.target.value)} className="form-control" placeholder="Cake Description"/>
            </div>
            <div className="row">
              <div className="form-group cake_weight col-md-6">
                <label htmlFor="weight">Weight (kg)</label>
                <input name='cake_weight' onChange={e => setCakeWeight(e.target.value)} className="form-control" placeholder="Cake Weight"/>
                <span className="text-danger">{typeof cakeWeight == 'string' && isEmpty(cakeWeight) ? 'Please enter cake weight': ''}
                {typeof cakeWeight == 'string' && cakeWeight.trim() != '' && isNumber(cakeWeight) ? 'Please enter valid cake weight': ''}</span>
              </div>
              <div className="form-group cake_type col-md-6">
                <label htmlFor="type">Type</label>
                <select name="cake_type" value={cakeType} onChange={e => setCakeType(e.target.value)} className="form-control">
                  <option value="" disabled>Select Type</option>
                  <option value="birthday">Birthday</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="farewell">Farewell</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group  col-md-6">
                <label htmlFor="flavour">Flavour</label>
                <input value={cakeFlavour} name='cake_flavour' onChange={e => setCakeFlavour(e.target.value)} className="form-control" placeholder="Cake Flavour"/>
              </div>
              <div className="form-check form-group col-md-6">
                <label htmlFor="eggless"></label>
                <div>
                  &nbsp;&nbsp;&nbsp;<input type="checkbox" id="cake_eggless" value={cakeEggless} name='cake_eggless' onChange={e => setCakeEggless(e.target.checked)} className="form-check-input"/>
                  <label htmlFor="cake_eggless" className="form-check-label">Eggless</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients <span className="btn btn-sm btn-secondary" onClick={handleAdd}><i className="fa fa-plus"/></span></label>
              <div className="row">
                {ingredients.map((each, index) => {
                  return <div className="col-md-6" key={index}>
                      <div className="row">
                      <div className="col-md-10">
                        <input name='cake_ingredients' onChange={e => handleChange(index, e)} value={each} className="form-control" placeholder="Cake Ingredients"/>
                      </div>
                      <div className="col-md-2">
                        <span className="btn btn-sm" onClick={() => handleRemove(index)}><i className="fa fa-trash"/></span>
                      </div>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
            <button onClick={addCake} className="btn btn-block btn-success">Add Cake</button>
          </form>
        </div>
      </div>
    </div>
}

export default withRouter(AddCake)
