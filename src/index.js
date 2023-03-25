import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from "react-redux";
import App from './App';
import Blobs from './components/Blobs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Blobs />
    <App />
  </Provider>
);
