import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Link, Route} from 'react-router-dom'

import * as util from '../../lib/util.js'

import HeaderContainer from '../header-container'
import DocumentLandingContainer from '../document-landing-container'
import DocumentActiveContainer from '../document-active-container'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <main>
            <HeaderContainer />
            <Route exact path='/' component={DocumentLandingContainer} />
            <Route exact path='/document/*' component={DocumentActiveContainer} />
          </main>
        </BrowserRouter>
      </div>
    )
  }
}

export const mapStateToProps = state => ({

})

export const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App)
