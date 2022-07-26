import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

if (process.env.REACT_APP_VCONSOLE === "true") {
  import('vconsole').then(vconsole => {
    new vconsole.default()
  })
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
