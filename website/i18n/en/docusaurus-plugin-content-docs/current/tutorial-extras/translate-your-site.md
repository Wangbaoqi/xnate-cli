---
sidebar_position: 2
---

## 翻译您的网站

让我们把'docs/intro.md'翻译成法语。

## 配置 i18n

修改'docusaurus.config.js'以添加对'fr'区域设置的支持：

```js title="docusaurus.config.js"

Module.exports = {

I18n：{

defaultLocale：'en'，

地点：['en'，'fr']，

}，

}；

```

## 翻译文档

将“docs/intro.md”文件复制到“i18n/fr”文件夹：

```bash

Mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

Cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md

```

将'i18n/fr/docusaurus-plugin-content-docs/current/intro.md'翻译成法语。

## 启动您的本地化网站

在法语地区启动您的网站：

```bash

Npm run start -- --locale fr

```

您的本地化网站可在[http://localhost:3000/fr/]（http://localhost:3000/fr/）上访问，并翻译“入门”页面。

:::警告

在开发过程中，您只能同时使用一个区域设置。

::：

## 添加区域设置下拉菜单

要跨语言无缝导航，请添加区域设置下拉菜单。

修改'docusaurus.config.js`文件：

```js title="docusaurus.config.js"

Module.exports = {

themeConfig：{

Navbar：{

项目：[

// 亮点开始

{

类型：'localeDropdown'，

}，

// 高亮显示结束

]，

}，

}，

}；

```

区域设置下拉菜单现在显示在您的导航栏中：

！[Locale下拉菜单](./img/localeDropdown.png)

## 构建您的本地化网站

为特定区域设置构建您的网站：

```bash

Npm run build -- --locale fr

```

或者构建您的网站，以同时包含所有区域：

```bash

Npm运行构建

```