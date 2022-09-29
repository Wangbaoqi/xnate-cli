import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import RouteComponent from './components/mdContent';

import routesConfig from '@pc-routes';

const RouteView = () => {
  return (
    <Routes>
      {routesConfig.map((route, idx: number) =>
        route.redirect ? (
          <Route key={idx} path={route.path} element={<Navigate to={route.redirect} />} />
        ) : (
          <Route key={idx} path={route.path} element={<RouteComponent lazyComponent={route.component} />}></Route>
        ),
      )}
    </Routes>
  );
};

export default RouteView;
