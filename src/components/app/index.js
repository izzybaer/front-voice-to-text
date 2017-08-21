import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import * as util from '../../lib/util.js'

import HeaderContainer from '../header-container'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='app'>
        <HeaderContainer />
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App)
