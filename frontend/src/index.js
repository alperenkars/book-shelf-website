import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Default CSS file
import './styles.css'; // Custom CSS file
import 'tabler-react/dist/Tabler.css'; // Tabler CSS file
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();