import React, { useMemo } from 'react'
import { ButtonProps } from './propsType'

import clsx from 'clsx'

import './index.scss'

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

  const is_outline = useMemo(() => outline ?? false, [outline])
  const is_block = useMemo(() => block ?? false, [block])
  const is_shape = useMemo(() => shape ?? false, [shape])
  const disabled = useMemo(() => props.disabled ?? false, [props.disabled])

  const cls = clsx(className, 'xn-btn', {
    [`xn-btn--${type}`]: type,
    [`xn-btn--${size}`]: size,
    'xn-btn--disabled': disabled,
    'xn-btn--outline': is_outline,
    'xn-btn--block': is_block,
    'xn-btn--shape': is_shape,
  })

  const iconBox = () => {
    if (icon) {
      return React.cloneElement(icon, {
        className: 'xn-btn-icon',
        size: 16,
      })
    }
    return null
  }

  const textBox = () => {
    return <span className="">{children}</span>
  }

  const content = () => {
    if (type === 'link' && href) {
      return (
        <a href={href} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <div className="xn-btn__content">
        {iconBox()}
        {textBox()}
      </div>
    )
  }

  return (
    <button type={htmlType} className={cls} onClick={onClick} {...rest}>
      {content()}
    </button>
  )
}

export default Button
