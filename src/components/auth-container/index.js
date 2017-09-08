import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'

import * as util from '../../lib/util.js'
import * as auth from '../../actions/auth-actions.js'

export class AuthContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      username: '',
      password: '',
      errorMsg: '',
      rememberUsername: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleRemember = this.handleRemember.bind(this)
  }

  componentWillMount() {

  }

  handleChange(event) {
    let {name, value} = event.target
    this.setState({ [name]: value })
  }

  handleLogin(event) {
    event.preventDefault()
    if(this.state.rememberUsername && !util.cookieFetch('X-Username'))
      util.cookieCreate('X-Username', this.state.username)
    this.props.login(this.state)
  }

  handleRegister(event) {
    event.preventDefault()

    if(this.state.password.length < 8) {
      this.setState({ errorMsg: 'Passwords must be at least 8 characters long', oldPassword: '', newPassword1: '', newPassword2: '' })
      return
    }

    this.props.register(this.state)
  }

  handleRemember(event) {
    event.preventDefault()
    this.setState({ rememberUsername: !this.state.rememberUsername })
  }

  render() {
    let rememberedUser = util.cookieFetch('X-Username')
    util.log(rememberedUser)
    if(rememberedUser && this.state.username === '') {
      util.log('inside')
      this.setState({ username: rememberedUser, rememberUsername: true })
    }
    util.log('will mount')
    let method = this.props.match.path
    return (
      <div className='auth-container'>
        {this.props.token
          ? <Redirect to='/landing' />
          : undefined
        }
        <Link to='/'>Login</Link>
        <Link to='/register'>Register</Link>
        <form onSubmit={method === '/register' ? this.handleRegister : this.handleLogin}>
          <input
            name='username'
            type='text'
            placeholder='Username'
            onChange={this.handleChange}
            value={this.state.username}
          />
          {method === '/register'
            ? <input
              name='displayName'
              type='text'
              placeholder='Display Name'
              onChange={this.handleChange}
              value={this.state.displayName}
            />
            : undefined}
          <input
            name='password'
            type='password'
            placeholder='Password'
            onChange={this.handleChange}
            value={this.state.password}
          />
          <label className='check-box-wrapper' htmlFor='rememberUsername' onClick={this.handleRemember}>
            <input
              name='rememberUsername'
              type='checkbox'
              checked={this.state.rememberUsername}
            />
            Remember Username
          </label>
          {method === '/register' ? <p>Passwords must be at least 8 characters long</p> : undefined}
          {this.state.errorMsg ? <p className='error-message'>Error: {this.state.errorMsg}</p> : undefined}
          <button
            name='auth-button'
            type='submit'
          >
            {method === '/register' ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
})

const mapDispatchToProps = dispatch => ({
  login: token => dispatch(auth.loginRequest(token)),
  register: token => dispatch(auth.registerRequest(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
