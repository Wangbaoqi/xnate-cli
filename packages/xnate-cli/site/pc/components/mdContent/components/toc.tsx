import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { ITocItem } from '../';

interface IToc {
  toc?: ITocItem[];
  indexDepth?: number;
}

const useActiveId = (idList) => {
  const [activeId, setActiveId] = useState('el');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0% -80% 0%' },
    );
    idList.forEach((id: string) => {
      observer.observe(document.getElementById(id) as HTMLElement);
    });

    return () => {
      idList.forEach((id: string) => {
        const idNode = document.getElementById(id);
        idNode && observer.unobserve(idNode);
      });
    };
  }, [idList]);
  return activeId;
};

export default function TableContent({ toc = [], indexDepth = 2 }: IToc) {
  const tocIds = toc.map((e) => e.url?.replace(/#/g, ''));
  const activeId = useActiveId(tocIds);
  return (
    <>
      <nav className="xnate-site-md__toc">
        <ul className="xnate-site-md__toc-box">
          {toc.map((head) => {
            const { depth = 0, value, url } = head;
            const headCls = clsx('xnate-site-md__toc-item', {
              'xnate-site-md__toc-item-dep': depth > indexDepth,
              'xnate-site-md__toc-item-act': url === `#${activeId}`,
            });
            return (
              <li key={value}>
                <a href={url} className={headCls}>
                  {value}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
