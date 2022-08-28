import chalk from 'chalk';

export const logger = {
  info(text: string): void {
    console.log(text);
  },
  success(text: string): void {
    console.log(chalk.hex('#00c48f')(text));
  },
  warning(text: string) {
    console.log(chalk.hex('#ff9800')(text));
  },
  error(text: string) {
    console.log(chalk.hex('#f44336')(text));
  },
};
