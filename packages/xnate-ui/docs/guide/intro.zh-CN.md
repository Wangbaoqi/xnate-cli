
### 介绍

Varlet 是一个基于 `Vue3` 开发的 Material 风格移动端组件库，全面拥抱 `Vue3` 生态，由社区建立起来的组件库团队进行维护。

### 特性
- 🚀 提供50+个高质量通用组件 
- 🚀 组件十分轻量
- 💪 由国人开发，完善的中英文文档和后勤保障
- 🛠️ 支持按需引入
- 🛠️ 支持主题定制
- 🌍 支持国际化
- 💡 支持 webstorm，vscode 组件属性高亮
- 💪 支持 SSR
- 💡 支持 Typescript 
- 💪 确保90%以上单元测试覆盖率，提供稳定性保证
- 🛠️ 支持暗黑模式

### 安装

### CDN
`varlet.js` 包含组件库的所有样式和逻辑，引入即可。

```html
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
<script src="https://cdn.jsdelivr.net/npm/@varlet/ui/umd/varlet.js"></script>
<script>
  const app = Vue.createApp({
    template: '<var-button>按钮</var-button>'
  })
  app.use(Varlet).mount('#app')
</script>
```

### Webpack / Vite
```shell
# 通过 npm 或 yarn 或 pnpm 安装

# npm
npm i @varlet/ui -S

# yarn
yarn add @varlet/ui

# pnpm
pnpm add @varlet/ui
```

```js
import App from './App.vue'
import Varlet from '@varlet/ui'
import { createApp } from 'vue'
import '@varlet/ui/es/style.js'

createApp(App).use(Varlet).mount('#app')
```

### 捐赠我们

我们将用捐赠所得去鼓励参与开源的贡献者们，给他们买一杯咖啡奶茶，购置对于项目有帮助基础设施，推动项目变得更好。


### Contributors
