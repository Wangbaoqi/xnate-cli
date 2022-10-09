import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getPCLocationInfo } from '../../utils'
import './index.scss'
interface IMobileProps {
  componentsName?: string
  language?: string
  replace?: string
}

const AppMobile = () => {
  const navigate = useNavigate()

  const { language = '', navName = '', secondName } = getPCLocationInfo()
  const componentsName = navName === 'components' ? secondName : 'home'

  useEffect(() => {
    const handler = (event) => {
      const { language: curLanguage, path } = event.data
      if (curLanguage && path) {
        console.log(`/${curLanguage}/components/${path}`, 'envet')
        navigate(`/${language}/components/${path}`)
        // navigate(`/${language}/home`);
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <div className="xnate-site-mobile">
      <div className="xnate-site-mobile__content">
        <iframe id="mobile" src={`http://localhost:8080/mobile.html#/${componentsName}?language=${language}`}></iframe>
      </div>
    </div>
  )
}

export default AppMobile
