import React, { useMemo } from 'react';

export interface ITocItem {
  depth?: number;
  url?: string;
  value?: string;
}
export interface IMdContent {
  mdContainer?: string;
  toc?: ITocItem[];
}

import { getMDXExport } from 'mdx-bundler/client';
import { CodeExample, TableContent } from './components';
import { AppMobile } from '..';

import './index.scss';

const MdContent = ({ mdContainer = '', toc = [], ...rest }: IMdContent) => {
  const components = {
    // a: (props) => <PostLink {...props} />,
    pre: (props: any) => <CodeExample {...props} />,
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <table className="xnate-site-md__table font-source-code" {...props} />
    ),
  };

  const mdxExport = getMDXExport(mdContainer);
  const MDXLayout = useMemo(() => mdxExport.default, [mdContainer]);
  return (
    <div className="xnate-site-content">
      <article className="xnate-site-md">
        <section className="xnate-site-md__box">
          <MDXLayout components={components} />
        </section>
      </article>
      <AppMobile />
      <TableContent toc={toc} />
    </div>
  );
};

export default MdContent;
