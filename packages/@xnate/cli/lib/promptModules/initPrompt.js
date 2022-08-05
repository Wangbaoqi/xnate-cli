
const inquirer = require('inquirer');


exports.typePrompt = {
  type: 'list',
  name: 'initType',
  message: 'please select a init template type',
  default: 'normal',
  choices: [
    {
      name: 'normal',
      value: 'normal'
    }, {
      name: 'customize',
      value: 'custom'
    }
  ]
}

exports.versionPrompt = {
  type: 'input',
  name: 'version',
  message: 'please input a init version',
  default: '1.0.0',
  validate: function () {
    return true
  },
  filter: function (v) {
    return v
  }
}

exports.templatePrompt = (tmpList) => {
  const tmp_project = tmpList.filter(p => p.type === 'project');
  const tmp_component = tmpList.filter(p => p.type === 'component');
  return {
    type: 'list',
    name: 'templateName',
    message: 'please pick a template',
    default: '',
    choices: [...tmp_project, new inquirer.Separator(), ...tmp_component]
  }
}

exports.registryPrompt = () => { 
  return {
    type: 'list',
    name: 'registry',
    message: 'please pick a registry for installation',
    default: '',
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
      }
    ]
  }
}