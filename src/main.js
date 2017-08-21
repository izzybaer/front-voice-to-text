import './styles/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'

import App from './components/app'
import storeCreate from './lib/store-create.js'

const store = storeCreate()

let AppContainer = () =>
  <Provider store={store}>
    <App />
  </Provider>

ReactDom.render(<AppContainer />, document.getElementById('root'))
