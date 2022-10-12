import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPCLocationInfo } from '../../utils';
import './index.scss';
interface IMobileProps {
  componentsName?: string;
  language?: string;
  replace?: string;
}

const AppMobile = () => {
  const navigate = useNavigate();

  const { language = '', navName = '', secondName } = getPCLocationInfo();
  const componentsName = navName === 'components' ? secondName : 'home';

  useEffect(() => {
    const handler = (event: { data: { language: string; path: string } }) => {
      const { language: curLanguage, path } = event.data;
      if (curLanguage && path) {
        console.log(`/${curLanguage}/components/${path}`, 'envet');
        navigate(`/${language}/components/${path}`);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const today = new Date();
  return (
    <div className="xnate-site-mobile" data-device-type="iOS">
      <div className="xnate-site-mobile__status">
        <span>{`${today.getHours()}:${today.getMinutes()}`}</span>
        <span>mobile</span>
        <span className="xnate-site-mobile__batter"></span>
      </div>
      <div className="xnate-site-mobile__content">
        <iframe id="mobile" src={`/mobile.html#/${componentsName}?language=${language}`}></iframe>
      </div>
    </div>
  );
};

export default AppMobile;
