import {
  SRC_DIR_COMPONENTS,
  DOCS_DIR_NAME,
  ROOT_DOCS_DIR,
  ROOT_PAGES_DIR,
  LOCALE_DIR_NAME,
  SITE_PC_DIR,
  DIR_INDEX,
  EXAMPLE_DIR_NAME,
  SITE_MOBILE_ROUTES,
} from './../shared/constant';

import { copy } from 'fs-extra';
import { resolveXnateConfig } from '../config/xnate.config';

import { SITE, SITE_DIR, SITE_PC_ROUTES } from '../shared/constant';
import { glob, isDir, outputFileSyncOnChange } from '../shared/fs';
import { get } from 'lodash';
import slash from 'slash';

const ROOT_DOCS_RE = /\/docs\/([-\w]+)\/([-\w]+).([-\w]+)\.md/;
const COMPONENT_DOCS_RE = /\/([-\w]+)\/docs\/([-\w]+)\.md/;
const ROOT_LOCALE_RE = /\/pages\/([-\w]+)\/locale\/([-\w]+)\.ts/;
const EXAMPLE_COMPONENT_NAME_RE = /\/([-\w]+)\/example\/index.tsx/;

const getRootDocPath = (path: string): string => {
  const [, type, routePath, language] = path.match(ROOT_DOCS_RE) ?? [];
  return `/${language}/${type}/${routePath}`;
};

const getComponentsDocPath = (path: string): string => {
  const [, routePath, language] = path.match(COMPONENT_DOCS_RE) ?? [];
  return `/${language}/components/${routePath}`;
};

const getExampleRoutePath = (path: string): string => {
  return '/' + path.match(EXAMPLE_COMPONENT_NAME_RE)?.[1];
};

export const getRootRoutePath = (rootLocalePath: string): string => {
  const [, routePath, language] = rootLocalePath.match(ROOT_LOCALE_RE) ?? [];
  return `/${language}/${routePath}`;
};

export const getRootFilePath = (rootLocalePath: string): string => {
  return rootLocalePath.replace(/locale\/.+/, DIR_INDEX);
};

const getExamples = async (): Promise<string[]> => {
  return glob(`${SRC_DIR_COMPONENTS}/**/${EXAMPLE_DIR_NAME}/${DIR_INDEX}`);
};

const getComponentsDocs = async (): Promise<string[]> => {
  return glob(`${SRC_DIR_COMPONENTS}/**/${DOCS_DIR_NAME}/*.md`);
};

const getRootDocs = async (): Promise<string[]> => {
  return glob(`${ROOT_DOCS_DIR}/**/*.md`);
};

const getRootLocales = async (): Promise<string[]> => {
  const defaultLanguage = get(resolveXnateConfig(), 'defaultLanguage');

  const userPages = await glob(`${ROOT_PAGES_DIR}/*`);

  const baseLocales = await glob(`${SITE}/pc/pages/**/${LOCALE_DIR_NAME}/*.ts`);

  const userLocales = await userPages.reduce<Promise<string[]>>(
    async (userLocales: Promise<string[]>, page: string) => {
      if (isDir(page)) {
        const locales = await glob(`${page}/${LOCALE_DIR_NAME}/*.ts`);

        if (!locales.length) locales.push(`${page}/${LOCALE_DIR_NAME}/${defaultLanguage}.ts`);
        (await userLocales).push(...locales);
      }

      return userLocales;
    },
    Promise.resolve([]),
  );

  const map = new Map();
  baseLocales.forEach((locale) => {
    const [, routePath, language] = locale.match(ROOT_LOCALE_RE) ?? [];
    map.set(routePath + language, slash(`${SITE_PC_DIR}/pages/${routePath}/locale/${language}.ts`));
  });

  userLocales.forEach((locale) => {
    const [, routePath, language] = locale.match(ROOT_LOCALE_RE) ?? [];
    map.set(routePath + language, locale);
  });

  return Promise.resolve(Array.from(map.values()));
};

const compileMobileSiteRoutes = async () => {
  const examples = await getExamples();

  const routes = examples.map(
    (example) => `
  {
    path: '${getExampleRoutePath(example)}',
    // @ts-ignore
    component: () => import('${example}')
  }`,
  );

  const source = `export default [\
    ${routes.join(',')}
]`;

  await outputFileSyncOnChange(SITE_MOBILE_ROUTES, source);
};

const compilePcSiteRoutes = async () => {
  const [componentsDocs, rootDoc, rootLocales] = await Promise.all([
    getComponentsDocs(),
    getRootDocs(),
    getRootLocales(),
  ]);

  const rootPagesRoutes = rootLocales.map(
    (rootLocale) => `
  {
    path: '${getRootRoutePath(rootLocale)}',
    // @ts-ignore
    component: () => import('${getRootFilePath(rootLocale)}')
  }\
`,
  );

  const rootDocsRoutes = rootDoc.map(
    (doc) => `
  {
    path: '${getRootDocPath(doc)}',
    // @ts-ignore
    component: () => import('${doc}')
  }`,
  );

  const componentDocsRoutes = componentsDocs.map(
    (doc) => `
  {
    path: '${getComponentsDocPath(doc)}',
    // @ts-ignore
    component: () => import('${doc}')
  }`,
  );

  const source = `export default [\
    ${[...rootPagesRoutes, ...rootDocsRoutes, ...componentDocsRoutes]},
]`;

  outputFileSyncOnChange(SITE_PC_ROUTES, source);
};

const compileSiteSource = () => {
  return copy(SITE, SITE_DIR);
};

export const compileSite = async function () {
  // resolve xnate.config
  resolveXnateConfig(true);
  await Promise.all([compileMobileSiteRoutes(), compilePcSiteRoutes(), compileSiteSource()]);
};
