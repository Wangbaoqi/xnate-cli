exports.typePrompt = () => {
  return {
    type: 'list',
    name: 'type',
    message: 'please select a init template type',
    default: 'project',
    choices: [
      {
        name: 'project',
        value: 'project',
      },
      {
        name: 'component',
        value: 'component',
      },
    ],
  };
};

exports.versionPrompt = {
  type: 'input',
  name: 'version',
  message: 'please input a init version',
  default: '1.0.0',
  validate: function () {
    return true;
  },
  filter: function (v) {
    return v;
  },
};

exports.templatePrompt = (tmpList) => {
  const tmp_project = tmpList.filter((p) => p.type === 'project');
  const tmp_component = tmpList.filter((p) => p.type === 'component');
  return {
    type: 'list',
    name: 'templateName',
    message: 'please pick a template for your project',
    default: '',
    choices: tmpList,
  };
};

exports.registryPrompt = () => {
  return {
    type: 'list',
    name: 'registry',
    message: 'please pick a registry for download template',
    default: 'taobao',
    choices: [
      {
        name: 'npm',
        value: 'npm',
      },
      {
        name: 'taobao',
        value: 'taobao',
      },
      {
        name: 'yarn',
        value: 'yarn',
      },
    ],
  };
};

exports.pkmPrompt = () => {
  return {
    type: 'list',
    name: 'pkmbin',
    message: 'please pick a package manager to use when install dependencies',
    default: 'yarn',
    choices: [
      {
        name: 'Use NPM',
        value: 'npm',
      },
      {
        name: 'Use PNPM',
        value: 'pnpm',
      },
      {
        name: 'Use Yarn',
        value: 'yarn',
      },
    ],
  };
};
