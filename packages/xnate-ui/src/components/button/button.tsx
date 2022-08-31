import React, { useMemo } from 'react'
import { ButtonProps } from './propsType'

import './index.less'

const Button: React.FC<ButtonProps> = (props) => {
  const {
    type = 'default',
    htmlType = 'button',
    className,
    block,
    shape,
    size,
    href,
    loading,
    outline,
    icon,
    children,
    onClick,
    ...rest
  } = props

  return <button type={htmlType}>btn</button>
}

export default Button
