import React from 'react'
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'

import routesConfig from '@pc-routes'

import RouteComponent from './components/mdContent'

const RouteView = () => {
  return (
    <Routes>
      {routesConfig.map((route, idx: number) => {
        const LazyComponent = React.lazy(route.component)
        return <Route key={idx} path={route.path} element={<RouteComponent lazyComponent={route.component} />}></Route>
      })}
    </Routes>
  )
}

export default RouteView
