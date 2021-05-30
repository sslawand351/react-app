import { Component } from "react";

class SignUp extends Component
{
  constructor() {
    super();
    this.state = {
      fullname: {value: null, error: null},
      email: {value: null, error: null},
      role: {value: null, error: null}
    }
  }

  validateFullname = (event) => {
    let fullname = event.target.value.trim()
    let message = fullname ? null : 'Please enter fullname'
    this.setState({
      fullname: {
        value: fullname,
        error: message
      }
    })
  }

  onChangeEmail = (event) => {
    let email = event.target.value.trim()
    this.setState({
      email: {
        value: email,
        error: this.validateEmail(email)
      }
    })
  }

  validateEmail = (email) => {
    let message = null
    console.log("Email ", email);
    if (email == null || email.length === 0) {
      message = 'Please enter email'
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) === false) {
      message = 'Please enter valid email'
    }
    return message
  }

  validateRole = (event) => {
    let role = event.target.value.trim()
    let message = role ? null : 'Please enter role'
    this.setState({
      role: {
        value: role,
        error: message
      }
    })
  }

  validateForm = (event) => {
    console.log(this.state);
    this.setState({
      fullname: {
        value: this.state.fullname.value,
        error: this.state.fullname.value ? null : 'Please enter fullname'
      },
      email: {
        value: this.state.email.value,
        error: this.validateEmail(this.state.email.value)
      },
      role: {
        value: this.state.role.value,
        error: this.state.role.value ? null : 'Please enter role'
      }
    })
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div>
          <form>
            <h2>SignUp</h2>
            <div className={this.state.fullname.error ? 'form-group text-danger' : 'form-group'}>
              <label htmlFor="fullName">Fullname</label>
              <input onChange={this.validateFullname} type="text" className={this.state.fullname.error ? 'form-control is-invalid' : 'form-control'} id="fullname" placeholder="Fullname" />
              {this.state.fullname.error}
            </div>
            <div className={this.state.email.error ? 'form-group text-danger' : 'form-group'}>
              <label htmlFor="emailAddress">Email address</label>
              <input onChange={this.onChangeEmail} type="email" className={this.state.email.error ? 'form-control is-invalid' : 'form-control'} id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" />
              {this.state.email.error}
            </div>
            <div className={this.state.role.error ? 'form-group text-danger' : 'form-group'}>
              <label htmlFor="role">Role</label>
              <input onChange={this.validateRole} type="text" className={this.state.role.error ? 'form-control is-invalid' : 'form-control'} id="role" placeholder="Enter Role" />
              {this.state.role.error}
            </div>
            <button onClick={this.validateForm} type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp
