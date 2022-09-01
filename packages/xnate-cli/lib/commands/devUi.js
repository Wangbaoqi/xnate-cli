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
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.devUi = void 0;
var constant_1 = require('./../shared/constant');
var lodash_1 = require('lodash');
var log_1 = require('../shared/log');
var chokidar_1 = __importDefault(require('chokidar'));
var vite_1 = require('vite');
var fs_extra_1 = require('fs-extra');
var constant_2 = require('../shared/constant');
var compilerSite_1 = require('../compiler/compilerSite');
var xnate_config_1 = require('../config/xnate.config');
var vite_config_1 = require('./../config/vite.config');
var server;
var watchers;
function startServer(force) {
  if (force === void 0) {
    force = true;
  }
  return __awaiter(this, void 0, void 0, function () {
    var isRestart, _a, _b, xnateConfig, viteDevConfig, inlineConfig;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          isRestart = Boolean(server);
          log_1.logger.info(''.concat(isRestart ? 'Res' : 'S', 'tarting server...'));
          _a = server;
          if (!_a) return [3 /*break*/, 2];
          return [4 /*yield*/, server.close()];
        case 1:
          _a = _c.sent();
          _c.label = 2;
        case 2:
          _a;
          _b = watchers;
          if (!_b) return [3 /*break*/, 4];
          return [4 /*yield*/, watchers.close()];
        case 3:
          _b = _c.sent();
          _c.label = 4;
        case 4:
          _b;
          //
          return [4 /*yield*/, (0, compilerSite_1.compileSite)()];
        case 5:
          //
          _c.sent();
          xnateConfig = (0, xnate_config_1.resolveXnateConfig)();
          viteDevConfig = (0, vite_config_1.getDevConfig)(xnateConfig);
          inlineConfig = (0, lodash_1.merge)(viteDevConfig, force ? { server: true } : {});
          console.log(inlineConfig, 'inlineConfig');
          return [4 /*yield*/, (0, vite_1.createServer)(inlineConfig)];
        case 6:
          server = _c.sent();
          return [4 /*yield*/, server.listen()];
        case 7:
          _c.sent();
          server.printUrls();
          if ((0, fs_extra_1.pathExistsSync)(constant_1.XNATE_CONFIG)) {
            watchers = chokidar_1.default.watch(constant_1.XNATE_CONFIG);
            watchers.on('change', function () {
              return startServer(force);
            });
          }
          log_1.logger.info(''.concat(isRestart ? 'Res' : 'S', 'tart successfully!!!'));
          return [2 /*return*/];
      }
    });
  });
}
function devUi() {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          process.env.NODE_ENV = 'development';
          process.env.DEBUG = 'true';
          (0, fs_extra_1.ensureDirSync)(constant_2.SRC_DIR);
          return [4 /*yield*/, startServer()];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
exports.devUi = devUi;
