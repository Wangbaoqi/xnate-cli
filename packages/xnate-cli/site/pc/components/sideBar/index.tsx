import React from 'react';
import { useNavigate, useLocation, Link, To } from 'react-router-dom';

import { Cell } from '../../../components/index';

import clsx from 'clsx';
import './index.scss';

interface IMenuItem {
  [m: string]: string;
}
interface IMenu {
  title?: string;
  children?: IMenu[];
  text?: IMenuItem;
  path?: string;
}

interface ISidebar {
  language?: string;
  menuName?: string;
  navName?: string;
  menu?: IMenu[];
}

const AppSideBar = (props: ISidebar) => {
  const { language = '', menuName, navName, menu = [] } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderMenu = (item: IMenu, key: number) => {
    const itemCls = clsx(
      'xnate-site-sidebar__item',
      { 'xnate-site-sidebar__title': item.title },
      { 'xnate-site-sidebar__link': item.path },
      { 'xnate-site-sidebar__item--title': item.title && item.children },
      { 'xnate-site-sidebar__item--active': `/${language}${item.path}` === pathname },
    );
    const text = item.text || {};
    return (
      <React.Fragment key={key}>
        {item.title && item.children ? <Cell className={itemCls}>{item.title}</Cell> : ''}
        {item.children?.length ? (
          item.children.map(renderMenu)
        ) : (
          <Link className={itemCls} to={`${language}${item.path}`}>
            {text[language]}
          </Link>
        )}
      </React.Fragment>
    );
  };

  return <div className="xnate-site-sidebar">{menu.map(renderMenu)}</div>;
};

export default AppSideBar;
