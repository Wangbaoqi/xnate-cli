import React, { useEffect } from 'react'
import { AppHeader, AppSideBar, AppMobile } from './components/index'
import { useParams, useLocation, Outlet, useNavigate } from 'react-router-dom'

import config from '@config'
import { getPCLocationInfo } from './utils'
import './App.scss'

interface ILayout {
  children?: React.ReactElement
}

const Layout = (props: ILayout) => {
  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { language = '', navName = '' } = getPCLocationInfo()
  const {
    pc: { navs = [], menu = {}, redirect = '' },
    mobile: { redirect: mobileRedirect = '' },
    defaultLanguage = '',
  } = config
  const isHome = navName === 'home'

  const menuList = menu[navName] || []

  console.log('render pc app')

  useEffect(() => {
    if (redirect && pathname === '/') {
      navigate(`${defaultLanguage}${redirect}`)
    }
  }, [])

  return (
    <div className="xnate-site">
      <AppHeader language={language} navList={navs} navName={navName} />
      {isHome ? (
        <>{props.children}</>
      ) : (
        <>
          <AppSideBar language={language} navName={navName} menu={menuList} />
          <div className="xnate-site-container">{props.children}</div>
        </>
      )}
    </div>
  )
}

export default Layout
