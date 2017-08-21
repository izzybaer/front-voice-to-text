import docReducer from '../reducers/documents.js'

describe('Testing document reducer', () => {
  test('Default case', () => {
    let action = {type: 'INVALID'}
    let initialState = {doesnt: 'matter'}
    let result = docReducer(initialState, action)
    expect(result).toBe(initialState)
  })
  test('DOCUMENT_CREATE', () => {
    let action = {
      type: 'DOCUMENT_CREATE',
      payload: {
        id: 123,
        text: 'create',
      },
    }
    let result = docReducer(undefined, action)
    expect(result).toBe(action.payload)
  })
  test('DOCUMENT_UPDATE', () => {
    let action = {
      type: 'DOCUMENT_UPDATE',
      payload: {
        id: 123,
        text: 'update',
      },
    }
    let result = docReducer(undefined, action)
    expect(result).toBe(action.payload)
  })
  test('DOCUMENT_DELETE', () => {
    let action = {
      type: 'DOCUMENT_DELETE',
      payload: {
        id: 123,
      },
    }
    let result = docReducer(undefined, action)
    expect(result).toEqual({})
  })
  test('DOCUMENT_FETCH', () => {
    let action = {
      type: 'DOCUMENT_FETCH',
      payload: {
        id: 123,
        text: 'fetch',
      },
    }
    let result = docReducer(undefined, action)
    expect(result).toBe(action.payload)
  })
  test('DOCUMENT_RESET', () => {
    let action = {
      type: 'DOCUMENT_RESET',
    }
    let result = docReducer(undefined, action)
    expect(result).toEqual({})
  })
})
