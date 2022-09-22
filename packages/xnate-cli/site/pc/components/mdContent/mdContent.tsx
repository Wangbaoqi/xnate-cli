import React, { useMemo } from 'react';

import { IMdContent } from '.';
import { getMDXComponent, getMDXExport } from 'mdx-bundler/client';

import { CodeExample } from './components';

import './index.scss';

const MdContent = ({ mdContainer = '', ...rest }: IMdContent) => {
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
    <article className="xnate-site-md">
      <section className="xnate-site-md__box">
        <MDXLayout components={components} />
      </section>
    </article>
  );
};

export default MdContent;
