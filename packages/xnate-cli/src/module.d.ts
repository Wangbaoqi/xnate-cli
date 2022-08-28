import { Command } from 'commander';
declare module 'Command' {
  interface Command {
    [errType: string]: (err: Error) => void;
  }
  export {};
}
