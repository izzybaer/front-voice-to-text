import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import * as util from '../../lib/util.js'
import * as auth from '../../actions/auth-actions.js'

export class PasswordChange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      errorMsg: '',
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

    if(!this.state.oldPassword || !this.state.newPassword || !this.state.newPassword2) {
      this.setState({ errorMsg: 'All fields are required', oldPassword: '', newPassword: '', newPassword2: '' })
      return
    }
    if(this.state.oldPassword === this.state.newPassword || this.state.oldPassword === this.state.newPassword2) {
      this.setState({ errorMsg: 'Old and new passwords must be different', oldPassword: '', newPassword: '', newPassword2: '' })
      return
    }
    if(this.state.newPassword.length < 8) {
      this.setState({ errorMsg: 'Passwords must be at least 8 characters long', oldPassword: '', newPassword: '', newPassword2: '' })
      return
    }
    if(this.state.newPassword !== this.state.newPassword2) {
      this.setState({ errorMsg: 'Passwords don\'t match', oldPassword: '', newPassword: '', newPassword2: '' })
      return
    }

    this.props.passwordChange(this.state.oldPassword, this.state.newPassword, this.state.newPassword2)
      .then(res => {
        util.log('passchange res', res)
      })
      .catch(err => util.logError('passwordChange err', err))
  }

  render() {
    return (
      <form className='password-change' onSubmit={this.handlePassChange}>
        {!this.props.token
          ? <Redirect to='/' />
          : undefined
        }
        <input
          name='oldPassword'
          type='password'
          placeholder='Current Password'
          onChange={this.handleChange}
          value={this.state.oldPassword}
          required
        />
        <input
          name='newPassword'
          type='password'
          placeholder='New Password'
          onChange={this.handleChange}
          value={this.state.newPassword}
          required
        />
        <input
          name='newPassword2'
          type='password'
          placeholder='New Password (Again)'
          onChange={this.handleChange}
          value={this.state.newPassword2}
          required
        />
        {this.state.errorMsg ? <p className='error-message'>Error: {this.state.errorMsg}</p> : undefined}
        <button
          name='submit-new-pass'
          type='submit'
        >Change Password</button>
      </form>
    )
  }
}

export const mapStateToProps = state => ({
  token: state.token,
})

export const mapDispatchToProps = dispatch => ({
  passwordChange: (oldPassword, newPassword, newPassword2) => dispatch(auth.passwordChangeRequest(oldPassword, newPassword, newPassword2)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange)
