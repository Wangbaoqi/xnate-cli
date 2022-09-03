import React, { ReactNode } from 'react';
import { AppHeader, AppSideBar, AppMobile } from './components/index';
import { useParams, useLocation } from 'react-router-dom';

import config from '@config';
import './App.scss';

interface ILayoutProps {
  children?: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const params = useParams();
  const { pathname } = useLocation();
  console.log(params, 'params');
  console.log(config, 'config');

  const {
    pc: { navs = [], menu = [] },
  } = config;

  return (
    <div className="xnate-site">
      <AppHeader navList={navs} navName={pathname} />

      <div className="xnate-site-content">
        <AppSideBar navName={pathname} menuName={params['*']} />

        <div className="xnate-site-doc-container">{props.children}</div>

        {/* <AppMobile /> */}
      </div>
    </div>
  );
};

export default Layout;
