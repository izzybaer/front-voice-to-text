import React from 'react'
import {connect} from 'react-redux'
import {Redirect, BrowserRouter, Link, Route} from 'react-router-dom'

import * as util from '../../lib/util.js'
import * as auth from '../../actions/auth-actions.js'

import HeaderContainer from '../header-container'
import AuthContainer from '../auth-container'
import DocumentLandingContainer from '../document-landing-container'
import DocumentActiveContainer from '../document-active-container'
import PasswordChange from '../password-change'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let token = util.cookieFetch('X-VtT-Token')
    if(token)
      this.props.tokenSet(token)
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <main>
            {!this.props.token
              ? <Redirect to='/' />
              : undefined
            }
            <HeaderContainer />
            <Route exact path='/' component={AuthContainer} />
            <Route exact path='/register' component={AuthContainer} />
            <Route exact path='/landing' component={DocumentLandingContainer} />
            <Route exact path='/document/*' component={DocumentActiveContainer} />
            <Route exact path='/changePass' component={PasswordChange} />
          </main>
        </BrowserRouter>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  token: state.token,
})

export const mapDispatchToProps = dispatch => ({
  tokenSet: token => dispatch(auth.tokenSet(token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
