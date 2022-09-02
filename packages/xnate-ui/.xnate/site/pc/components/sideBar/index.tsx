import React from 'react'
import { Link, To } from 'react-router-dom'

import { Cell } from '../../../components/index'

import clsx from 'clsx'
import './index.scss'
import { MenuType } from '../../utils'

import { useNavigate } from 'react-router-dom'

interface IMenu {
  text?: string
  path?: string
  type?: number
}

interface ISidebar {
  menuName?: string
  navName?: string
}
const guideMenu = [
  {
    text: '开始',
    path: '/guides/intro',
  },
  {
    text: '按需引入',
    path: '/guides/usage',
  },
  {
    text: '主题',
    path: '/guides/theme',
  },
]

const componentsMenu: IMenu[] = [
  {
    text: '基础组件',
    type: 1,
  },
  {
    text: 'Button 按钮',
    type: 2,
    path: 'button',
  },
  {
    text: 'Cell 单元格',
    type: 2,
    path: 'cell',
  },
  {
    text: 'Icon 图标',
    type: 2,
    path: 'icon',
  },
]

const AppSideBar = (props: ISidebar) => {
  const { menuName, navName } = props
  const navigate = useNavigate()

  console.log(menuName, navName)

  const menu = navName

  const toComDoc = (path: To | undefined) => {
    path && navigate(`/zh-CN/components/${path}`)
  }
  return (
    <div className="xnate-site-sidebar">
      {componentsMenu.map((m, i) => {
        const itemCls = clsx(
          'xnate-site-sidebar__item',
          { 'xnate-site-sidebar__title': m.type === MenuType.TITLE },
          { 'xnate-site-sidebar__link': m.type !== MenuType.TITLE },
          { 'xnate-site-sidebar__item--active': m.path === menuName }
        )
        return (
          <Cell key={i} className={itemCls} changeRoute={() => toComDoc(m.path)}>
            {m.type === MenuType.TITLE ? (
              <span className="xnate-site-sidebar__item--title">{m.text}</span>
            ) : (
              <span>{m.text}</span>
            )}
          </Cell>
        )
      })}
    </div>
  )
}

export default AppSideBar
