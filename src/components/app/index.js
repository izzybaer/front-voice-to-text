import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter, Link, Route} from 'react-router-dom'
import * as util from '../../lib/util.js'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <main className='app'>

      </main>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App)
