import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

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

  handleDocumentCreate(doc) {
    this.props.documentCreate(doc)
      .then(document => {
        this.props.history.push(`/document/${document.body._id}`)
      })
  }

  render() {
    return (
      <div className='document-landing-container'>
        {!this.props.token
          ? <Redirect to='/' />
          : undefined
        }
        <DocumentCreateForm handleComplete={this.handleDocumentCreate} />
        <DocumentBrowseContainer />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  token: state.token,
})

export const mapDispatchToProps = dispatch => ({
  documentCreate: doc => dispatch(document.documentCreateRequest(doc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentLandingContainer)
