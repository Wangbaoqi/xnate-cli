import { SRC_DIR_COMPONENTS, DOCS_DIR_NAME, ROOT_DOCS_DIR } from './../shared/constant';

import { copy } from 'fs-extra';
import { resolveXnateConfig } from '../config/xnate.config';

import { SITE, SITE_DIR, SITE_PC_ROUTES } from '../shared/constant';
import { glob, outputFileSyncOnChange } from '../shared/fs';

const ROOT_DOCS_RE = /\/docs\/([-\w]+)\/([-\w]+).([-\w]+)\.md/;
const COMPONENT_DOCS_RE = /\/([-\w]+)\/docs\/([-\w]+)\.md/;

const getRootDocPath = (path: string): string => {
  const [, type, routePath, language] = path.match(ROOT_DOCS_RE) ?? [];
  return `/${language}/${type}/${routePath}`;
};

const getComponentsDocPath = (path: string): string => {
  const [, routePath, language] = path.match(COMPONENT_DOCS_RE) ?? [];
  return `/${language}/components/${routePath}`;
};

// const compileMobileSiteRoutes = () => {

// }

const getComponentsDocs = async (): Promise<string[]> => {
  return glob(`${SRC_DIR_COMPONENTS}/**/${DOCS_DIR_NAME}/*.md`);
};

const getRootDocs = async (): Promise<string[]> => {
  return glob(`${ROOT_DOCS_DIR}/**/*.md`);
};

const compilePcSiteRoutes = async () => {
  const [componentsDocs, rootDoc] = await Promise.all([getComponentsDocs(), getRootDocs()]);

  const rootDocsRoutes = rootDoc.map(
    (doc) => `
      {
        path: '${getRootDocPath(doc)}',
        // @ts-ignore
        component: () => import('${doc}')
      }
    `,
  );

  const componentDocsRoutes = componentsDocs.map(
    (doc) => `
      {
        path: '${getComponentsDocPath(doc)}',
        // @ts-ignore
        component: () => import('${doc}')
      }
    `,
  );

  const source = `export default [\
    ${[...rootDocsRoutes]},
    ${[...componentDocsRoutes]}
  ]`;

  outputFileSyncOnChange(SITE_PC_ROUTES, source);

  console.log(componentsDocs, 'componentsDocs');
  console.log(rootDoc, 'rootDoc');
  console.log(source, 'source');
};

const compileSiteSource = () => {
  return copy(SITE, SITE_DIR);
};

export const compileSite = async function () {
  // resolve xnate.config
  resolveXnateConfig(true);
  await Promise.all([compileSiteSource(), compilePcSiteRoutes()]);
};
