export default (state = '', {type, payload}) => {
  switch(type) {
  case 'TOKEN_SET':
    return payload
  case 'USER_LOGOUT':
    return ''
  default:
    return state
  }
}
