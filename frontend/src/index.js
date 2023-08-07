import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from "react-dom/client";
import App from "./App";


import { configureAppStore } from './store/configureStore';

const store = configureAppStore();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
    
    <App />
  
    </Provider>
  </React.StrictMode>
);

//const el = document.getElementById('app');
//const root = createRoot(el);
//root.render(
//    <App />
//);