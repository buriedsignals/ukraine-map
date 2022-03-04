import { getApolloClient } from '@/middleware/lib/apollo-client'

import { updateUserAvatar } from '@/middleware/lib/users'
import { sortObjectsByDate } from '@/middleware/lib/datetime'

import {
  QUERY_ALL_ALBUMS,
  QUERY_ALBUM_BY_SLUG,
  QUERY_ALBUM_SEO_BY_SLUG,
  QUERY_ALBUMS_BY_AUTHOR_SLUG,
} from '@/middleware/data/songs'

/**
 * songPathBySlug
 */

export function songPathBySlug(parent, slug) {
  return `/albums/${parent}/${slug}`
}

/**
 * albumPathBySlug
 */

export function albumPathBySlug(slug) {
  return `/albums/${slug}`
}

/**
 * getAlbumBySlug
 */

export async function getAlbumBySlug(slug) {
  const apolloClient = getApolloClient()
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host

  let albumData
  let seoData

  try {
    albumData = await apolloClient.query({
      query: QUERY_ALBUM_BY_SLUG,
      variables: {
        slug,
      },
    })
  } catch (e) {
    console.log(
      `[albums][getAlbumBySlug] Failed to query album data: ${e.message}`
    )
    throw e
  }

  const album = [albumData?.data.album].map(mapAlbumData)[0]

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_ALBUM_SEO_BY_SLUG,
        variables: {
          slug,
        },
      })
    } catch (e) {
      console.log(
        `[albums][getAlbumBySlug] Failed to query SEO plugin: ${e.message}`
      )
      console.log(
        'Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.'
      )
      throw e
    }

    const { seo = {} } = seoData?.data?.album

    album.metaTitle = seo.title
    album.metaDescription = seo.metaDesc
    album.readingTime = seo.readingTime

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      album.canonical = seo.canonical
    }

    album.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    }

    album.article = {
      author: album.og.author,
      modifiedTime: album.og.modifiedTime,
      publishedTime: album.og.publishedTime,
      publisher: album.og.publisher,
    }

    album.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    }

    album.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    }
  }

  return {
    album,
  }
}

/**
 * getAllAlbums
 */

export async function getAllAlbums() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: QUERY_ALL_ALBUMS,
  })

  const albums = data?.data.albums.edges.map(({ node = {} }) => node)

  return {
    albums: Array.isArray(albums) && albums.map(mapAlbumData),
  }
}

/**
 * getAlbumsByAuthorSlug
 */

export async function getAlbumsByAuthorSlug(slug) {
  const apolloClient = getApolloClient()

  let albumData

  try {
    albumData = await apolloClient.query({
      query: QUERY_ALBUMS_BY_AUTHOR_SLUG,
      variables: {
        slug,
      },
    })
  } catch (e) {
    console.log(`Failed to query album data: ${e.message}`)
    throw e
  }

  const albums = albumData?.data.albums.edges.map(({ node = {} }) => node)

  return {
    albums: Array.isArray(albums) && albums.map(mapAlbumData),
  }
}

/**
 * getRecentAlbums
 */

export async function getRecentAlbums({ count }) {
  const { albums } = await getAllAlbums()
  const sorted = sortObjectsByDate(albums)
  return {
    albums: sorted.slice(0, count),
  }
}

/**
 * sanitizeExcerpt
 */

export function sanitizeExcerpt(excerpt) {
  if (typeof excerpt !== 'string') {
    throw new Error(
      `Failed to sanitize excerpt: invalid type ${typeof excerpt}`
    )
  }

  let sanitized = excerpt

  // If the theme includes [...] as the more indication, clean it up to just ...

  sanitized = sanitized.replace(/\s?\[&hellip;\]/, '&hellip;')

  // If after the above replacement, the ellipsis includes 4 dots, it's
  // the end of a setence

  sanitized = sanitized.replace('....', '.')
  sanitized = sanitized.replace('.&hellip;', '.')

  // If the theme is including a "Continue..." link, remove it

  sanitized = sanitized.replace(/\w*<a class="more-link".*<\/a>/, '')

  return sanitized
}

/**
 * mapAlbumData
 */

export function mapAlbumData(album = {}) {
  const data = { ...album }

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (data.author) {
    data.author = {
      ...data.author.node,
    }
  }

  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  if (data.author?.avatar) {
    data.author.avatar = updateUserAvatar(data.author.avatar)
  }

  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node
  }

  if (data.songs) {
    data.songs = data.songs.edges.map(({ node = {} }) => node)
  }

  return data
}
