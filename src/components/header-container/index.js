import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as util from '../../lib/util.js'
import * as auth from '../../actions/auth-actions.js'

export class HeaderContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
    }

    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillUpdate(props) {
    if(!this.state.username) {
      let username = util.cookieFetch('X-VtT-Username')
      if(username)
        this.setState({username})
    }
  }

  handleLogout(event) {
    event.preventDefault()
    this.props.logout()
  }

  render() {
    return (
      <header>
        <h1>Voice To Text</h1>
        {this.props.token
          ? <p>Hi {this.state.username}!</p>
          : undefined
        }
        <Link to='/'>Home</Link>
        {this.props.token
          ? <Link to='/changePass'>Change Password</Link>
          : undefined}
        {this.props.token
          ? <Link to='' onClick={this.handleLogout}>Logout</Link>
          : undefined}
      </header>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(auth.logout()),
  userInfo: token => dispatch(auth.userVerifyRequest(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
