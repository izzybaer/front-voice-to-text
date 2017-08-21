import superagent from 'superagent'
import * as util from '../lib/util.js'

export const documentCreate = document => ({
  type: 'DOCUMENT_CREATE',
  payload: document,
})

export const documentUpdate = document => ({
  type: 'DOCUMENT_UPDATE',
  payload: document,
})

export const documentDelete = () => ({
  type: 'DOCUMENT_DELETE',
})

export const documentFetch = document => ({
  type: 'DOCUMENT_FETCH',
  payload: document,
})

export const documentReset = () => ({
  type: 'DOCUMENT_RESET',
})

export const documentCreateRequest = document => dispatch =>
  superagent.post(`${__API_URL__}/documents`)
    .send(document)
    .then(res => {
      util.log('documentCreateRequest', res.body)
      dispatch(documentCreate(res.body))
      return res
    })
    .catch(err => util.logError('documentCreateRequest', err))

export const documentUpdateRequest = document => dispatch =>
  superagent.put(`${__API_URL__}/documents/${document._id}`)
    .send(document)
    .then(res => {
      util.log('documentUpdateRequest', res.body)
      dispatch(documentUpdate(res.body))
      return res
    })
    .catch(err => util.logError('documentUpdateRequest', err))

export const documentDeleteRequest = id => dispatch =>
  superagent.delete(`${__API_URL__}/documents/${document._id}`)
    .then(res => {
      util.log('documentDeleteRequest', res)
      dispatch(documentDelete())
      return res
    })
    .catch(err => util.logError('documentDeleteRequest', err))

export const documentFetchRequest = id => dispatch =>
  superagent.get(`${__API_URL__}/documents/${id}`)
    .then(res => {
      util.log('documentFetchRequest', res.body)
      dispatch(documentFetch(res.body))
      return res
    })
    .catch(err => util.logError('documentFetchRequest', err))
