import docReducer from '../reducers/documents.js'

describe('Testing document reducer', () => {

  test('Default case', () => {
    let action = {type: 'INVALID'}
    let initialState = {doesnt: 'matter'}
    let result = docReducer(initialState, action)
    expect(result).toEqual(initialState)
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
    expect(result).toEqual(action.payload)
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
    expect(result).toEqual(action.payload)
  })

  test('DOCUMENT_DELETE', () => {
    let action = {
      type: 'DOCUMENT_DELETE',
      payload: {
        id: 123,
      },
    }
    let result = docReducer(undefined, action)
    expect(result).toEqual([])
  })

  test('DOCUMENT_FETCH_ONE', () => {
    let action = {
      type: 'DOCUMENT_FETCH_ONE',
      payload: {
        id: 123,
        text: 'fetch',
      },
    }
    let result = docReducer(undefined, action)
    expect(result).toEqual([action.payload])
  })

  test('DOCUMENT_FETCH_ALL', () => {
    let action = {
      type: 'DOCUMENT_FETCH_ALL',
      payload: [{
        id: 123,
        text: 'fetch',
      },
      {
        id: 3333,
        text: 'fettttch',
      }],
    }
    let result = docReducer(undefined, action)
    expect(result).toEqual([...action.payload])
  })

  test('DOCUMENT_RESET', () => {
    let action = {
      type: 'DOCUMENT_RESET',
    }
    let result = docReducer(undefined, action)
    expect(result).toEqual([])
  })
})
