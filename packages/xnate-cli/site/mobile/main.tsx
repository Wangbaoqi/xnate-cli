import React from 'react';
import ReactDOM from 'react-dom';

import { createRoot } from 'react-dom/client';

import App from './App';

import { HashRouter } from 'react-router-dom';

const container = document.getElementById('app');

const root = createRoot(container as HTMLElement);

root.render(
  <HashRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>,
);
