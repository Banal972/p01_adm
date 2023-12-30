import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom"
import {CookiesProvider,Cookies} from "react-cookie"
import {Provider} from "react-redux"
import store from './app/store';

const cookies = new Cookies();

export const setCookie = (name, value, options)=>{
  return cookies.set(name,value,{...options});
}

export const getCookie  = (name)=>{
  return cookies.get(name);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode></React.StrictMode>
  <CookiesProvider> {/*쿠키*/}
    <BrowserRouter basename={process.env.PUBLIC_URL}> {/*라우터*/}
      <Provider store={store}> {/*리덕스*/}
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
