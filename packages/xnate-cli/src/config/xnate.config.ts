import { pathExistsSync } from 'fs-extra';
import { XNATE_CONFIG, SITE_CONFIG } from '../shared/constant';
import { merge } from 'lodash';
import { outputFileSyncOnChange } from '../shared/fs';

export const resolveXnateConfig = function (emit = false) {
  let config = {};

  if (pathExistsSync(XNATE_CONFIG)) {
    config = require(XNATE_CONFIG);
  }

  const defaultConfig = require('./xnate.default.config');

  const mergeConfig = merge(defaultConfig, config);

  if (emit) {
    const source = JSON.stringify(mergeConfig, null, 2);
    outputFileSyncOnChange(SITE_CONFIG, source);
  }
  return mergeConfig;
};
