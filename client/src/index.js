import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { legacy_createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

import App from './App'
import './index.css'
import { ModalProvider } from './ModalProvider'

const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <ModalProvider>
            <App />
        </ModalProvider>
    </Provider>, 
    document.getElementById('root')
)