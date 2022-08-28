// import { spawn } from 'child_process';
export const isWin = process.platform === 'win32';
export const isMac = process.platform === 'darwin';
export const isLinux = process.platform === 'linux';
// export const execCommand = (cmd, args, options = {}) => {
//   const command = exports.isWin ? 'cmd' : cmd;
//   const commandArgs = exports.isWin ? ['/c', cmd, ...args] : args;
//   return spawn(command, commandArgs, options)
// }
