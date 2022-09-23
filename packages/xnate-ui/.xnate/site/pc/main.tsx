import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

import { BrowserRouter } from 'react-router-dom'

// eslint-disable-next-line no-undef
const container = document.getElementById('root')

// eslint-disable-next-line no-undef
const root = createRoot(container as HTMLElement)

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
