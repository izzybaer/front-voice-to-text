import React from 'react'
import {connect} from 'react-redux'
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
      </header>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
