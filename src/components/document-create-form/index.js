import React from 'react'

class DocumentCreateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleComplete(this.state)
  }

  render() {
    return (
      <form className='create-doc' onSubmit={this.handleSubmit}>
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
    )
  }
}

export default DocumentCreateForm
