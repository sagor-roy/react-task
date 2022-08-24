import axios from 'axios';
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/bootstrap.min.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
const token = JSON.parse(localStorage.getItem('user'))
if (token != null) {
  axios.defaults.headers.common['Authorization']='Bearer '+ token.access_token
}


const root = createRoot(document.getElementById("root"))
root.render( 
  <App/>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
