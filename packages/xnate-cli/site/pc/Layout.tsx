import React, { useEffect } from 'react';
import { AppHeader, AppSideBar, AppMobile } from './components/index';
import { useParams, useLocation, Outlet, useNavigate } from 'react-router-dom';

import config from '@config';
import { getPCLocationInfo } from './utils';
import './App.scss';

interface ILayout {
  children?: React.ReactElement;
}

interface window {
  onMobileRouteChange: () => void;
}

const Layout = (props: ILayout) => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language = '', navName = '' } = getPCLocationInfo();
  const {
    pc: { navs = [], menu = {}, redirect = '' },
    mobile: { redirect: mobileRedirect = '' },
    defaultLanguage = '',
  } = config;
  const isHome = navName === 'home';

  const menuList = menu[navName] || [];

  console.log('render pc app');

  useEffect(() => {
    if (redirect && pathname === '/') {
      navigate(`${defaultLanguage}${redirect}`);
    }

    if (!window.onMobileRouteChange) {
      Object.defineProperty(window, 'onMobileRouteChange', {
        value: (path: string, language: string) => {
          if (path !== mobileRedirect) {
            navigate(`/${language}/components/${path}`);
            return;
          }
        },
      });
    }
  }, []);

  return (
    <div className="xnate-site">
      <AppHeader language={language} navList={navs} navName={navName} />
      {isHome ? (
        <div className="xnate-site-home">{props.children}</div>
      ) : (
        <>
          <AppSideBar language={language} navName={navName} menu={menuList} />
          <div className="xnate-site-container">{props.children}</div>
        </>
      )}
    </div>
  );
};

export default Layout;
