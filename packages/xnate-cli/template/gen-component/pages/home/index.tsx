import React from 'react'

import config from '@config'
import en_US from './locale/en-US'
import zh_CN from './locale/zh-CN'

import { getPCLocationInfo } from '../../../../site/pc/utils'

import './index.scss'

const homePack = {
  'en-US': en_US,
  'zh-CN': zh_CN,
} as any

const Home = () => {
  const {
    pc: { title = {} },
    title: siteTitle = '',
  } = config

  const { language = '', navName = '' } = getPCLocationInfo()

  return (
    <div className="xnate-site-home">
      <div className="xnate-site-home__left">
        <h1>{siteTitle}</h1>
        <p className="xnate-site-home__left-desc">{title[language]}</p>
        <div className="xnate-site-left-box">
          <div className="xnate-site-left-start">{homePack[language].started}</div>
          <div></div>
        </div>
      </div>
      <div className="xnate-site-home__right"></div>
    </div>
  )
}

export default Home
