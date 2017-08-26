import React from 'react'
import {connect} from 'react-redux'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'

export class DocumentActiveContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      body: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(event) {
    event.preventDefault()
    let targ = event.target
    let updatedDoc = {
      _id: this.props.match.params[0],
      title: targ.title.value,
      description: targ.description.value,
      body: targ.body.value,
    }
    this.props.documentUpdate(updatedDoc)
      .then(doc => {
        this.props.documentFetchOne(doc.body._id)
      })
  }

  handleChange(event) {
    let {name, value} = event.target
    this.setState({ [name]: value })
    // let updatedDoc = {
    //   ...this.props.document,
    //   [name]: value,
    // }
    // util.log('updatedDoc:', updatedDoc)
    // this.props.documentUpdate(updatedDoc)
  }

  componentWillMount() {
    let id = this.props.match.params[0]
    if(!id)
      this.props.history.push('/')
    util.log('url param:', id)
    this.props.documentFetchOne(id)
      .then(doc => {
        this.setState({...doc.body})
      })
  }

  render() {
    util.log('props', this.state)
    return (
      <div className='document-active-container'>
        {this.props.document
          ? <form onSubmit={this.handleSave} name='active-doc'>
            <input
              name='title'
              type='text'
              placeholder='Title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <input
              name='description'
              type='text'
              placeholder='Description'
              value={this.state.description}
              onChange={this.handleChange}
            />
            <textarea
              name='body'
              placeholder='Document body'
              value={this.state.body}
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
  documentUpdate: newDoc => dispatch(document.documentUpdateRequest(newDoc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentActiveContainer)
