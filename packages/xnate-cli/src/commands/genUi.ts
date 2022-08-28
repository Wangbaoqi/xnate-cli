import { pathExistsSync, copy } from 'fs-extra';
import path from 'path';
import { CWD } from '../shared/constant';
import { logger } from '../shared/log';

export const genUi = async (name: string) => {
  const dest = path.resolve(CWD, name);
  if (pathExistsSync(dest)) {
    logger.warning(`${name} already exists and can't be recreated...`);
    return;
  }

  try {
    const GENERATORS_DIR = path.resolve(__dirname, '../../template/gen-component');

    logger.warning(__dirname);

    logger.info(GENERATORS_DIR);
    logger.info(dest);

    await copy(GENERATORS_DIR, dest);
  } catch (error) {
    logger.error(`gen-component failed: ${error}`);
  }
};
