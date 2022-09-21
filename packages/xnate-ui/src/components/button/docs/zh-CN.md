# Button 按钮

## 介绍

按钮用于触发一个操作，如提交表单。

## 引入

```js
import { Button } from 'react-vant';
```

## 代码演示

### 按钮类型

按钮支持 `default`、`primary`、`info`、`warning`、`danger` 五种类型，默认为 `default`。

```tsx
 <div className='demo-button'>
  <Button type='primary'>Primary</Button>
  <Button type='info'>Info</Button>
  <Button type='default'>Default</Button>
  <Button type='warning'>Warning</Button>
  <Button type='danger'>Dangeer</Button>
</div>
```

### 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。