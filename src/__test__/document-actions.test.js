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
})
