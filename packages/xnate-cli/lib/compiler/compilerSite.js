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
var __read =
  (this && this.__read) ||
  function (o, n) {
    var m = typeof Symbol === 'function' && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
      r,
      ar = [],
      e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error: error };
    } finally {
      try {
        if (r && !r.done && (m = i['return'])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.compileSite = exports.getRootFilePath = exports.getRootRoutePath = void 0;
var constant_1 = require('./../shared/constant');
var fs_extra_1 = require('fs-extra');
var xnate_config_1 = require('../config/xnate.config');
var constant_2 = require('../shared/constant');
var fs_1 = require('../shared/fs');
var lodash_1 = require('lodash');
var slash_1 = __importDefault(require('slash'));
var ROOT_DOCS_RE = /\/docs\/([-\w]+)\/([-\w]+).([-\w]+)\.md/;
var COMPONENT_DOCS_RE = /\/([-\w]+)\/docs\/([-\w]+)\.md/;
var ROOT_LOCALE_RE = /\/pages\/([-\w]+)\/locale\/([-\w]+)\.ts/;
var EXAMPLE_COMPONENT_NAME_RE = /\/([-\w]+)\/example\/index.tsx/;
var getRootDocPath = function (path) {
  var _a;
  var _b = __read((_a = path.match(ROOT_DOCS_RE)) !== null && _a !== void 0 ? _a : [], 4),
    type = _b[1],
    routePath = _b[2],
    language = _b[3];
  return '/'.concat(language, '/').concat(type, '/').concat(routePath);
};
var getComponentsDocPath = function (path) {
  var _a;
  var _b = __read((_a = path.match(COMPONENT_DOCS_RE)) !== null && _a !== void 0 ? _a : [], 3),
    routePath = _b[1],
    language = _b[2];
  return '/'.concat(language, '/components/').concat(routePath);
};
var getExampleRoutePath = function (path) {
  var _a;
  return '/' + ((_a = path.match(EXAMPLE_COMPONENT_NAME_RE)) === null || _a === void 0 ? void 0 : _a[1]);
};
var getRootRoutePath = function (rootLocalePath) {
  var _a;
  var _b = __read((_a = rootLocalePath.match(ROOT_LOCALE_RE)) !== null && _a !== void 0 ? _a : [], 3),
    routePath = _b[1],
    language = _b[2];
  return '/'.concat(language, '/').concat(routePath);
};
exports.getRootRoutePath = getRootRoutePath;
var getRootFilePath = function (rootLocalePath) {
  return rootLocalePath.replace(/locale\/.+/, constant_1.DIR_INDEX);
};
exports.getRootFilePath = getRootFilePath;
var getExamples = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        (0, fs_1.glob)(
          ''
            .concat(constant_1.SRC_DIR_COMPONENTS, '/**/')
            .concat(constant_1.EXAMPLE_DIR_NAME, '/')
            .concat(constant_1.DIR_INDEX),
        ),
      ];
    });
  });
};
var getComponentsDocs = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [
        2 /*return*/,
        (0, fs_1.glob)(''.concat(constant_1.SRC_DIR_COMPONENTS, '/**/').concat(constant_1.DOCS_DIR_NAME, '/*.md')),
      ];
    });
  });
};
var getRootDocs = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/, (0, fs_1.glob)(''.concat(constant_1.ROOT_DOCS_DIR, '/**/*.md'))];
    });
  });
};
var getRootLocales = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var defaultLanguage, userPages, baseLocales, userLocales, map;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          defaultLanguage = (0, lodash_1.get)((0, xnate_config_1.resolveXnateConfig)(), 'defaultLanguage');
          return [4 /*yield*/, (0, fs_1.glob)(''.concat(constant_1.ROOT_PAGES_DIR, '/*'))];
        case 1:
          userPages = _a.sent();
          return [
            4 /*yield*/,
            (0, fs_1.glob)(''.concat(constant_2.SITE, '/pc/pages/**/').concat(constant_1.LOCALE_DIR_NAME, '/*.ts')),
          ];
        case 2:
          baseLocales = _a.sent();
          return [
            4 /*yield*/,
            userPages.reduce(function (userLocales, page) {
              return __awaiter(void 0, void 0, void 0, function () {
                var locales;
                var _a;
                return __generator(this, function (_b) {
                  switch (_b.label) {
                    case 0:
                      if (!(0, fs_1.isDir)(page)) return [3 /*break*/, 3];
                      return [
                        4 /*yield*/,
                        (0, fs_1.glob)(''.concat(page, '/').concat(constant_1.LOCALE_DIR_NAME, '/*.ts')),
                      ];
                    case 1:
                      locales = _b.sent();
                      if (!locales.length)
                        locales.push(
                          ''.concat(page, '/').concat(constant_1.LOCALE_DIR_NAME, '/').concat(defaultLanguage, '.ts'),
                        );
                      return [4 /*yield*/, userLocales];
                    case 2:
                      (_a = _b.sent()).push.apply(_a, __spreadArray([], __read(locales), false));
                      _b.label = 3;
                    case 3:
                      return [2 /*return*/, userLocales];
                  }
                });
              });
            }, Promise.resolve([])),
          ];
        case 3:
          userLocales = _a.sent();
          map = new Map();
          baseLocales.forEach(function (locale) {
            var _a;
            var _b = __read((_a = locale.match(ROOT_LOCALE_RE)) !== null && _a !== void 0 ? _a : [], 3),
              routePath = _b[1],
              language = _b[2];
            map.set(
              routePath + language,
              (0, slash_1.default)(
                ''.concat(constant_1.SITE_PC_DIR, '/pages/').concat(routePath, '/locale/').concat(language, '.ts'),
              ),
            );
          });
          userLocales.forEach(function (locale) {
            var _a;
            var _b = __read((_a = locale.match(ROOT_LOCALE_RE)) !== null && _a !== void 0 ? _a : [], 3),
              routePath = _b[1],
              language = _b[2];
            map.set(routePath + language, locale);
          });
          return [2 /*return*/, Promise.resolve(Array.from(map.values()))];
      }
    });
  });
};
var compileMobileSiteRoutes = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var examples, routes, source;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, getExamples()];
        case 1:
          examples = _a.sent();
          routes = examples.map(function (example) {
            return "\n  {\n    path: '"
              .concat(getExampleRoutePath(example), "',\n    // @ts-ignore\n    component: () => import('")
              .concat(example, "')\n  }");
          });
          source = 'export default [    '.concat(routes.join(','), '\n]');
          return [4 /*yield*/, (0, fs_1.outputFileSyncOnChange)(constant_1.SITE_MOBILE_ROUTES, source)];
        case 2:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
