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
      password1: '',
      errorMsg: '',
      rememberUsername: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleRemember = this.handleRemember.bind(this)
  }

  componentWillMount() {
    let rememberedUser = util.cookieFetch('X-Username')
    util.log(rememberedUser)
    if(rememberedUser && this.state.username === '') {
      util.log('inside')
      this.setState({ username: rememberedUser, rememberUsername: true })
    }
    util.log('will mount')
  }

  handleChange(event) {
    let {name, value} = event.target
    this.setState({ [name]: value })
  }

  handleLogin(event) {
    event.preventDefault()

    if(!this.state.username || !this.state.password1) {
      this.setState({ errorMsg: 'All fields are required', username: '', password1: '', rememberUsername: false })
    }

    if(this.state.rememberUsername && !util.cookieFetch('X-Username'))
      util.cookieCreate('X-Username', this.state.username)
    if(!this.state.rememberUsername && util.cookieFetch('X-Username'))
      util.cookieDelete('X-Username')
    this.props.login(this.state)
  }

  handleRegister(event) {
    event.preventDefault()

    if(!this.state.username || !this.state.displayName || !this.state.password1 || !this.state.password2) {
      this.setState({ errorMsg: 'All fields are required', username: '', displayName: '', newPassword1: '', newPassword2: '' })
      return
    }
    if(this.state.password1.length < 8) {
      this.setState({ errorMsg: 'Passwords must be at least 8 characters long', password1: '', password2: '' })
      return
    }
    if(this.state.password1 !== this.state.password2) {
      this.setState({ errorMsg: 'Passwords don\'t match', password1: '', password2: '' })
      return
    }

    this.props.register(this.state)
  }

  handleRemember(event) {
    this.setState({ rememberUsername: !this.state.rememberUsername })
  }

  render() {
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
            required
          />
          {method === '/register'
            ? <input
              name='displayName'
              type='text'
              placeholder='Display Name'
              onChange={this.handleChange}
              value={this.state.displayName}
              required
            />
            : undefined}
          <input
            name='password1'
            type='password'
            placeholder='Password'
            onChange={this.handleChange}
            value={this.state.password1}
            required
          />
          {method === '/register'
            ? <input
              name='password2'
              type='password'
              placeholder={'Password (again)'}
              onChange={this.handleChange}
              value={this.state.password2}
              required
            />
            : undefined
          }
          {method !== '/register'
            ? <span>
              <input
                id='rememberUsername'
                name='rememberUsername'
                type='checkbox'
                onChange={this.handleRemember}
                checked={this.state.rememberUsername}
                value='asdasds'
              />
              <label className='check-box-wrapper' htmlFor='rememberUsername'>
                Remember Username
              </label>
            </span>
            : undefined}
          {method === '/register'
            ? <div className='account-rules'>
              <p>Display Name can only contain letters (a-z & A-Z) and numbers (0-9)</p>
              <p>Passwords must be at least 8 characters long</p>
            </div>
            : undefined}
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
