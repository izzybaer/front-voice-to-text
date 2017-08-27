import React from 'react'
import {connect} from 'react-redux'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/theme/monokai'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'

import VoiceRecognitionContainer from '../voice-recognition-container'

export class DocumentActiveContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      body: '',
      temp: '',
      direction: 'down',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleVoiceResults = this.handleVoiceResults.bind(this)
    this.handleDirectionChange = this.handleDirectionChange.bind(this)
  }

  handleDirectionChange(event) {
    event.preventDefault()
    this.setState(state => ({
      direction: state.direction === 'down'
        ? 'up'
        : 'down',
    }))
  }

  handleSave(event) {
    event.preventDefault()
    let updatedDoc = {
      _id: this.props.match.params[0],
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
    }
    this.props.documentUpdate(updatedDoc)
      .then(doc => {
        this.props.documentFetchOne(doc.body._id)
      })
  }

  handleChange(event) {
    if(event.target) {
      let {name, value} = event.target
      this.setState({ [name]: value })
    } else
      this.setState({ body: event })
    // let updatedDoc = {
    //   ...this.props.document,
    //   [name]: value,
    // }
    // util.log('updatedDoc:', updatedDoc)
    // this.props.documentUpdate(updatedDoc)
  }

  handleVoiceResults(final, temp) {
    util.log('final', final)
    util.log('temp', temp)

    this.setState({
      body: `${this.state.body}${final}`,
      temp: temp,
    })
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.temp == this.state.temp)
      return false
    // if(this.props.edits && this.props.edits.length > 0) {
    //   let edits = this.props.edits[this.props.edits.length - 1];
    //   this.setState({
    //     final: edits.body,
    //     title: edits.title,
    //     description: edits.description,
    //   });
    // }
    return true
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
        <VoiceRecognitionContainer handleVoiceResults={this.handleVoiceResults} />
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
            <AceEditor
              mode='text'
              theme="monokai"
              maxLines={Infinity}
              name='body'
              width='100%'
              fontSize='16px'
              wrapEnabled={true}
              placeholder='Document body'
              value={this.state.body}
              onChange={this.handleChange}
              showGutter={false}
              showPrintMargin={false}
              editorProps={{$blockScrolling: true}}
            />
            <p name='temp-text'>{this.state.temp}</p>
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
