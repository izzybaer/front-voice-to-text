import React from 'react'
import {connect} from 'react-redux'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'

export class DocumentActiveContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let {name, value} = event.target
    let updatedDoc = {
      ...this.props.document,
      [name]: value,
    }
    util.log('updatedDoc:', updatedDoc)
    this.props.documentUpdate(updatedDoc)
  }

  componentWillMount() {
    let id = this.props.match.params[0]
    util.log('url param:', id)
    this.props.documentFetch(id)
  }

  render() {
    return (
      <div className='document-active-container'>
        <input
          name='title'
          type='text'
          placeholder='Title'
          value={this.props.document.title}
          onChange={this.handleChange}
        />
        <input
          name='description'
          type='text'
          placeholder='Description'
          value={this.props.document.description}
          onChange={this.handleChange}
        />
        <textarea
          name='body'
          placeholder='Document body'
          value={this.props.document.body}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  document: state.document,
})

export const mapDispatchToProps = dispatch => ({
  documentFetch: id => dispatch(document.documentFetchRequest(id)),
  documentUpdate: document => dispatch(document.documentUpdateRequest(document)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentActiveContainer)
