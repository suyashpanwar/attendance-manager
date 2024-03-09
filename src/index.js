import React from 'react';
import ReactDOM from "react-dom"
import { BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css';
import './button.css'
import './admin-login.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

