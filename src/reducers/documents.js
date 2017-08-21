let initialState = {}
export default (state = initialState, {type, payload}) => {
  switch(type) {
  case 'DOCUMENT_CREATE':
    return payload
  case 'DOCUMENT_UPDATE':
    return payload
  case 'DOCUMENT_DELETE':
    return initialState
  case 'DOCUMENT_FETCH':
    return payload
  case 'DOCUMENT_RESET':
    return initialState
  default:
    return state
  }
}
