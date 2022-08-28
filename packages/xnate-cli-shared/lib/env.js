'use strict';
// import { spawn } from 'child_process';
Object.defineProperty(exports, '__esModule', { value: true });
exports.isLinux = exports.isMac = exports.isWin = void 0;
exports.isWin = process.platform === 'win32';
exports.isMac = process.platform === 'darwin';
exports.isLinux = process.platform === 'linux';
// export const execCommand = (cmd, args, options = {}) => {
//   const command = exports.isWin ? 'cmd' : cmd;
//   const commandArgs = exports.isWin ? ['/c', cmd, ...args] : args;
//   return spawn(command, commandArgs, options)
// }
