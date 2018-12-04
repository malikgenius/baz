import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { composeWithDevTools } from 'remote-redux-devtools';
import booksReducer from './booksReducer';

export default () => {
  const store = createStore(
    combineReducers({
      books: booksReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};

// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'remote-redux-devtools'

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ))
