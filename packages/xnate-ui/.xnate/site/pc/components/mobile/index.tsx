import React from 'react'

import './index.scss'

const AppMobile = () => {
  return (
    <div className="xnate-site-mobile">
      <div className="xnate-site-mobile__content">
        <iframe id="mobile" src={`http://localhost:8081/mobile.html`}></iframe>
      </div>
    </div>
  )
}

export default AppMobile
