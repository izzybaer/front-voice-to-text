import React from 'react'
import {connect} from 'react-redux'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'

export class DocumentLandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleDocumentCreate = this.handleDocumentCreate.bind(this)
  }

  handleChange(event) {
    let {name, value} = event.target
    this.setState({[name]: value})
  }

  handleDocumentCreate(event) {
    event.preventDefault()

    this.props.documentCreate({
      title: event.target.title.value,
      description: event.target.description.value,
    })
      .then(() => {
        this.props.history.push(`/document/${this.props.document._id}`)
      })
  }

  render() {
    return (
      <div className='document-landing-container'>
        <form className='create-doc' onSubmit={this.handleDocumentCreate}>
          <h3>New Document</h3>
          <input
            name='title'
            type='text'
            value={this.state.title}
            onChange={this.handleChange}
            placeholder='Title'
            required
          />
          <input
            name='description'
            type='text'
            value={this.state.description}
            onChange={this.handleChange}
            placeholder='Description'
            required
          />
          <button type='submit'>New Document</button>
        </form>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  document: state.document,
})

export const mapDispatchToProps = dispatch => ({
  documentCreate: doc => dispatch(document.documentCreateRequest(doc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentLandingContainer)
