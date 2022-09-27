'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.getDevConfig = void 0;
var lodash_1 = require('lodash');
var plugin_react_1 = __importDefault(require('@vitejs/plugin-react'));
var vite_react_md_1 = __importDefault(require('@xnate-plugin/vite-react-md'));
var vite_plugin_html_1 = require('vite-plugin-html');
var constant_1 = require('../shared/constant');
var path_1 = require('path');
var getDevConfig = function (xnateConfig) {
  var defaultLanguage = (0, lodash_1.get)(xnateConfig, 'defaultLanguage');
  var host = (0, lodash_1.get)(xnateConfig, 'host');
  return {
    root: constant_1.SITE_DIR,
    resolve: {
      extensions: constant_1.VITE_RESOLVE_EXTENSIONS,
      alias: {
        '@config': constant_1.SITE_CONFIG,
        '@pc-routes': constant_1.SITE_PC_ROUTES,
        '@mobile-routes': constant_1.SITE_MOBILE_ROUTES,
      },
    },
    server: {
      port: (0, lodash_1.get)(xnateConfig, 'port'),
      host: host === 'localhost' ? '0.0.0.0' : host,
    },
    publicDir: constant_1.SITE_PUBLIC_PATH,
    plugins: [
      (0, plugin_react_1.default)(),
      (0, vite_react_md_1.default)({}),
      (0, vite_plugin_html_1.createHtmlPlugin)({
        inject: {
          data: {
            pcTitle: (0, lodash_1.get)(xnateConfig, "pc.title['".concat(defaultLanguage, ']')),
            mobileTitle: (0, lodash_1.get)(xnateConfig, "mobile.title['".concat(defaultLanguage, "']")),
            logo: (0, lodash_1.get)(xnateConfig, 'logo'),
          },
        },
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          main: (0, path_1.resolve)(constant_1.SITE_DIR, 'index.html'),
          mobile: (0, path_1.resolve)(constant_1.SITE_DIR, 'mobile.html'),
        },
      },
    },
  };
};
exports.getDevConfig = getDevConfig;
//# sourceMappingURL=vite.config.js.map
