import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// //import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
// import DevTools from '../containers/DevTools'
import { routerMiddleware } from 'react-router-redux'

const configureStore = history => preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(thunk, routerMiddleware(history)))
  )
  return store
}

export default configureStore
