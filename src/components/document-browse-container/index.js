import React from 'react'
import {connect} from 'react-redux'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'

export class DocumentBrowseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  componentWillMount() {
    this.props.documentsFetchAll()
      .then(() => {

      })

  }

  render() {
    util.log(this.props.documents)
    return (
      <ul className='document-browse-container'>

      </ul>
    )
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
})

const mapDispatchToProps = dispatch => ({
  documentsFetchAll: () => dispatch(document.documentFetchAllRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentBrowseContainer)
