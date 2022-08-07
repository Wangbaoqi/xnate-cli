
const { spawn } = require('child_process');




exports.isWin = process.platform === 'win32';
exports.isMac = process.platform === 'darwin';
exports.isLinux = process.platform === 'linux';



exports.execCommand = (cmd, args, options = {}) => {
  const command = exports.isWin ? 'cmd' : cmd;
  const commandArgs = exports.isWin ? ['/c', cmd, ...args] : args;

  return spawn(command, commandArgs, options)
}
