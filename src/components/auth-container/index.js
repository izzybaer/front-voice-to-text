import React from 'react'
import {connect} from 'react-redux'

import * as auth from '../../actions/auth-actions.js'

export class AuthContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      method: 'login',
      displayName: '',
      username: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(event) {
    let {name, value} = event.target
    this.setState({ [name]: value })
  }

  handleLogin(event) {
    event.preventDefault()

  }

  handleRegister(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className='auth-container'>
        <form onSubmit={this.state.method === 'login' ? this.handleLogin : this.handleRegister}>
          <input
            name='username'
            type='text'
            placeholder='Username'
            onChange={this.handleChange}
          />

          {this.state.method === 'register'
            ? <input
              name='displayName'
              type='text'
              placeholder='Display Name'
              onChange={this.handleChange}
            />
            : undefined}

          <input
            name='password'
            type='password'
            placeholder='Password'
            onChange={this.handleChange}
          />

          <button
            name='auth-button'
            type='submit'
          >
            {this.state.method === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
