import React from 'react';
import { get } from 'lodash-es';
import { ThemeAction } from '../../../components';
import { Github } from '@xnate-design/icons';
import './index.scss';

function MobileHeader(props: any) {
  return (
    <header className="xnate-site-app__header">
      {/* <a className="xnate-site-app__links" href={''} target="_blank">
        <Github fontSize="20px" />
      </a>
      <div className="xnate-site-app__header-right"></div> */}
      {props.children}
    </header>
  );
}

export default MobileHeader;
