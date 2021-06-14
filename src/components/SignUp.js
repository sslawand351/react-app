import { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { signUp } from "../apis/Api";

class SignUp extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      fullname: {value: null, error: null},
      email: {value: null, error: null},
      role: {value: null, error: null},
      password: {value: null, error: null},
      confirmPassword: {value: null, error: null}
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
    this.setState({
      role: {
        value: role,
        error: role ? null : 'Please enter role'
      }
    })
  }

  validatePassword = (event) => {
    let password = event.target.value
    this.setState({
      password: {
        value: password,
        error: password ? null : 'Please enter password'
      }
    })
  }

  validateConfirmPassword = (event) => {
    let password = event.target.value
    this.setState({
      confirmPassword: {
        value: password,
        error: password === this.state.password.value ? null : 'Passwords does not match'
      }
    })
  }

  validateForm = (event) => {
    event.preventDefault();
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
      },
      password: {
        value: this.state.password.value,
        error: this.state.password.value ? null : 'Please enter password'
      },
      confirmPassword: {
        value: this.state.confirmPassword.value,
        error: this.state.confirmPassword.value === this.state.password.value ? null : 'Passwords does not match'
      },
    })

    if (!this.state.fullname.error && !this.state.email.error && !this.state.role.error &&
      !this.state.password.error && !this.state.confirmPassword.error && this.state.email.value) {
        signUp({
          name: this.state.fullname.value,
          email: this.state.email.value,
          password: this.state.password.value
        }).then(response => {
          this.props.dispatch({type: 'USER_REGISTRATION_SUCCESS'})
          this.props.history.push('/login')
        }, error => {
          console.log(error)
        })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="mt-5 mb-5 ml-3 mr-3">
          <form className="form-signup">
            <h2 className="text-center">SignUp</h2>
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
            <div className={this.state.password.error ? 'form-group text-danger' : 'form-group'}>
              <label htmlFor="password">Password</label>
              <input onChange={this.validatePassword} type="password" className={this.state.password.error ? 'form-control is-invalid' : 'form-control'} id="password" placeholder="Enter password" />
              {this.state.password.error}
            </div>
            <div className={this.state.confirmPassword.error ? 'form-group text-danger' : 'form-group'}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input onChange={this.validateConfirmPassword} type="password" className={this.state.confirmPassword.error ? 'form-control is-invalid' : 'form-control'} id="confirmPassword" placeholder="Enter confirm password" />
              {this.state.confirmPassword.error}
            </div>
            <button onClick={this.validateForm} type="submit" className="btn btn-primary btn-block">SignUp</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(SignUp))
