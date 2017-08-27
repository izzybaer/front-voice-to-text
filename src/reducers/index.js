import {combineReducers} from 'redux'

import document from './documents.js'
import editHistory from './edit-history.js'

export default combineReducers({ document, editHistory })
