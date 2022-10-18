import React, { useEffect } from 'react';

import './index.scss';

export const LineLoader = () => {
  return (
    <div className="xnate-site__loader">
      <span className="xnate-site__loader-line1"></span>
      <span className="xnate-site__loader-line2"></span>
    </div>
  );
};

const LazyLoader = () => {
  useEffect(() => {
    document.body.classList.add('xnate-line-loader');
    return () => {
      document.body.classList.remove('xnate-line-loader');
    };
  }, []);

  return <LineLoader />;
};

export default LazyLoader;
