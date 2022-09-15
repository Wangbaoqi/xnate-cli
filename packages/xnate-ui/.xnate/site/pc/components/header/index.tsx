import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import config from '@config'
import { get } from 'lodash-es'
import './index.scss'

type navType = {
  text?: string
  path?: string
  index?: boolean
}
interface IHeader {
  navName?: string
  navList?: navType[]
  language?: string
}

console.log(config, 'config header')

const AppHeader = (props: IHeader) => {
  const { navName, navList = [], language = '' } = props

  const title = get(config, 'title')
  const logo = get(config, 'logo')
  const themeKey = get(config, 'themeKey')
  const languages = get(config, 'pc.header.i18n')
  const github = get(config, 'pc.header.github')
  const darkMode = get(config, 'pc.header.darkMode')

  return (
    <div className="xnate-site-header">
      <div className="xnate-site-header__lead">
        <div className="xnate-site-header__left">
          <div className="xnate-site-header__title">{title}</div>
        </div>
        <nav className="xnate-site-header__nav">
          {navList.map((n, i) => {
            const active = n.path === navName
            console.log(active)

            const headCls = clsx('xnate-site-header__nav-item', { 'xnate-site-header__nav-item--active': active })
            return (
              <span key={i}>
                {n.path ? (
                  <Link className={headCls} to={`/${language}${n.path}`}>
                    {n.text[language]}
                  </Link>
                ) : (
                  n.text[language]
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
