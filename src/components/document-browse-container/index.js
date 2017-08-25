import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'

export class DocumentBrowseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(id) {
    this.props.documentDelete(id)
  }

  render() {
    util.log('render',this.props.allDocs)
    return (
      <div className='document-browse-container'>
        <h3>Browse All Documents</h3>
        <ul className='document-browse-list'>
          {Object.keys(this.props.allDocs).length > 0
            ? this.props.allDocs.map((doc, i) =>
              <li key={i}>
                <button onClick={() => this.handleDelete(doc._id)}>X</button>
                <Link to={`/document/${doc._id}`}>{doc.title} - {doc.description}</Link>
              </li>)
            : undefined
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allDocs: state.document,
})

const mapDispatchToProps = dispatch => ({
  documentDelete: id => dispatch(document.documentDeleteRequest(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentBrowseContainer)
