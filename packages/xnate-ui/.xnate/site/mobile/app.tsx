import React, { useEffect } from 'react'

import { get } from 'lodash-es'
import { Header } from './components'
import { useParams, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { getAllComponents } from './utils'
import RouteView from './routeView'

import config from '@config'

import './index.scss'

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const {
    pc: {
      navs = [],
      menu: { components = [] },
    },
    mobile: { redirect = '', title = '', header = {} },
    defaultLanguage = '',
  } = config

  const componentList = getAllComponents(components)

  console.log(componentList, 'mobile components')

  useEffect(() => {
    if (redirect && pathname === '/') {
      navigate(`/home`)
    }
  }, [])

  return (
    <div className="xnate-site-app">
      {/* <Header /> */}
      <main className="xnate-site-app__container">
        <RouteView />
      </main>
    </div>
  )
}

export default App
