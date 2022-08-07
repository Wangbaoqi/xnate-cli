

const EventEmitter = require('events');



class Initial extends EventEmitter {

  constructor(name, options, prompts) {
    this.name = name;
    this.cwd = options.targetPath || process.cwd();

    
  }
}