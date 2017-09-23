import superagent from 'superagent'
import * as util from '../lib/util.js'

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const logout = () => ({
  type: 'USER_LOGOUT',
})

export const logoutRequest = () => (dispatch, getState) => {
  let {token} = getState()
  return superagent.get(`${__API_URL__}/logout`)
    .set('Authorization', `Bearer ${token}`)
    .then(res => {
      util.log('logoutRequest', token)
      util.cookieDelete('X-VtT-Username')
      dispatch(logout())
      return res
    })
    .catch(err => util.logError('logoutRequest', err))
}

export const loginRequest = credentials => dispatch =>
  superagent.get(`${__API_URL__}/auth`)
    .withCredentials()
    .auth(credentials.username, credentials.password)
    .then(res => {
      util.log('loginRequest', res.text)
      if(res.text) {
        util.cookieCreate('X-VtT-Username', credentials.username, 1)
        dispatch(tokenSet(res.text))
      }
      return res
    })
    .catch(err => util.logError('loginRequest', err))

export const registerRequest = credentials => dispatch =>
  superagent.post(`${__API_URL__}/auth`)
    .withCredentials()
    .send(credentials)
    .then(res => {
      util.log('registerRequest', res.text)
      if(res.text) {
        util.cookieCreate('X-VtT-Username', credentials.username, 1)
        dispatch(tokenSet(res.text))
      }
      return res
    })
    .catch(err => util.logError('registerRequest', err))

export const passwordChangeRequest = (oldPassword, newPassword) => (dispatch, getState) => {
  let {token} = getState()
  return superagent.put(`${__API_URL__}/auth`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      oldPassword,
      newPassword,
    })
    .then(res => {
      util.log('passwordChangeRequest', res.text)
      return res
    })
    .catch(err => util.logError('passwordChangeRequest', err))
}
