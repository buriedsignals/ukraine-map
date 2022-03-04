import useStore from '@/helpers/store'
import { useRef } from 'react'
import { Helmet } from 'react-helmet'
import useSite from '@/middleware/hooks/use-site'
import { helmetSettingsFromMetadata } from '@/middleware/lib/site'

const HeaderRouteTitle = () => {
  const router = useStore((state) => state.router)
  const { asPath } = router

  // const { homepage, metadata = {} } = useSite()
  const { homepage, metadata = {} } = { homepage: 'test', metadata: {} }

  if (!metadata.og) {
    metadata.og = {}
  }

  metadata.og.url = `${homepage}${asPath}`

  const helmetSettings = {
    defaultTitle: metadata.title,
    titleTemplate:
      process.env.WORDPRESS_PLUGIN_SEO === true
        ? '%s'
        : `%s - ${metadata.title}`,
    ...helmetSettingsFromMetadata(metadata, {
      setTitle: false,
      link: [
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: '/feed.xml',
        },

        // Favicon sizes and manifest generated via https://favicon.io/

        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest',
        },
      ],
    }),
  }

  return <Helmet {...helmetSettings} />
}
const Dom = ({ children }) => {
  const ref = useRef(null)
  useStore.setState({ dom: ref })
  return (
    <div className='dom' ref={ref}>
      <HeaderRouteTitle />
      {children}
    </div>
  )
}

export default Dom
