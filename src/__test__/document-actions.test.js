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

// describe('Testing document action requests', () => {
//
//   test('documentCreateRequest', () => {
//     let dispatch = res => res
//     let dummyDoc = {
//       title: 'test title',
//       description: 'test description',
//       body: '',
//     }
//     return document.documentCreateRequest(dummyDoc)(dispatch)
//       .then(res => {
//         expect(res.body._id).toBeDefined()
//         expect(res.body.title).toEqual(dummyDoc.title)
//         expect(res.body.description).toEqual(dummyDoc.description)
//         expect(res.body.body).toEqual(dummyDoc.body)
//         return res
//       })
//       .then(res => {
//         return document.documentDeleteRequest(res.body._id)(dispatch)
//       })
//       .then(res => {
//         expect(res.status).toEqual(204)
//       })
//   })
// })
