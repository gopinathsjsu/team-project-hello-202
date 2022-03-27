import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import LandingPage from './components/LandingPage';
import { composeWithDevTools } from 'redux-devtools-extension';

// const rootReducer = combineReducers({});
// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <LandingPage />, document.getElementById('root')
);
