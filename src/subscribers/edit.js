import * as document from '../actions/document-actions.js'

const EDIT = store => socket => payload => {
  store.dispatch(document.edit(payload))
}

export default {EDIT}
