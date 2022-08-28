'use strict';
// const path = require('path');
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.outputFileSyncOnChange =
  exports.isJSX =
  exports.isDir =
  exports.isMd =
  exports.isPublicDir =
  exports.getPublicDirs =
    void 0;
const path_1 = require('path');
const fs_extra_1 = require('fs-extra');
const getPublicDirs = (dir) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const srcDir = yield (0, fs_extra_1.readdir)(dir);
    return srcDir.filter((fn) => exports.isPublicDir((0, path_1.resolve)(dir, fn)));
  });
exports.getPublicDirs = getPublicDirs;
const isPublicDir = (fnSource, dir) => {
  return fnSource.some((fn) => (0, fs_extra_1.pathExistsSync)((0, path_1.resolve)(dir, fn)));
};
exports.isPublicDir = isPublicDir;
const isMd = (file) => (0, fs_extra_1.pathExistsSync)(file) && (0, path_1.extname)(file) === '.md';
exports.isMd = isMd;
const isDir = (file) => (0, fs_extra_1.pathExistsSync)(file) && (0, fs_extra_1.lstatSync)(file).isDirectory();
exports.isDir = isDir;
const isJSX = (file) => (0, fs_extra_1.pathExistsSync)(file) && ['.tsx', '.jsx'].includes((0, path_1.extname)(file));
exports.isJSX = isJSX;
const outputFileSyncOnChange = (path, code) => {
  (0, fs_extra_1.ensureFileSync)(path);
  const content = (0, fs_extra_1.readFileSync)(path, 'utf8');
  if (content !== code) {
    (0, fs_extra_1.outputFileSync)(path, code);
  }
};
exports.outputFileSyncOnChange = outputFileSyncOnChange;
