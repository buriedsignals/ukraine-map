import React from 'react'
import Dom from '@/components/layout/_dom'

import '@/styles/index.css'

function Layout({ children }) {
  return <Dom>{children}</Dom>
}

function App({ Component, pageProps = {} }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
