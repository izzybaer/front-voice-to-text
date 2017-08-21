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
    this.props.documentUpdate(updatedDoc)
  }

  componentWillMount() {
    let id = this.props.history.location.pathname.split('/')[2]
    this.props.documentFetch(id)
  }

  render() {
    return (
      <div className='document-active-container'>
        <input
          name='title'
          type='text'
          value={this.props.document.title}
          onChange={this.handleChange}
        />
        <input
          name='description'
          type='text'
          value={this.props.document.description}
          onChange={this.handleChange}
        />
        <textarea
          name='body'
          value={this.props.document.body}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  document: state.document,
})

const mapDispatchToProps = dispatch => ({
  documentFetch: id => dispatch(document.documentFetchRequest(id)),
  documentUpdate: document => dispatch(document.documentUpdateRequest(document)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentActiveContainer)
