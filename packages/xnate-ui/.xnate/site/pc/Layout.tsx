import React, { ReactNode } from 'react'
import { AppHeader, AppSideBar, AppMobile } from './components/index'

import { useParams, useLocation } from 'react-router-dom'

import './App.scss'

import RouteView from './routeView'

interface ILayoutProps {
  children?: ReactNode
}

const Layout = (props: ILayoutProps) => {
  const params = useParams()
  const { pathname } = useLocation()
  console.log(params, 'params')
  console.log(location, 'location')

  return (
    <div className="xnate-site">
      <AppHeader navName={pathname} />

      <div className="xnate-site-content">
        <AppSideBar navName={pathname} menuName={params['*']} />

        <div className="xnate-site-doc-container">{props.children}</div>

        <AppMobile />
      </div>
    </div>
  )
}

export default Layout
