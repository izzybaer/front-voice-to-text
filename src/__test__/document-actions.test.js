import * as document from '../actions/document-actions.js'

describe('Testing document actions', () => {

  test('documentCreate', () => {
    let dummyDoc = {
      doesnt: 'matter',
    }
    let result = document.documentCreate(dummyDoc)
    expect(result.type).toEqual('DOCUMENT_CREATE')
    expect(result.payload).toEqual(dummyDoc)
  })

  test('documentUpdate', () => {
    let dummyDoc = {
      doesnt: 'matter',
    }
    let result = document.documentUpdate(dummyDoc)
    expect(result.type).toEqual('DOCUMENT_UPDATE')
    expect(result.payload).toEqual(dummyDoc)
  })

  test('documentDelete', () => {
    let id = 123
    let result = document.documentDelete(id)
    expect(result.type).toEqual('DOCUMENT_DELETE')
    expect(result.payload).toBeUndefined()
  })

  test('documentFetchOne', () => {
    let dummyDoc = {
      doesnt: 'matter',
    }
    let result = document.documentFetchOne(dummyDoc)
    expect(result.type).toEqual('DOCUMENT_FETCH_ONE')
    expect(result.payload).toEqual(dummyDoc)
  })

  test('documentFetchAll', () => {
    let dummyDoc = {
      doesnt: 'matter',
    }
    let result = document.documentFetchAll(dummyDoc)
    expect(result.type).toEqual('DOCUMENT_FETCH_ALL')
    expect(result.payload).toEqual(dummyDoc)
  })

  test('documentReset', () => {
    let result = document.documentReset()
    expect(result.type).toEqual('DOCUMENT_RESET')
    expect(result.payload).toBeUndefined()
  })
})
