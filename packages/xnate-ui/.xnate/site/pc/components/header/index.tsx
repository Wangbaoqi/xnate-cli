import React from 'react'

import './index.scss'

import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { type } from 'os'

type navType = {
  text?: string
  path?: string
  index?: boolean
}
interface IHeader {
  navName?: string
  navList?: navType[]
}

const AppHeader = (props: IHeader) => {
  const { navName, navList = [] } = props

  return (
    <div className="xnate-site-header">
      <div className="xnate-site-header__lead">
        <div className="xnate-site-header__left">
          <div className="xnate-site-header__title">Xnate Design</div>
        </div>
        <nav className="xnate-site-header__nav">
          {navList.map((n, i) => {
            const active = n.path === navName
            console.log(active)

            const headCls = clsx('xnate-site-header__nav-item', { 'xnate-site-header__nav-item--active': active })
            return (
              <span key={i}>
                {n.path ? (
                  <Link className={headCls} to={n.path}>
                    {n.text}
                  </Link>
                ) : (
                  n.text
                )}
              </span>
            )
          })}
        </nav>
      </div>
      <div className="xnate-site-header__tail">
        <div className="xnate-site-header__versions"></div>
        <a className="xnate-site-header__links"></a>
        <a className="xnate-site-header__links"></a>
        <div className="xnate-site-header__theme"></div>
        <div className="xnate-site-header__language"></div>
      </div>
    </div>
  )
}

export default AppHeader
