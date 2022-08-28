import React, { MouseEvent } from 'react'

export type ButtonSize = 'lg' | 'sm' | 'base' | 'normal'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'info' | 'warning' | 'text'
export type ButtonHTMLTypes = 'submit' | 'button' | 'reset'
export interface BaseButtonProps {
  /**
   * 自定义类名
   * @description       自定义类名
   * @description.en-US customs className
   * @default           null
   */
  className?: string
  /**
   * button type
   * @description       按钮类型，可选值有`primary` `danger` `info` `warning` `text`和 `link`, 默认是'default'
   * @description.en-US button type options `primary` `danger` `info` `warning` `text` and `link`
   * @default           type=default
   */
  type?: ButtonType
  /**
   * 禁用按钮
   * @description       是否禁用按钮
   * @description.en-US disable button
   * @default           false
   */
  disabled?: boolean
  /**
   * 弱按钮
   * @description       弱按钮
   * @description.en-US outline button
   * @default           false
   */
  outline?: boolean
  /**
   * loading button
   * @description       loading button
   * @description.en-US outline button
   * @default           false
   */
  loading?: boolean
  /**
   * block 按钮
   * @description       是否块级按钮
   * @description.en-US is block button
   * @default           false
   */
  block?: boolean
  /**
   * shape 按钮
   * @description       是否为方形按钮
   * @description.en-US is shape button
   * @default           false
   */
  shape?: boolean
  /**
   * size button
   * @description       按钮尺寸，可选项 `lg` `sm`,默认值为`normal`
   * @description.en-US size button, optional `lg` `sm`, default is `normal`
   * @default           normal
   */
  size?: ButtonSize
  /**
   * link button
   * @description       链接按钮
   * @description.en-US link button
   * @default           null
   */
  href?: string
  /**
   * icon button
   * @description       图表按钮
   * @description.en-US icon button
   * @default           null
   */
  icon?: React.ReactElement
  /**
   * children
   * @description       子元素
   * @description.en-US children
   * @default           支持定义默认值
   */
  children?: React.ReactNode
  /**
   * click event
   * @description       点击事件
   * @description.en-US children
   * @default
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type ButtonNativeProps = {
  /**
   * 原生类型
   * @description       原生类型 `button` `submit` 和 `reset`
   * @description.en-US native type  `button` `submit` and `reset`
   * @default           button
   */
  htmlType?: ButtonHTMLTypes
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>
export type ButtonAnchorProps = {
  /**
   * 链接按钮 target
   * @description       如果是链接按钮，新窗口的打开方式 `_self` `_blank` `_top` 和 `_parent`
   * @description.en-US if link button, open way that new window has `_self` `_blank` `_top` and `_parent`
   * @default           button
   */
  target?: string
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<any>, 'type' | 'onClick'>

export type ButtonProps = Partial<ButtonNativeProps & ButtonAnchorProps>
