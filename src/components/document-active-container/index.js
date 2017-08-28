import React from 'react'
import {connect} from 'react-redux'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/theme/monokai'

import * as util from '../../lib/util.js'
import * as document from '../../actions/document-actions.js'
import * as edit from '../../actions/edit-actions.js'

import VoiceRecognitionContainer from '../voice-recognition-container'
import SpeakToMe from '../speak-to-me'

export class DocumentActiveContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      body: '',
      temp: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleVoiceResults = this.handleVoiceResults.bind(this)
    this.handleSpeak = this.handleSpeak.bind(this)
  }

  handleSave() {
    let updatedDoc = {
      _id: this.props.match.params[0],
      title: this.state.title,
      description: this.state.description,
      body: this.state.body,
    }
    this.props.documentUpdate(updatedDoc)
  }

  handleChange(event) {
    if(event.target) {
      let {name, value} = event.target
      // let update = {
      //   _id: this.props.match.params[0],
      //   [name]: value,
      // }
      // this.props.documentUpdate(update)
      this.setState({ [name]: value })
    } else{
      // let update = {
      //   _id: this.props.match.params[0],
      //   body: event,
      // }
      // this.props.documentUpdate(update)
      this.setState({ body: event })
    }
    this.handleSave()
  }

  handleVoiceResults(final, temp) {
    util.log('final', final)
    util.log('temp', temp)

    // let update = {
    //   body: `${this.props.latestEdit.body}${final}`,
    // }
    // this.props.documentUpdate(update)
    //
    // this.setState({ temp })

    this.setState({
      body: `${this.state.body}${final}`,
      temp: temp,
    })
    this.handleSave()
  }

  handleSpeak(settings) {
    // let synth = window.speechSynthesis

    let speech = new SpeechSynthesisUtterance(this.state.body)

    // util.log('synth', synth)
    util.log('speech', speech)

    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1

    // if(settings.lang)
    //   speech.lang = settings.lang
    // if(settings.volume)
    //   speech.volume = settings.volume
    // if(settings.voice)
    //   speech.voice = settings.voice
    // if(settings.pitch)
    //   speech.pitch = settings.pitch
    // if(settings.rate)
    //   speech.rate = settings.rate

    window.speechSynthesis.speak(speech)

    // util.log('synth after', synth)
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.temp == this.state.temp)
      return false
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
    // util.log('props', this.state)
    return (
      <div className='document-active-container'>
        <h4>Your document will auto-save on any change to it.</h4>
        <VoiceRecognitionContainer handleVoiceResults={this.handleVoiceResults} />
        <SpeakToMe speak={this.handleSpeak} />
        <form name='active-doc'>
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
        </form>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  document: state.document[0],
  // latestEdit: state.edit,
})

export const mapDispatchToProps = dispatch => ({
  documentFetchOne: id => dispatch(document.documentFetchOneRequest(id)),
  documentUpdate: newDoc => dispatch(document.documentUpdateRequest(newDoc)),
  // documentUpdate: newDoc => dispatch(edit.edit(newDoc)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentActiveContainer)
