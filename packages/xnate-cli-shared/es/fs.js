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
import { resolve, extname } from 'path';
import { lstatSync, outputFileSync, pathExistsSync, readdir, readFileSync, ensureFileSync } from 'fs-extra';
export const getPublicDirs = (dir) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const srcDir = yield readdir(dir);
    return srcDir.filter((fn) => exports.isPublicDir(resolve(dir, fn)));
  });
export const isPublicDir = (fnSource, dir) => {
  return fnSource.some((fn) => pathExistsSync(resolve(dir, fn)));
};
export const isMd = (file) => pathExistsSync(file) && extname(file) === '.md';
export const isDir = (file) => pathExistsSync(file) && lstatSync(file).isDirectory();
export const isJSX = (file) => pathExistsSync(file) && ['.tsx', '.jsx'].includes(extname(file));
export const outputFileSyncOnChange = (path, code) => {
  ensureFileSync(path);
  const content = readFileSync(path, 'utf8');
  if (content !== code) {
    outputFileSync(path, code);
  }
};
