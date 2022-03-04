const plugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const indexSearch = require('./plugins/search-index')
const feed = require('./plugins/feed')
const sitemap = require('./plugins/sitemap')

function esbuildLoader(config, options) {
  const jsLoader = config.module.rules.find(
    (rule) => rule.test && rule.test.test('.js')
  )
  if (jsLoader && jsLoader.use) {
    if (jsLoader.use.length > 0) {
      jsLoader.use.forEach((e) => {
        e.loader = 'esbuild-loader'
        e.options = options
      })
    } else {
      jsLoader.use.loader = 'esbuild-loader'
      jsLoader.use.options = options
    }
  }
}

const wpConfig = {
  env: {
    WORDPRESS_GRAPHQL_ENDPOINT: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
    WORDPRESS_MENU_LOCATION_NAVIGATION:
      process.env.WORDPRESS_MENU_LOCATION_NAVIGATION || 'PRIMARY',
    WORDPRESS_PLUGIN_SEO: parseEnvValue(
      process.env.WORDPRESS_PLUGIN_SEO,
      false
    ),
    // By default, the number of posts per page used in pagination is 10.
    // This can be modified by setting the variable POSTS_PER_PAGE to a
    // custom number.
    // POSTS_PER_PAGE: 10,

    // The image directory for open graph images will be saved at the location above
    // with `public` prepended. By default, images will be saved at /public/images/og
    // and available at /images/og. If changing, make sure to update the .gitignore

    OG_IMAGE_DIRECTORY: '/images/og',
  },
}
// the config break if we use next export
const nextConfig =
  process.env.EXPORT !== 'true'
    ? {
        ...wpConfig,
        webpack(config, { webpack, dev, isServer }) {
          config.plugins.push(
            new webpack.ProvidePlugin({
              React: 'react',
            })
          )
          // use esbuild in dev for faster HMR
          if (dev) {
            esbuildLoader(config, {
              loader: 'jsx',
              target: 'es2017',
            })
            // config.optimization.minimizer.shift()
          }

          // audio support
          config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            exclude: config.exclude,
            use: [
              {
                loader: require.resolve('url-loader'),
                options: {
                  limit: config.inlineImageLimit,
                  fallback: require.resolve('file-loader'),
                  publicPath: `${config.assetPrefix}/_next/static/images/`,
                  outputPath: `${isServer ? '../' : ''}static/images/`,
                  name: '[name]-[hash].[ext]',
                  esModule: config.esModule || false,
                },
              },
            ],
          })

          config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'glslify-loader'],
          })

          return config
        },
      }
    : {
        ...wpConfig,
      }

// manage i18n
if (process.env.EXPORT !== 'true') {
  nextConfig.i18n = {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  }
}
const seoPlugins =
  process.env.EXPORT === 'true' ? [[indexSearch], [feed], [sitemap]] : []

module.exports = plugins(
  [
    ...seoPlugins,
    // [
    //   withOffline,
    //   {
    //     workboxOpts: {
    //       swDest: process.env.NEXT_EXPORT
    //         ? 'service-worker.js'
    //         : 'static/service-worker.js',
    //       runtimeCaching: [
    //         {
    //           urlPattern: /^https?.*/,
    //           handler: 'NetworkFirst',
    //           options: {
    //             cacheName: 'offlineCache',
    //             expiration: {
    //               maxEntries: 200,
    //             },
    //           },
    //         },
    //       ],
    //     },
    //     async rewrites() {
    //       return [
    //         {
    //           source: '/service-worker.js',
    //           destination: '/_next/static/service-worker.js',
    //         },
    //       ]
    //     },
    //   },
    // ],
    withBundleAnalyzer,
  ],
  nextConfig
)

/**
 * parseEnv
 * @description Helper function to check if a variable is defined and parse booelans
 */

function parseEnvValue(value, defaultValue) {
  if (typeof value === 'undefined') return defaultValue
  if (value === true || value === 'true') return true
  if (value === false || value === 'false') return false
  return value
}
