import React, { ReactNode } from 'react';

import clsx from 'clsx';

import './index.scss';

interface IBar {
  className?: string;
  children?: ReactNode;
  changeRoute?: () => void;
}

const Cell = (props: IBar) => {
  const cellCls = clsx('xnate-site-cell', props.className);

  return (
    <div className={cellCls} onClick={props.changeRoute}>
      <div className="xnate-site-cell__content">
        <div className="xnate-site-cell__title">{props.children}</div>
      </div>
    </div>
  );
};

export default Cell;
