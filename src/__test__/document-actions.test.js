import * as document from '../actions/document-actions.js'

describe('Testing document actions', () => {
  test('documentCreate', () => {
    let dummyDoc = {
      doesnt: 'matter',
    }
    let result = document.documentCreate(dummyDoc)
    expect(result.type).toBe('DOCUMENT_CREATE')
    expect(result.payload).toBe(dummyDoc)
  })
  test('documentUpdate', () => {
    let dummyDoc = {
      doesnt: 'matter',
    }
    let result = document.documentUpdate(dummyDoc)
    expect(result.type).toBe('DOCUMENT_UPDATE')
    expect(result.payload).toBe(dummyDoc)
  })
  test('documentDelete', () => {
    let id = 123
    let result = document.documentDelete(id)
    expect(result.type).toBe('DOCUMENT_DELETE')
    expect(result.payload).toBeUndefined()
  })
  test('documentFetch', () => {
    let dummyDoc = {
      doesnt: 'matter',
    }
    let result = document.documentFetch(dummyDoc)
    expect(result.type).toBe('DOCUMENT_FETCH')
    expect(result.payload).toBe(dummyDoc)
  })
  test('documentReset', () => {
    let result = document.documentReset()
    expect(result.type).toBe('DOCUMENT_RESET')
    expect(result.payload).toBeUndefined()
  })
})
