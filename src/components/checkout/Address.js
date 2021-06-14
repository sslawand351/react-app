import { connect } from "react-redux"
import { withRouter } from "react-router"
import { isEmpty } from "../../form-validation"

function Address(props) {
  const addAddress = (event) => {
    event.preventDefault()
    let isValid = !isEmpty(props.address.fullname.value) && !isEmpty(props.address.phone.value) &&
      !isEmpty(props.address.addressLine.value) && !isEmpty(props.address.city.value) && !isEmpty(props.address.pincode.value)
    props.setAddress({
      fullname: {value:props.address.fullname.value, error: isEmpty(props.address.fullname.value) ? 'Please enter fullname': null},
      phone: {value:props.address.phone.value, error: isEmpty(props.address.phone.value) ? 'Please enter phone': null},
      addressLine: {value:props.address.addressLine.value, error: isEmpty(props.address.addressLine.value) ? 'Please enter address line': null},
      city: {value:props.address.city.value, error: isEmpty(props.address.city.value) ? 'Please enter city': null},
      pincode: {value:props.address.pincode.value, error: isEmpty(props.address.pincode.value) ? 'Please enter pincode': null},
    })
    if (isValid) {
      props.dispatch({type: 'CART_SET_ADDRESS', payload: {
        fullname: props.address.fullname.value,
        phone: props.address.phone.value,
        addressLine: props.address.addressLine.value,
        city: props.address.city.value,
        pincode: props.address.pincode.value
      }})
      props.history.push('/checkout/confirm')
    }
  }

  const validateFullname = (event) => {
    let fullname = event.target.value
    props.setAddress({
      ...props.address,
      fullname: {value:fullname, error: isEmpty(fullname) ? 'Please enter fullname': null}
    })
  }

  const validatePhone = (event) => {
    let phone = event.target.value
    props.setAddress({
      ...props.address,
      phone: {value:phone, error: isEmpty(phone) ? 'Please enter phone': null}
    })
  }

  const validateAddressLine = (event) => {
    let addressLine = event.target.value
    props.setAddress({
      ...props.address,
      addressLine: {value:addressLine, error: isEmpty(addressLine) ? 'Please enter address line': null}
    })
  }

  const validateCity = (event) => {
    let city = event.target.value
    props.setAddress({
      ...props.address,
      city: {value:city, error: isEmpty(city) ? 'Please enter city': null}
    })
  }

  const validatePincode = (event) => {
    let pincode = event.target.value
    props.setAddress({
      ...props.address,
      pincode: {value:pincode, error: isEmpty(pincode) ? 'Please enter pincode': null}
    })
  }
  return <>
  <div className="title">
      <div className="row m-0">
          <div className="col">
              <h4><b>Order Address</b></h4>
          </div>
      </div>
  </div>
  <hr />
  <form className="form">
    <div className="col">
      <div className={props.address.fullname.error ? 'form-group text-danger' : 'form-group'}>
        <label htmlFor="fullName">Fullname</label>
        <input onChange={validateFullname} type="text" className={props.address.fullname.error ? 'form-control is-invalid' : 'form-control'} id="fullname" placeholder="Fullname" value={props.address.fullname.value}/>
        {props.address.fullname.error}
      </div>
      <div className={props.address.phone.error ? 'form-group text-danger' : 'form-group'}>
        <label htmlFor="phone">Phone</label>
        <input onChange={validatePhone} type="text" className={props.address.phone.error ? 'form-control is-invalid' : 'form-control'} id="phone" placeholder="Enter phone" value={props.address.phone.value} />
        {props.address.phone.error}
      </div>
      <div className={props.address.addressLine.error ? 'form-group text-danger' : 'form-group'}>
        <label htmlFor="addressLine">Address Line</label>
        <input onChange={validateAddressLine} type="text" className={props.address.addressLine.error ? 'form-control is-invalid' : 'form-control'} id="addressLine" placeholder="Address line" value={props.address.addressLine.value}/>
        {props.address.addressLine.error}
      </div>
      <div className={props.address.city.error ? 'form-group text-danger' : 'form-group'}>
        <label htmlFor="city">City</label>
        <input onChange={validateCity} type="text" className={props.address.city.error ? 'form-control is-invalid' : 'form-control'} id="city" placeholder="City" value={props.address.city.value}/>
        {props.address.city.error}
      </div>
      <div className={props.address.pincode.error ? 'form-group text-danger' : 'form-group'}>
        <label htmlFor="pincode">Pincode</label>
        <input onChange={validatePincode} type="text" className={props.address.pincode.error ? 'form-control is-invalid' : 'form-control'} id="pincode" placeholder="pincode" value={props.address.pincode.value}/>
        {props.address.pincode.error}
      </div>
      <button onClick={addAddress} type="submit" className="btn btn-dark btn-block">Add Address</button>
      </div>
    </form>
        
  </>
}

export default connect()(withRouter(Address))
