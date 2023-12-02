import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { PlayerProvider } from './components/PlayerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PlayerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlayerProvider>
  </React.StrictMode>
);

reportWebVitals();
