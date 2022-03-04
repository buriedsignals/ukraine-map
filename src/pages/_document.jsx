import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Helmet } from 'react-helmet'
import Header from '@/config'

// Via https://github.com/vercel/next.js/blob/canary/examples/with-react-helmet/pages/_document.js

const title = 'Ukraine Conflict Monitor'
const url = 'https://ukraine-map.vercel.app/'
const description =
  'A dashboard using RSS, Twitter and Maps to monitor the war in Ukraine'
const author = 'Buried Signals'

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args)
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() }
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map((el) => this.props.helmet[el].toComponent())
  }

  render() {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var DEV_TOOLS = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;            
              if (typeof DEV_TOOLS === "object") DEV_TOOLS.inject = function () {};
            `,
          }}
        />

        <Head>
          {/* Recommended Meta Tags */}
          <meta charSet='utf-8' />
          <meta name='language' content='english' />
          <meta httpEquiv='content-type' content='text/html' />
          <meta name='author' content={author} />
          <meta name='designer' content={author} />
          <meta name='publisher' content={author} />

          {/* Search Engine Optimization Meta Tags */}
          <title>{title}</title>
          <meta name='description' content={description} />
          <meta name='keywords' content='Buried Signals' />
          <meta name='robots' content='index,follow' />
          <meta name='distribution' content='web' />
          {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
          <meta name='og:title' content={title} />
          <meta name='og:type' content='site' />
          <meta name='og:url' content={url} />
          <meta name='og:image' content={'/icons/share.png'} />
          <meta name='og:site_name' content={title} />
          <meta name='og:description' content={description} />

          <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
          <link
            rel='apple-touch-icon'
            sizes='16x16'
            href='/icons/favicon-16x16.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='32x32'
            href='/icons/favicon-32x32.png'
          />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/icons/apple-touch-icon.png'
          />
          <link rel='manifest' href='/manifest.json' />
          <link
            rel='mask-icon'
            color='#000000'
            href='/icons/safari-pinned-tab.svg'
          />
          <link rel='apple-touch-startup-image' href='/startup.png' />

          {/* Meta Tags for HTML pages on Mobile */}
          {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
          <meta
            name='viewport'
            content='width=device-width, minimum-scale=1, initial-scale=1.0'
          />
          <meta name='theme-color' content='#000' />
          <link rel='shortcut icon' href='/icons/favicon.ico' />

          {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
          <meta name='twitter:card' content='summary' />
          <meta name='twitter:site' content='@buriedsignals' />
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
