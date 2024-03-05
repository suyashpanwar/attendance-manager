import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './LandingPage';
import AdminButton from './AdminButton';
import './index.css';
import './button.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <AdminButton />
    <LandingPage />
  </div>
);

