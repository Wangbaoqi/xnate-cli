import React from 'react';
import { Route, Routes } from 'react-router-dom';

import routesConfig from '@mobile-routes';

routesConfig.length &&
  routesConfig.push({
    path: '/home',
    component: () => import('./components/home/index'),
  });

const RouteView = () => {
  return (
    <Routes>
      {routesConfig.map((route, idx: number) => {
        const LazyComponent = React.lazy(route.component);
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
        );
      })}
    </Routes>
  );
};

export default RouteView;
