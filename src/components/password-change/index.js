import React from 'react'
import {connect} from 'react-redux'

import * as util from '../../lib/util.js'
import * as auth from '../../actions/auth-actions.js'

export class PasswordChange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
  }

  handleChange(event) {
    let {name, value} = event.target
    this.setState({
      [name]: value,
    })
  }

  handlePassChange(event) {
    event.preventDefault()

  }

  render() {
    return (
      <form className='password-change' onSubmit={this.handlePassChange}>
        <input
          name='old-password'
          type='password'
          placeholder='Current Password'
          onChange={this.handleChange}
          value={this.state.oldPassword}
        />
        <input
          name='new-password-1'
          type='password'
          placeholder='New Password'
          onChange={this.handleChange}
          value={this.state.newPassword1}
        />
        <input
          name='new-password-2'
          type='password'
          placeholder='New Password (Again)'
          onChange={this.handleChange}
          value={this.state.newPassword2}
        />
        <button
          name='submit-new-pass'
          type='submit'
        >Change Password</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
})

const mapDispatchToProps = dispatch => ({
  passwordChange: (oldPassword, newPassword) => dispatch(auth.passwordChangeRequest(oldPassword, newPassword)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange)
