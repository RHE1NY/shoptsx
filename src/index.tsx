import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextGlobal} from "./components/firebase.config";
import db from "./components/firebase.config";
import firebase from "firebase";
import {aunty} from "./components/AppRouter/Login";

ReactDOM.render(
  <React.StrictMode>
      <ContextGlobal.Provider value={{
          aunty,
          db,
          firebase,
      }}>
    <App />
      </ContextGlobal.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

