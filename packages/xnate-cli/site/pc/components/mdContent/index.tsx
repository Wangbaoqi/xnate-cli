import React from 'react';

import MdContent from './mdContent';

export interface ITocItem {
  depth?: number;
  url?: string;
  value?: string;
}
export interface IMdContent {
  mdContainer?: string;
  toc?: ITocItem[];
}

const RouteComponent = ({ lazyComponent, ...rest }) => {
  const LazyComponent = React.lazy(lazyComponent);

  console.log(lazyComponent, 'LazyComponent');

  return (
    <React.Suspense fallback={<>...</>}>
      <LazyComponent>{(props: IMdContent) => <MdContent {...props} />}</LazyComponent>
    </React.Suspense>
  );
};

export default RouteComponent;
