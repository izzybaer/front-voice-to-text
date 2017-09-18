import superagent from 'superagent'
import * as util from '../lib/util.js'

export const tokenSet = token => ({
  type: 'TOKEN_SET',
  payload: token,
})

export const logout = () => {
  util.cookieDelete('X-VtT-Token')
  return { type: 'USER_LOGOUT' }
}

export const loginRequest = credentials => dispatch =>
  superagent.get(`${__API_URL__}/auth`)
    .withCredentials()
    .auth(credentials.username, credentials.password)
    .then(res => {
      util.log('loginRequest', res.text)
      if(res.text) {
        util.cookieCreate('X-VtT-Token', res.text, 2)
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
        util.cookieCreate('X-VtT-Token', res.text, 2)
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

export const userVerifyRequest = () => (dispatch, getState) => {
  let {token} = getState()
  return superagent.post(`${__API_URL__}/verify`)
    .send({token})
    .then(res => {
      util.log('userVerifyRequest', res.body)
      return res
    })
    .catch(err => util.logError('userVerifyRequest', err))
}
