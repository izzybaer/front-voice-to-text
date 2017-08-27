import React from 'react'
import {connect} from 'react-redux'
import superagent from 'superagent'


import * as util from '../../lib/util.js'

export class VoiceRecognitionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recognition: null,
      listening: false,
      finalTranscript: '',
      tempTranscript: '',
    }

    this.handleListenStart = this.handleListenStart.bind(this)
    this.handleListenStop = this.handleListenStop.bind(this)
    this.handleResults = this.handleResults.bind(this)
  }

  componentWillMount() {
    let recognition = new webkitSpeechRecognition()
    recognition.lang = 'english'
    recognition.continuous = true
    recognition.interimResults = true
    recognition.onstart = () => {
      util.log('RECOGNITION START')
      this.setState({ listening: true })
    }
    recognition.onerror = (event) => {
      util.log(event.error)
    }
    recognition.onend = () => {
      if(this.state.listening) {
        this.state.recognition.start()
        return
      }
      util.log('RECOGNITION STOP')
      this.setState({ listening: false })
    }
    recognition.onresult = (event) => {
      this.setState({ tempTranscript: '', finalTranscript: '' })
      if(typeof(event.results) == 'undefined') {
        this.state.recognition.stop()
        // upgrade your browser
        return
      }

      for(let i = event.resultIndex; i < event.results.length; ++i) {
        if(event.results[i].isFinal) {
          this.setState(state => ({ finalTranscript: `${event.results[i][0].transcript}\n` }))
          this.handleResults(this.state.finalTranscript, this.state.tempTranscript)

          // let capitalizedFinal = this.capitalize(`${this.state.finalTranscript}${event.results[i][0].transcript}\n`)
          // superagent.post(`https://api.textgears.com/check.php?text=${encodeURI(capitalizedFinal)}&key=OZnZEAWpA377Y6S4`)
          //   .then(res => {
          //     util.log('GRAMMER', res.body)
          //     if(res.body.errors.length > 0)
          //       res.body.errors.forEach(err => {
          //         let firstHalf = capitalizedFinal.slice(0, err.offset)
          //         let lastHalf = capitalizedFinal.slice(err.offset + err.length)
          //         capitalizedFinal = `${firstHalf}${err.better[0]}${lastHalf}`
          //       })
          //     this.setState(state => ({ finalTranscript: capitalizedFinal }))
          //     this.handleResults(this.state.finalTranscript, this.state.tempTranscript)
          //   })
          //   .catch(err => {
          //     this.setState(state => ({ finalTranscript: capitalizedFinal }))
          //     this.handleResults(this.state.finalTranscript, this.state.tempTranscript)
          //   })
        } else {
          this.setState(state => ({tempTranscript: state.tempTranscript += event.results[i][0].transcript}))

          this.handleResults(this.state.finalTranscript, this.state.tempTranscript)
        }
      }

      // comment next out if api is enabled
      this.setState(state => ({finalTranscript: this.capitalize(state.finalTranscript)}))
      // final_span.innerHTML = linebreak(final_transcript)
      // interim_span.innerHTML = linebreak(interim_transcript)

    }

    this.setState({ recognition })
  }

  handleResults(final, temp) {
    this.props.handleVoiceResults(final, temp)
  }

  capitalize(s) {
    let first_char = /\S/
    return s.replace(first_char, function(m) { return m.toUpperCase() })
  }

  handleListenStart(event) {
    event.preventDefault()
    if (!('webkitSpeechRecognition' in window)) {
      // tell user to update browser
    } else {
      // if (window.getSelection) {
      //   window.getSelection().removeAllRanges()
      //   var range = document.createRange()
      //   range.selectNode(document.getElementById('final_span'))
      //   window.getSelection().addRange(range)
      // }
      util.log(this.state)
      this.state.recognition.start()
    }
  }

  handleListenStop(event) {
    event.preventDefault()

    this.setState({ listening: false })
    this.state.recognition.stop()
  }

  render() {
    return (
      <form className='voice-recognition-container'>
        <button
          name='start-listening'
          disabled={this.state.listening ? true : false}
          onClick={this.handleListenStart}
        >Start Listening</button>
        <button
          name='stop-listening'
          disabled={this.state.listening ? false : true}
          onClick={this.handleListenStop}
        >Stop Listening</button>
      </form>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(VoiceRecognitionContainer)
