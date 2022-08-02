---
sidebar_position: 1
---

# manage doc

Docusaurus 可以管理文档的多个版本。

## 创建文档版本

发布项目的 1.0 版本：

```bash

Npm运行docusaurus文档：版本1.0

```

将'docs'文件夹复制到'versioned_docs/version-1.0'中，并创建'versions.json'。

您的文档现在有 2 个版本：

- 1.0 版本文档的`1.0`http://localhost:3000/docs/`

-“当前”在“http://localhost:3000/docs/next/”上，用于**即将发布的文档**

## 添加版本下拉菜单

要在版本之间无缝导航，请添加版本下拉菜单。

修改'docusaurus.config.js`文件：

```js title="docusaurus.config.js"

Module.exports = {

themeConfig：{

Navbar：{

项目：[

// 亮点开始

{

类型：'docsVersionDropdown'，

}，

// 高亮显示结束

]，

}，

}，

}；

```

文档版本下拉菜单显示在您的导航栏中：

！[文档版本下拉菜单](./img/docsVersionDropdown.png)

## 更新现有版本

可以在各自的文件夹中编辑版本化文档：

- `versioned_docs/version-1.0/hello.md` 更新 `http://localhost:3000/docs/hello`

- `docs/hello.md' 更新 `http://localhost:3000/docs/next/hello`
