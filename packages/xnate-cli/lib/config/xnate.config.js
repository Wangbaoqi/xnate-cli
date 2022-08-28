'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.resolveXnateConfig = void 0;
var fs_extra_1 = require('fs-extra');
var constant_1 = require('../shared/constant');
var lodash_1 = require('lodash');
var fs_1 = require('../shared/fs');
var resolveXnateConfig = function (emit) {
  if (emit === void 0) {
    emit = false;
  }
  var config = {};
  if ((0, fs_extra_1.pathExistsSync)(constant_1.XNATE_CONFIG)) {
    config = require(constant_1.XNATE_CONFIG);
  }
  var defaultConfig = require('./xnate.default.config');
  var mergeConfig = (0, lodash_1.merge)(defaultConfig, config);
  if (emit) {
    var source = JSON.stringify(mergeConfig, null, 2);
    (0, fs_1.outputFileSyncOnChange)(constant_1.SITE_CONFIG, source);
  }
  return mergeConfig;
};
exports.resolveXnateConfig = resolveXnateConfig;
