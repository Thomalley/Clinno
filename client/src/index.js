import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from './store'
import {Auth0Provider} from '@auth0/auth0-react';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider domain='dev-y0fixnd6.us.auth0.com' clientId='6hW7pTfD1we1YC6Mo2wRhZkx3woyoqM6' redirectUri={window.location.origin}>
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
