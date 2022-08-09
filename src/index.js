import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reducer, { initialState } from "./components/reducer";
import { StateProvider } from "./components/StateProvider";
import { BrowserRouter as Router } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
    <App />
    </Router>
  </StateProvider>
</React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

