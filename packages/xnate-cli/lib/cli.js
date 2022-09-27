'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.cli = void 0;
var os = __importStar(require('os'));
var minimist_1 = __importDefault(require('minimist'));
var dotenv = __importStar(require('dotenv'));
var path_1 = __importDefault(require('path'));
var fs_extra_1 = __importDefault(require('fs-extra'));
var commander_1 = require('commander');
var chalk_1 = __importDefault(require('chalk'));
var cli_shared_utils_1 = require('@xnate/cli-shared-utils');
var commands_1 = require('./commands');
var pkgConfig = require('../package.json');
var log = console.log;
var userHome = os.homedir();
var program = new commander_1.Command();
function checkNodeVersion() {
  var requireNodeVersion = pkgConfig.engines.node;
  if (!cli_shared_utils_1.semver.satisfies(process.version, requireNodeVersion, { includePrerelease: true })) {
    log(
      chalk_1.default.red(
        'you are using Node '
          .concat(process.version, ', xnate-cli need is a node version above ')
          .concat(requireNodeVersion),
      ),
    );
    process.exit(1);
  }
}
function init() {
  return __awaiter(this, void 0, void 0, function () {
    var args, envPath;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // check node version
          checkNodeVersion();
          args = (0, minimist_1.default)(process.argv.slice(2));
          // debug mode
          if (args.debug) {
            process.env.XNATE_CLI_DEBUG = 'on';
            log(chalk_1.default.yellow('xnate-cli is running in debug mode'));
          }
          envPath = path_1.default.resolve(userHome, '.env');
          return [4 /*yield*/, fs_extra_1.default.pathExists(envPath)];
        case 1:
          if (_a.sent()) {
            dotenv.config({
              path: envPath,
            });
          }
          process.env.XNATE_CLI_HOME = '.xnate-cli';
          process.env.XNATE_CLI_CACHE_DIR = 'dependencies';
          process.env.XNATE_CLI_CACHE_MODULES = 'node_modules';
          return [2 /*return*/];
      }
    });
  });
}
function registryCommands() {
  program.version('@xnate-cli/cli '.concat(pkgConfig.version)).usage('<command> [options]');
  program
    .command('init <app-name>')
    .description('generate a project from remote template')
    .option('-p, --packagePath <packagePath>', 'Customize the create project path')
    .option('-f, --force', 'Force overwrite existing directory files')
    .option('-T, --templatePath <templatePath>', 'Customize the template from remote repositories')
    .option('-c, --clone', 'Use git clone when fetching remote repositories')
    .action(commands_1.initCommand);
  program
    .command('gen:ui <app-name>')
    .description('Generates the UI for the specified component')
    .action(commands_1.genUi);
  program.command('dev:ui').description('run xnate ui component development').action(commands_1.devUi);
  program.on('command:*', function (_a) {
    var _b = __read(_a, 1),
      cmd = _b[0];
    log();
    log(chalk_1.default.red('Unknow Command '.concat(chalk_1.default.cyan(cmd))));
    log();
    program.outputHelp();
    process.exit(1);
  });
  program.on('--help', function () {
    log();
    log('  Run '.concat(chalk_1.default.cyan('xnate-cli <command> --help'), ' for usage details of command'));
    log();
  });
  program.commands.forEach(function (c) {
    return c.on('--help', function () {
      return console.log();
    });
  });
  // const extendsErrorMsg = require('./util/extendErrorMsg');
  // extendsErrorMsg('missingArgument', (argName: string) => {
  //   return `Missing required argument <${chalk.yellow(argName)}>`;
  // });
  program.option('-d, --debug', 'Enable debug output').parse(process.argv);
}
/**
 * 1. init stage
 * 2. registry commands stage
 */
function cli() {
  return __awaiter(this, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, init()];
        case 1:
          _a.sent();
          registryCommands();
          return [3 /*break*/, 3];
        case 2:
          error_1 = _a.sent();
          log(error_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
exports.cli = cli;
//# sourceMappingURL=cli.js.map
