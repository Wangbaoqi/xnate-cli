import React from 'react'
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'

import Layout from './Layout'

import Intro from './pages/guide/intro'
import Usage from './pages/guide/index'

import Mdd from './pages/guide/index.md'

const Md = React.lazy(() => import('./pages/guide/index.md'))

const RouteView = () => {
  return (
    <Routes>
      <Route path="/components/button" element={<Intro />}></Route>
      <Route path="/components/cell" element={<Usage />}></Route>
      <Route
        path="/components/icon"
        element={
          <React.Suspense fallback={<>...</>}>
            <Md />
          </React.Suspense>
        }
      ></Route>
    </Routes>
  )
}

export default RouteView
