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
exports.initCommand = exports.init = void 0;
var fs_extra_1 = __importDefault(require('fs-extra'));
var inquirer_1 = __importDefault(require('inquirer'));
var path_1 = __importDefault(require('path'));
var validate_npm_package_name_1 = __importDefault(require('validate-npm-package-name'));
var minimist_1 = __importDefault(require('minimist'));
var chalk_1 = __importDefault(require('chalk'));
// import Initial from '../create/Initial';
var log_1 = require('../shared/log');
var init = function (name, options) {
  return __awaiter(void 0, void 0, void 0, function () {
    var cwd, projectName, targetDir, _a, validForNewPackages, errors, warnings, confirmDelete;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          cwd = options.packagePath || process.cwd();
          projectName = name;
          targetDir = path_1.default.resolve(cwd, projectName || '.');
          (_a = (0, validate_npm_package_name_1.default)(projectName)),
            (validForNewPackages = _a.validForNewPackages),
            (errors = _a.errors),
            (warnings = _a.warnings);
          // validate project name
          if (!validForNewPackages) {
            console.error(chalk_1.default.red('Invalid projectName: '.concat(projectName)));
            errors &&
              errors.forEach(function (error) {
                return console.error(chalk_1.default.red.bold('Error: '.concat(error)));
              });
            warnings &&
              warnings.forEach(function (warn) {
                return console.error(chalk_1.default.yellow.bold('Warning: '.concat(warn)));
              });
            process.exit(1);
          }
          if (!fs_extra_1.default.existsSync(targetDir)) return [3 /*break*/, 5];
          if (!options.force) return [3 /*break*/, 2];
          return [4 /*yield*/, fs_extra_1.default.remove(targetDir)];
        case 1:
          _b.sent();
          return [3 /*break*/, 5];
        case 2:
          return [
            4 /*yield*/,
            inquirer_1.default.prompt({
              type: 'confirm',
              name: 'confirmDelete',
              message: 'projectName '.concat(
                chalk_1.default.cyan.bold(projectName),
                ' already exists, Are you sure you delete it?',
              ),
              default: false,
            }),
          ];
        case 3:
          confirmDelete = _b.sent().confirmDelete;
          if (!confirmDelete) {
            process.exit(1);
          }
          console.log('\nRemoving '.concat(chalk_1.default.cyan(targetDir), '...'));
          return [4 /*yield*/, fs_extra_1.default.remove(targetDir)];
        case 4:
          _b.sent();
          _b.label = 5;
        case 5:
          return [2 /*return*/];
      }
    });
  });
};
exports.init = init;
var initCommand = function (name, options) {
  return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if ((0, minimist_1.default)(process.argv.slice(3))._.length > 1) {
            log_1.logger.warning(
              'WARNING: You provide more than a argument, first argument should is <init>, rest is ignored',
            );
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4 /*yield*/, (0, exports.init)(name, options)];
        case 2:
          _a.sent();
          return [3 /*break*/, 4];
        case 3:
          error_1 = _a.sent();
          if (error_1 instanceof Error) {
            log_1.logger.error('Error Msg' + error_1.message);
          }
          log_1.logger.error('Error Msg' + error_1);
          return [3 /*break*/, 4];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.initCommand = initCommand;
