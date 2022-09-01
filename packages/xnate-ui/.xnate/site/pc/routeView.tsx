import React from 'react'
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'

import routesConfig from '../pc.routes'

const RouteView = () => {
  return (
    <Routes>
      {routesConfig.map((route, idx) => {
        const LazyComponent = React.lazy(route.component)
        return (
          <Route
            key={idx}
            path={route.path}
            element={
              <React.Suspense fallback={<>...</>}>
                <LazyComponent />
              </React.Suspense>
            }
          ></Route>
        )
      })}
    </Routes>
  )
}

export default RouteView
