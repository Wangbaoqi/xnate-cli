import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './Layout'

import RouteView from './routeView'

function App() {
  return (
    <>
      <Layout>
        <RouteView />
      </Layout>
    </>
  )
}

export default App
