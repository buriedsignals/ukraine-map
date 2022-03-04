import { Helmet } from 'react-helmet'
import { postPathBySlug } from '@/middleware/lib/posts'

import config from '../../../package.json'

export function ArticleJsonLd({ post = {}, siteTitle = '' }) {
  const { homepage = '', faviconPath = '/favicon.ico' } = config
  const { title, slug, excerpt, date, author, modifiedGmt, featuredImage } =
    post
  const path = postPathBySlug(slug)
  const datePublished = !!date && new Date(date)
  const dateModified = !!modifiedGmt && new Date(modifiedGmt)

  /** TODO - As image is a recommended field would be interesting to have a
   * default image in case there is no featuredImage comming from WP,
   * like the open graph social image
   * */

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${homepage}${path}`,
    },
    headline: title,
    image: [featuredImage?.sourceUrl],
    datePublished: datePublished ? datePublished.toISOString() : '',
    dateModified: dateModified
      ? dateModified.toISOString()
      : datePublished.toISOString(),
    description: excerpt,
    copyrightYear: datePublished ? datePublished.getFullYear() : '',
    author: {
      '@type': 'Person',
      name: author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteTitle,
      logo: {
        '@type': 'ImageObject',
        url: `${homepage}${faviconPath}`,
      },
    },
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export function WebsiteJsonLd({ siteTitle = '' }) {
  const { homepage = '' } = config

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    url: homepage,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${homepage}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Helmet encodeSpecialCharacters={false}>
      <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
