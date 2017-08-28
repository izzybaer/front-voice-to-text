export default (state = {}, {type, payload}) => {
  switch(type) {
  case 'EDIT':
    return payload
  default:
    return state
  }
}
