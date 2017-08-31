import React from 'react'

export class AuthContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      method: 'login',
      displayName: '',
      username: '',
      password: '',
    }
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
            {this.props.method === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    )
  }
}
