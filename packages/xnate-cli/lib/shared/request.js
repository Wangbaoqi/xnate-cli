'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.request = void 0;
var node_fetch_1 = __importDefault(require('node-fetch'));
exports.request = {
  get: function (url, opt) {
    if (opt === void 0) {
      opt = {};
    }
    var fetchOpts = __assign({ method: 'GET', timeout: 5000 }, opt);
    return (0, node_fetch_1.default)(url, fetchOpts).then(function (response) {
      return response.json();
    });
  },
};
