export default [
  {
    path: '/en-US/home',
    // @ts-ignore
    component: () =>
      import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/.xnate/site/pc/pages/home/index.tsx'),
  },
  {
    path: '/zh-CN/home',
    // @ts-ignore
    component: () =>
      import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/.xnate/site/pc/pages/home/index.tsx'),
  },
  {
    path: '/zh-CN/guide/intro',
    // @ts-ignore
    component: () =>
      import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/docs/guide/intro.zh-CN.md'),
  },
  {
    path: '/zh-CN/guide/usage',
    // @ts-ignore
    component: () =>
      import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/docs/guide/usage.zh-CN.md'),
  },
  {
    path: '/zh-CN/hooks/theme',
    // @ts-ignore
    component: () =>
      import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/docs/hooks/theme.zh-CN.md'),
  },
  {
    path: '/zh-CN/components/button',
    // @ts-ignore
    component: () =>
      import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/src/components/button/docs/zh-CN.md'),
  },
  {
    path: '/zh-CN/guide',
    redirect: '/zh-CN/guide/intro',
  },
  {
    path: '/zh-CN/components',
    redirect: '/zh-CN/components/button',
  },
  {
    path: '/en-US/guide',
    redirect: '/en-US/guide/intro',
  },
  {
    path: '/en-US/components',
    redirect: '/en-US/components/button',
  },
]
