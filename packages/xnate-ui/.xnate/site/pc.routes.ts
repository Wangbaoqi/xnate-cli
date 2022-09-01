export default [
  {
    path: '/components/button',
    // @ts-ignore
    component: () => import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/docs/intro.md'),
  },
  {
    path: '/components/cell',
    // @ts-ignore
    component: () => import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/docs/usage.md'),
  },
  {
    path: '/components/icon',
    // @ts-ignore
    component: () =>
      import('/Users/wangbaoqi/personal/xnate-cli/xnate-cli/packages/xnate-ui/src/components/button/docs/index.md'),
  },
]
