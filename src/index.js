import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './app/store';
import { Provider } from "react-redux";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <div className="blobs">
      <svg className="blob" style={{left: "-10%", top: "30%"}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#565effc3" d="M46.6,-37.2C58.2,-22.7,63.9,-3.4,59.9,13.6C55.9,30.5,42.4,45.1,24.3,56C6.2,66.9,-16.4,74,-37,67.6C-57.6,61.3,-76.2,41.5,-82.6,17.6C-89.1,-6.3,-83.5,-34.2,-67.7,-49.6C-51.9,-65.1,-25.9,-68.2,-4.2,-64.8C17.5,-61.5,35,-51.7,46.6,-37.2Z" transform="translate(100 100)" />
      </svg>
      <svg className="blob" style={{left: "70%", top: "88%"}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#565effe1" d="M43.8,-43.4C58.3,-29.3,72.7,-14.6,74.7,2C76.7,18.6,66.2,37.2,51.7,50C37.2,62.8,18.6,69.8,2.9,66.9C-12.7,63.9,-25.4,51,-35.3,38.2C-45.2,25.4,-52.2,12.7,-57.3,-5.1C-62.3,-22.8,-65.4,-45.7,-55.5,-59.8C-45.7,-73.8,-22.8,-79.2,-4.1,-75.1C14.6,-71,29.3,-57.5,43.8,-43.4Z" transform="translate(100 100)" />
      </svg>
      <svg className="blob" style={{left: "50%", top: "20%"}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#565eff22" d="M62.6,-43.2C78.7,-29.6,88,-3.7,80.4,14C72.9,31.6,48.6,41.1,26.6,49.5C4.6,57.9,-15.2,65.3,-31.2,59.6C-47.1,53.9,-59.2,35.1,-62.3,15.8C-65.5,-3.5,-59.7,-23.2,-47.8,-35.8C-35.9,-48.4,-18,-53.9,2.6,-56C23.2,-58.1,46.4,-56.8,62.6,-43.2Z" transform="translate(100 100)" />
      </svg>
      <svg className="blob" style={{left: "20%", top: "50%"}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#565EFF58" d="M61.1,-47.8C74.1,-32.4,76.1,-7.3,69.4,13.4C62.8,34.2,47.5,50.5,27.7,61.6C8,72.7,-16.3,78.4,-34.5,70.2C-52.7,62,-64.9,39.8,-70.9,15.6C-76.8,-8.5,-76.4,-34.6,-63.6,-49.9C-50.7,-65.3,-25.4,-69.9,-0.7,-69.4C24.1,-68.8,48.1,-63.2,61.1,-47.8Z" transform="translate(100 100)" />
      </svg>
      <svg className="blob" style={{left: "90%", top: "-7%"}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#565effb8" d="M38.5,19.1C26.9,42.4,-21.4,41.3,-33.9,17.5C-46.5,-6.3,-23.2,-52.9,0.9,-52.4C25.1,-51.9,50.2,-4.2,38.5,19.1Z" transform="translate(100 100)" />
      </svg>
      <svg className="blob" style={{left: "15%", top: "-7%"}} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#565effb8" d="M11.6,7.2C1.5,24.2,-29.7,29.7,-35.1,15.4C-40.5,1.1,-20.3,-32.9,-4.7,-35.6C10.9,-38.3,21.7,-9.8,11.6,7.2Z" transform="translate(100 100)" />
      </svg>
    </div>
    <App />
  </Provider>
);
