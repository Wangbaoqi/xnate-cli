import React from 'react'
import { Route, Routes } from 'react-router-dom'

import routesConfig from '@pc-routes'

import RouteComponent from './components/mdContent'

const RouteView = () => {
  return (
    <Routes>
      {routesConfig.map((route, idx: number) => (
        <Route key={idx} path={route.path} element={<RouteComponent lazyComponent={route.component} />}></Route>
      ))}
    </Routes>
  )
}

export default RouteView
