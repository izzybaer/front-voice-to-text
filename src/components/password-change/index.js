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

    if(!this.state.oldPassword || !this.state.newPassword1 || !this.state.newPassword2) {
      this.setState({ errorMsg: 'All fields are required' })
      return
    }
    if(this.state.newPassword1.length < 8) {
      this.setState({ errorMsg: 'Passwords must be at least 8 characters long' })
      return
    }
    if(this.state.newPassword1 !== this.state.newPassword2) {
      this.setState({ errorMsg: 'Passwords don\'t match' })
      return
    }

    this.props.passwordChange(this.state.oldPassword, this.state.newPassword1)
      .then(res => {
        util.log('passchange res', res)
      })
      .catch(err => util.logError('passwordChange errr', err))
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
          required
        />
        <input
          name='new-password-1'
          type='password'
          placeholder='New Password'
          onChange={this.handleChange}
          value={this.state.newPassword1}
          required
        />
        <input
          name='new-password-2'
          type='password'
          placeholder='New Password (Again)'
          onChange={this.handleChange}
          value={this.state.newPassword2}
          required
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
