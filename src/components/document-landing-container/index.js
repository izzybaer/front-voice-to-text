import React from 'react'
import {connect} from 'react-redux'

import * as util from '../../lib/util.js'

export class DocumentLandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className='document-landing-container'>

      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentLandingContainer)
