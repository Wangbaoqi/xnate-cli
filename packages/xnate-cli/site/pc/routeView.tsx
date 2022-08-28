import React from 'react';
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom';

import Layout from './Layout';

import Intro from './pages/guide/intro';
import Usage from './pages/guide/index';

const RouteView = () => {
  return (
    <Routes>
      <Route path="/doc/intro" element={<Intro />}></Route>
      <Route path="/components" element={<Usage />}></Route>
    </Routes>
  );
};

export default RouteView;
