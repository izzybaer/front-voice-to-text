import React from 'react'

export class DocumentBrowseContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  render() {
    return (
      <div className='document-browse-container'>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  documents: state.documents,
})

const mapDispatchToProps = dispatch => ({
  documentsFetch: () => dispatch(document.fetchAll),
})
