import React from 'react'

export class SpeakToMe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // lang: 'en-US',
      // voice: null,
      // pitch: 1.5, // 0-2
      // rate: 0.5, // 0.1-10
      // volume: 1, // 0-1
    }

    this.handleSpeak = this.handleSpeak.bind(this)
  }

  handleSpeak(event) {
    event.preventDefault()
    this.props.speak(this.state)
  }

  render() {
    return (
      <button
        name='speak-to-me'
        onClick={this.handleSpeak}
      >Read to me</button>
    )
  }
}

export default SpeakToMe