var compilePcSiteRoutes = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, componentsDocs, rootDoc, rootLocales, rootPagesRoutes, rootDocsRoutes, componentDocsRoutes, source;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/, Promise.all([getComponentsDocs(), getRootDocs(), getRootLocales()])];
        case 1:
          (_a = __read.apply(void 0, [_b.sent(), 3])),
            (componentsDocs = _a[0]),
            (rootDoc = _a[1]),
            (rootLocales = _a[2]);
          rootPagesRoutes = rootLocales.map(function (rootLocale) {
            return "\n  {\n    path: '"
              .concat((0, exports.getRootRoutePath)(rootLocale), "',\n    // @ts-ignore\n    component: () => import('")
              .concat((0, exports.getRootFilePath)(rootLocale), "')\n  }");
          });
          rootDocsRoutes = rootDoc.map(function (doc) {
            return "\n  {\n    path: '"
              .concat(getRootDocPath(doc), "',\n    // @ts-ignore\n    component: () => import('")
              .concat(doc, "')\n  }");
          });
          componentDocsRoutes = componentsDocs.map(function (doc) {
            return "\n  {\n    path: '"
              .concat(getComponentsDocPath(doc), "',\n    // @ts-ignore\n    component: () => import('")
              .concat(doc, "')\n  }");
          });
          source = 'export default [    '.concat(
            __spreadArray(
              __spreadArray(__spreadArray([], __read(rootPagesRoutes), false), __read(rootDocsRoutes), false),
              __read(componentDocsRoutes),
              false,
            ),
            ',\n]',
          );
          (0, fs_1.outputFileSyncOnChange)(constant_2.SITE_PC_ROUTES, source);
          return [2 /*return*/];
      }
    });
  });
};
var compileSiteSource = function () {
  return (0, fs_extra_1.copy)(constant_2.SITE, constant_2.SITE_DIR);
};
var compileSite = function () {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // resolve xnate.config
          (0, xnate_config_1.resolveXnateConfig)(true);
          return [4 /*yield*/, Promise.all([compileMobileSiteRoutes(), compilePcSiteRoutes(), compileSiteSource()])];
        case 1:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
};
exports.compileSite = compileSite;
//# sourceMappingURL=compilerSite.js.map
