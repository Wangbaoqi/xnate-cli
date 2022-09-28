import React, { useEffect } from 'react';
import { AppHeader, AppSideBar, AppMobile } from './components/index';
import { useParams, useLocation, Outlet, useNavigate } from 'react-router-dom';

import config from '@config';
import { getPCLocationInfo } from './utils';
import './App.scss';

interface ILayout {
  children?: React.ReactElement;
}

const Layout = (props: ILayout) => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language = '', navName = '' } = getPCLocationInfo();
  const {
    pc: { navs = [], menu = [], redirect = '' },
    defaultLanguage = '',
  } = config;
  const isHome = navName === 'home';

  const menuList = menu[navName] || [];

  useEffect(() => {
    if (redirect && pathname === '/') {
      navigate(`${defaultLanguage}${redirect}`);
    }
  }, []);

  useEffect(() => {
    if (navName === 'guide' || navName === 'components') {
      const fMenu = menuList[0] || {};
      const pathRedirect = fMenu.path || (fMenu.children && fMenu.children[0].path);
      navigate(`${language}${pathRedirect}`);
    }
  }, [navName]);

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
