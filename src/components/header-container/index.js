import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as util from '../../lib/util.js'

export class HeaderContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <header>
        <h1>Voice To Text</h1>
        <Link to='/'>Home</Link>
      </header>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
