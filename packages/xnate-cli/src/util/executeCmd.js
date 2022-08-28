const readline = require('readline');
const { chalk, execa } = require('@xnate/cli-shared-utils');

function toStartOfLine(stream) {
  if (!chalk.supportsColor) {
    stream.write('\r');
    return;
  }
  readline.cursorTo(stream, 0);
}

function renderProgressBar(curr, total) {
  const ratio = Math.min(Math.max(curr / total, 0), 1);
  const bar = ` ${curr}/${total}`;
  const availableSpace = Math.max(0, process.stderr.columns - bar.length - 3);
  const width = Math.min(total, availableSpace);
  const completeLength = Math.round(width * ratio);
  const complete = `#`.repeat(completeLength);
  const incomplete = `-`.repeat(width - completeLength);
  toStartOfLine(process.stderr);
  process.stderr.write(`[${complete}${incomplete}]${bar}`);
}

module.exports = function execCommand(command, args, options, cwd) {
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd,
      stdio: ['inherit', 'inherit', command === 'yarn' ? 'pipe' : 'inherit'],
    });

    if (command === 'yarn') {
      child.stderr.on('data', (chunk) => {
        const str = chunk.toString();
        if (/warning/.test(str)) {
          return;
        }
        const progressBarMatch = str.match(/\[.*\] (\d+)\/(\d+)/);

        if (progressBarMatch) {
          renderProgressBar(progressBarMatch[1], progressBarMatch[2]);
          return;
        }
        process.stderr.write(chunk);
      });
    }

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`command failed: ${'command'} ${cwd}`));
        return;
      }
      resolve();
    });
  });
};
