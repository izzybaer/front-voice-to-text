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

export const documentFetchOne = document => ({
  type: 'DOCUMENT_FETCH_ONE',
  payload: document,
})

export const documentFetchAll = documents => ({
  type: 'DOCUMENT_FETCH_ALL',
  payload: documents,
})

export const documentReset = () => ({
  type: 'DOCUMENT_RESET',
})

export const documentCreateRequest = document => dispatch =>
  superagent.post(`${__API_URL__}/document`)
    .send(document)
    .then(res => {
      util.log('documentCreateRequest', res.body)
      dispatch(documentCreate(res.body))
      return res
    })
    .catch(err => util.logError('documentCreateRequest', err))

export const documentUpdateRequest = document => dispatch =>
  superagent.put(`${__API_URL__}/document/${document._id}`)
    .send(document)
    .then(res => {
      util.log('documentUpdateRequest', res.body)
      dispatch(documentUpdate(res.body))
      return res
    })
    .catch(err => util.logError('documentUpdateRequest', err))

export const documentDeleteRequest = id => dispatch =>
  superagent.delete(`${__API_URL__}/document/${document._id}`)
    .then(res => {
      util.log('documentDeleteRequest', res)
      dispatch(documentDelete())
      return res
    })
    .catch(err => util.logError('documentDeleteRequest', err))

export const documentFetchOneRequest = id => dispatch =>
  superagent.get(`${__API_URL__}/document/${id}`)
    .then(res => {
      util.log('documentFetchOneRequest', res.body)
      dispatch(documentFetchOne(res.body))
      return res
    })
    .catch(err => util.logError('documentFetchOneRequest', err))

export const documentFetchAllRequest = () => dispatch =>
  superagent.get(`${__API_URL__}/document`)
    .then(res => {
      util.log('documentFetchAllRequest', res.body)
      dispatch(documentFetchAll(res.body))
      return res
    })
    .catch(err => util.logError('documentFetchAllRequest', err))
