import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'

export class DocumentBrowseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    util.log('render',this.props.allDocs)
    return (
      <ul className='document-browse-container'>
        {Object.keys(this.props.allDocs).length > 0
          ? this.props.allDocs.map((doc, i) =>
            <li key={i}><Link to={`/document/${doc._id}`}>{doc.title} - {doc.description}</Link></li>)
          : undefined
        }
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  allDocs: state.document,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentBrowseContainer)
