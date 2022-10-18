import React from 'react';
import Layout from './Layout';
import { Route, Routes, Navigate } from 'react-router-dom';
import routesConfig from '@pc-routes';
import MdContent from './components/mdContent';
import { LazyLoader } from './components';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routesConfig.map((route, idx: number) => {
          if (route.redirect) {
            return <Route key={idx} path={route.path} element={<Navigate to={route.redirect} replace={true} />} />;
          }
          const LazyComponent = React.lazy(route.component);
          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <React.Suspense fallback={<>...</>}>
                  <LazyComponent>{(props) => <MdContent {...props} />}</LazyComponent>
                </React.Suspense>
              }
            />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
