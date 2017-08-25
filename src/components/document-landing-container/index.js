import React from 'react'
import {connect} from 'react-redux'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'
import DocumentCreateForm from '../document-create-form'
import DocumentBrowseContainer from '../document-browse-container'

export class DocumentLandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
    }

    this.handleDocumentCreate = this.handleDocumentCreate.bind(this)
  }

  componentWillMount() {
    this.props.documentsFetchAll()
  }

  componentWillUpdate() {
    this.props.document.length > 1
      ? this.props.documentsFetchAll()
      : undefined
  }

  handleDocumentCreate(doc) {
    this.props.documentCreate(doc)
      .then(() => {
        this.props.history.push(`/document/${this.props.document._id}`)
      })
  }

  render() {
    return (
      <div className='document-landing-container'>
        <DocumentCreateForm handleComplete={this.handleDocumentCreate} />
        <DocumentBrowseContainer allDocs={this.props.document} />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  document: state.document,
})

export const mapDispatchToProps = dispatch => ({
  documentCreate: doc => dispatch(document.documentCreateRequest(doc)),
  documentsFetchAll: () => dispatch(document.documentFetchAllRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentLandingContainer)
