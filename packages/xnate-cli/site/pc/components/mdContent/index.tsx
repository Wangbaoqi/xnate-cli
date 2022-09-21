import React from 'react';

import MdContent from './mdContent';

export interface IMdContent {
  mdContainer?: string;
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
