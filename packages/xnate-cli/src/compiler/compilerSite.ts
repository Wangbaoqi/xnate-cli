import { SRC_DIR_COMPONENTS, DOCS_DIR_NAME, ROOT_DOCS_DIR } from './../shared/constant';

import { copy } from 'fs-extra';
import { resolveXnateConfig } from '../config/xnate.config.js';

import { SITE, SITE_DIR } from '../shared/constant.js';
import { glob } from '../shared/fs';

// const compileMobileSiteRoutes = () => {

// }

const getComponentsDocs = async (): Promise<string[]> => {
  return glob(`${SRC_DIR_COMPONENTS}/**/${DOCS_DIR_NAME}/*.md`);
};

const getRootDocs = async (): Promise<string[]> => {
  return glob(`${ROOT_DOCS_DIR}/*.md`);
};

const compilePcSiteRoutes = async () => {
  const [componentsDocs, rootDoc] = await Promise.all([getComponentsDocs(), getRootDocs()]);

  console.log(componentsDocs, 'componentsDocs');
  console.log(rootDoc, 'rootDoc');
};

const compileSiteSource = () => {
  return copy(SITE, SITE_DIR);
};

export const compileSite = async function () {
  // resolve xnate.config
  resolveXnateConfig(true);
  await Promise.all([compileSiteSource(), compilePcSiteRoutes()]);
};
