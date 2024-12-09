import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  managePassword = () => {
    this.setState(prev => ({showPassword: !prev.showPassword}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt-token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
      this.setState({username: '', password: ''})
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showSubmitError,
      errorMsg,
      showPassword,
    } = this.state

    const jwtToken = Cookies.get('jwt-token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="logincon">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <h1>LOGIN</h1>
          <label htmlFor="user" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={this.onChangeUsername}
            className="inputtext"
          />
          <label className="label" htmlFor="password">
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
              onChange={this.managePassword}
              id="pass"
              className="check"
            />
            <label htmlFor="pass" className="sp">
              Show Password
            </label>
          </div>
          <button className="btn" type="submit">
            Login
          </button>

          {showSubmitError && <p className="err-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginPage
