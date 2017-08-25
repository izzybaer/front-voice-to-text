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
    if(!id)
      this.props.history.push('/')
    util.log('url param:', id)
    this.props.documentFetchOne(id)
  }

  render() {
    util.log('props', this.props.document)
    return (
      <div className='document-active-container'>
        {this.props.document
          ? <form onSubmit={this.handleSubmit} name='active-doc'>
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
            <button type='submit'>Save</button>
          </form>
          : undefined
        }
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  document: state.document[0],
})

export const mapDispatchToProps = dispatch => ({
  documentFetchOne: id => dispatch(document.documentFetchOneRequest(id)),
  documentUpdate: document => dispatch(document.documentUpdateRequest(document)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentActiveContainer)
