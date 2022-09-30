import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import config from '@config';
import { get } from 'lodash-es';
import { ThemeAction } from '../../../components';
import './index.scss';
import GitHub from '@xnate-design/icons/es/github';

type navItem = {
  [m: string]: string;
};

type navType = {
  text?: navItem;
  path?: string;
  index?: boolean;
};
interface IHeader {
  navName?: string;
  navList?: navType[];
  language?: string;
}

const AppHeader = (props: IHeader) => {
  const { navName, navList = [], language = '' } = props;

  const title = get(config, 'title');
  const logo = get(config, 'logo');
  const themeKey = get(config, 'themeKey');
  const languages = get(config, 'pc.header.i18n');
  const github = get(config, 'pc.header.github');
  const darkMode = get(config, 'pc.header.darkMode');

  const headerNav = React.useMemo(() => {
    return navList.map((n, i) => {
      const active = n.path === `/${navName}`;
      const headCls = clsx('xnate-site-header__nav-item', { 'xnate-site-header__nav-item--active': active });
      const item = n.text || {};
      return (
        <React.Fragment key={i}>
          {n.path ? (
            <Link className={headCls} to={`/${language}${n.path}`}>
              {item[language]}
            </Link>
          ) : (
            item[language]
          )}
        </React.Fragment>
      );
    });
  }, [navList, navName, language]);

  return (
    <div className="xnate-site-header">
      <div className="xnate-site-header__lead">
        <div className="xnate-site-header__left">
          <div className="xnate-site-header__title">{title}</div>
        </div>
        <nav className="xnate-site-header__nav">{headerNav}</nav>
      </div>
      <div className="xnate-site-header__tail">
        <div className="xnate-site-header__versions"></div>
        <a className="xnate-site-header__links"></a>
        <a className="xnate-site-header__links" href={github} target="_blank">
          <GitHub fontSize="20px" />
        </a>
        <ThemeAction />
        <div className="xnate-site-header__language"></div>
      </div>
    </div>
  );
};

export default AppHeader;
