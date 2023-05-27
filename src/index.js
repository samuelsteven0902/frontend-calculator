import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CalcProvider from './context/CalcContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalcProvider>
      <App />
    </CalcProvider>
  </React.StrictMode>
);
