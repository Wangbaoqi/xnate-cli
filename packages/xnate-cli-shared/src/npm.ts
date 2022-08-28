// const semver = require('semver');
const { request } = require('./request');

import semver from 'semver';

type MirrorType = {
  [m: string]: string;
};

type NpmType = {
  npmName?: string;
  registry?: string;
};
/**
 * get npm mirror address
 * @param {*} type npm | cnpm
 */
exports.getRegistry = (type: string = 'npm') => {
  const MIRRORENUM: MirrorType = {
    npm: 'https://registry.npmjs.org',
    cnpm: 'https://registry.npm.taobao.org',
  };
  return MIRRORENUM[type] || MIRRORENUM.npm;
};

exports.getNpmInfo = async (npm: string, registry: string) => {
  registry = registry || exports.getRegistry(registry);
  const url = `${registry}/${npm}`;
  try {
    return await request.get(url);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getNpmLatestVersion = async (npm: string, registry: string): Promise<string> => {
  try {
    const npmData = await exports.getNpmInfo(npm, registry);
    if (!npmData?.['dist-tags'] || !npmData?.['dist-tags'].latest) {
      return Promise.reject(`${npm} now has't latest version`);
    }
    return npmData?.['dist-tags'].latest;
  } catch (error) {
    return Promise.reject(`get ${npm} info occurred error: ${error}`);
  }
};

exports.isUpdateCli = async (curVersion: string, { npmName, registry }: NpmType) => {
  const latestVersion = await exports.getNpmLatestVersion(npmName, registry);
  return {
    isNeedUpdate: latestVersion && semver.lte(latestVersion, curVersion),
    latestVersion,
  };
};
