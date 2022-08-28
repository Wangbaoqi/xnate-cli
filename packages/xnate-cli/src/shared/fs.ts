import { resolve, extname } from 'path';

import { lstatSync, outputFileSync, pathExistsSync, readdir, readFileSync, ensureFileSync } from 'fs-extra';

import globSync from 'glob';

export const getPublicDirs = async (dir: string): Promise<string[]> => {
  const srcDir = await readdir(dir);
  return srcDir.filter((fn) => exports.isPublicDir(resolve(dir, fn)));
};

export const isPublicDir = (fnSource: string[], dir: string): boolean => {
  return fnSource.some((fn) => pathExistsSync(resolve(dir, fn)));
};

export const isMd = (file: string): boolean => pathExistsSync(file) && extname(file) === '.md';

export const isDir = (file: string): boolean => pathExistsSync(file) && lstatSync(file).isDirectory();

export const isJSX = (file: string): boolean => pathExistsSync(file) && ['.tsx', '.jsx'].includes(extname(file));

export const outputFileSyncOnChange = (path: string, code: string) => {
  ensureFileSync(path);
  const content = readFileSync(path, 'utf8');
  if (content !== code) {
    outputFileSync(path, code);
  }
};

export const glob = (pattern: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    globSync(pattern, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
