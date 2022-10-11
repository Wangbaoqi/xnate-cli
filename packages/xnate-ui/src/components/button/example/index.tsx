import React from 'react'

import Button from '../button'

import './index.scss'

const ButtonDemo = () => {
  return (
    <div className="button-demo">
      <p className="button-demo-title">按钮类型</p>
      <section className="button-demo-box">
        <Button type="default">Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="info">Info</Button>
        <Button type="warning">Warning</Button>
        <Button type="danger">Dangeer</Button>
      </section>
    </div>
  )
}

export default ButtonDemo
