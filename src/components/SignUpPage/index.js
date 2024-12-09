import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class SignupPage extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    errorMsg: '',
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {name, email, password, confirmPassword} = this.state
    if (password !== confirmPassword) {
      this.setState({errorMsg: 'Passwords do not match'})
    } else {
      // API call to create a new user
      const url = 'http://localhost:5000/api/auth/register'
      const options = {
        method: 'POST',
        body: JSON.stringify({name, email, password}),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.setState({errorMsg: ''})
        // Navigate to login page
        this.props.history.push('/login')
      } else {
        this.setState({errorMsg: data.error_msg})
      }
    }
  }

  render() {
    const {
      name,
      email,
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      errorMsg,
    } = this.state

    return (
      <div className="logincon">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <h1>SIGNUP</h1>
          <label htmlFor="name" className="label">
            NAME
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.onChangeName}
            className="inputtext"
          />
          <label htmlFor="email" className="label">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.onChangeEmail}
            className="inputtext"
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChangePassword}
            className="inputtext"
          />
          <div className="show-password-con">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                this.setState(prev => ({showPassword: !prev.showPassword}))
              }
              id="pass"
              className="check"
            />
            <label htmlFor="pass" className="sp">
              Show Password
            </label>
          </div>
          <label htmlFor="confirmPassword" className="label">
            CONFIRM PASSWORD
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={this.onChangeConfirmPassword}
            className="inputtext"
          />
          <div className="show-password-con">
            <input
              type="checkbox"
              checked={showConfirmPassword}
              onChange={() =>
                this.setState(prev => ({
                  showConfirmPassword: !prev.showConfirmPassword,
                }))
              }
              id="confirmPass"
              className="check"
            />

            <label htmlFor="confirmPass" className="sp">
              Show Confirm Password
            </label>
          </div>
          <button className="btn" type="submit">
            Signup
          </button>
          {errorMsg && <p className="err-msg">{errorMsg}</p>}
          <p className="signup-text">
            Already have an account?{' '}
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    )
  }
}

export default SignupPage
