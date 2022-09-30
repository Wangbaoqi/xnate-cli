import React, { useEffect } from 'react'

import { Header } from './components'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { inIframe, isPhone } from '../utils'
import RouteView from './routeView'
import config from '@config'

import './index.scss'

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const language = searchParams.get('language')
  const {
    mobile: { redirect = '' },
  } = config

  console.log('render mobile app')

  useEffect(() => {
    if (redirect && pathname === '/') {
      navigate(`/home`)
    }
  }, [])

  return (
    <div className="xnate-site-app">
      <Header />
      <main className="xnate-site-app__container">
        <RouteView />
      </main>
    </div>
  )
}

export default App
