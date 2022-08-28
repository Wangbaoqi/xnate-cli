'use strict';
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// const semver = require('semver');
const { request } = require('./request');
const semver_1 = __importDefault(require('semver'));
/**
 * get npm mirror address
 * @param {*} type npm | cnpm
 */
exports.getRegistry = (type = 'npm') => {
  const MIRRORENUM = {
    npm: 'https://registry.npmjs.org',
    cnpm: 'https://registry.npm.taobao.org',
  };
  return MIRRORENUM[type] || MIRRORENUM.npm;
};
exports.getNpmInfo = (npm, registry) =>
  __awaiter(void 0, void 0, void 0, function* () {
    registry = registry || exports.getRegistry(registry);
    const url = `${registry}/${npm}`;
    try {
      return yield request.get(url);
    } catch (error) {
      return Promise.reject(error);
    }
  });
exports.getNpmLatestVersion = (npm, registry) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const npmData = yield exports.getNpmInfo(npm, registry);
      if (
        !(npmData === null || npmData === void 0 ? void 0 : npmData['dist-tags']) ||
        !(npmData === null || npmData === void 0 ? void 0 : npmData['dist-tags'].latest)
      ) {
        return Promise.reject(`${npm} now has't latest version`);
      }
      return npmData === null || npmData === void 0 ? void 0 : npmData['dist-tags'].latest;
    } catch (error) {
      return Promise.reject(`get ${npm} info occurred error: ${error}`);
    }
  });
exports.isUpdateCli = (curVersion, { npmName, registry }) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const latestVersion = yield exports.getNpmLatestVersion(npmName, registry);
    return {
      isNeedUpdate: latestVersion && semver_1.default.lte(latestVersion, curVersion),
      latestVersion,
    };
  });
