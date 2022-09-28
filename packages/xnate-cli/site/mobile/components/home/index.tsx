import React, { useEffect } from 'react';

import config from '@config';

import { useParams, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { getAllComponents } from '../../utils';
import { ChevronRight } from '@xnate-design/icons';

import './index.scss';

function MobileHome() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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

  const toComponents = (c) => {
    console.log(c, 'c router');
    navigate(`${c.path}`);
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
          <div className="xnate-site-app__component-item" key={idx} onClick={() => toComponents(c)}>
            <span>{c.text[language]}</span>
            <ChevronRight fontSize={'18px'} />
          </div>
        ))}
      </section>
    </div>
  );
}

export default MobileHome;
