let initialState = []
export default (state = initialState, {type, payload}) => {
  switch(type) {
  case 'document_CREATE':
    return [...state, payload]
  case 'DICTATION_UPDATE':
    return state.map(document =>
      document.id == payload.id ? payload : document)
  case 'DICTATION_DELETE':
    return state.filter(document => document._id !== payload)
  case 'document_FETCH':
    return payload
  case 'DOCUMENT_RESET':
    return initialState
  default:
    return state
  }
}
