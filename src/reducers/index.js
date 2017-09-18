import {combineReducers} from 'redux'

import document from './documents.js'
import token from './auth.js'
// import edit from './edit.js'

export default combineReducers({ document, token})
/*, edit */
