import React, { useEffect } from 'react';

import config from '@config';

import { useParams, useLocation, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { getAllComponents } from '../../utils';
import { ChevronRight } from '@xnate-design/icons';

import './index.scss';
import { inIframe, isPhone } from '../../../utils';

const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname: string, params: any) => {
    navigate({
      pathname,
      search: `?${createSearchParams(params)}`,
    });
  };
};

function MobileHome() {
  const params = useParams();
  const location = useLocation();
  const navigateSearch = useNavigateSearch();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    pc: {
      menu: { components = [] },
    },
    mobile: { redirect = '', title = {}, header = {} },
    title: pcTitle = '',
  } = config;
  const language = searchParams.get('language');
  const componentList = getAllComponents(components);

  const toComponents = (path: string) => {
    navigateSearch(`/${path}`, {
      language: language,
    });

    if (!isPhone() && inIframe()) {
      window.parent?.postMessage({ path, language });
    }
  };

  return (
    <div className="xnate-site-app__home">
      <section className="xnate-site-app__home-logo">
        <h2 className="xnate-site-app__home-title">
          <span>{pcTitle}</span>
        </h2>
        <span className="xnate-site-app__home-desc">{title[language]}</span>
      </section>
      <section className="xnate-site-app__component">
        {componentList.map((c, idx) => (
          <div className="xnate-site-app__component-item" key={idx} onClick={() => toComponents(c.path)}>
            <span>{c.text[language]}</span>
            <ChevronRight fontSize={'18px'} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default MobileHome;
