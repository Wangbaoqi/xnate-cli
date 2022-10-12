import React, { useEffect } from 'react';
import { useLocalStorageState } from 'ahooks';
import { Header } from './components';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { inIframe, isPhone } from '../utils';
import RouteView from './routeView';
import config from '@config';

import './index.scss';

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [theme] = useLocalStorageState('XNATE_THEMES', {
    defaultValue: 'light',
  });
  const language = searchParams.get('language');
  const {
    mobile: { redirect = '' },
  } = config;

  console.log('render mobile app');

  const updateHTMLTag = (val: string) => {
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', val);
  };

  useEffect(() => {
    if (redirect && pathname === '/') {
      navigate(`/home`);
    }
    updateHTMLTag(theme);
  }, []);

  return (
    <div className="xnate-site-app">
      <Header>{'d'}</Header>
      <main className="xnate-site-app__container">
        <RouteView />
      </main>
    </div>
  );
}

export default App;
