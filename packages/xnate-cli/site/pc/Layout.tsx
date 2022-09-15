import React, { ReactNode } from 'react';
import { AppHeader, AppSideBar, AppMobile } from './components/index';
import { useParams, useLocation } from 'react-router-dom';

import config from '@config';
import { getPCLocationInfo } from './utils';
import './App.scss';

interface ILayoutProps {
  children?: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const params = useParams();
  const { pathname } = useLocation();
  const { language = '', navName } = getPCLocationInfo();

  const isHome = navName === 'home';
  console.log(language, 'language');
  console.log(config, 'config');

  const {
    pc: { navs = [], menu = [] },
  } = config;

  return (
    <div className="xnate-site">
      <AppHeader language={language} navList={navs} navName={pathname} />
      {isHome ? (
        <div className="xnate-site-home"></div>
      ) : (
        <div className="xnate-site-content">
          <AppSideBar navName={pathname} />

          <div className="xnate-site-doc-container">{props.children}</div>

          {/* <AppMobile /> */}
        </div>
      )}
    </div>
  );
};

export default Layout;
