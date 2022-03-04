import { getApolloClient } from '@/middleware/lib/apollo-client'
import { updateUserAvatar } from '@/middleware/lib/users'

import {
  QUERY_TOUR_BY_SLUG,
  QUERY_TOUR_SEO_BY_SLUG,
  QUERY_ALL_TOURS,
} from '@/middleware/data/tours'

/**
 * tourPathBySlug
 */

export function tourPathBySlug(slug) {
  return `/tours/${slug}`
}

/**
 * getTourBySlug
 */

export async function getTourBySlug(slug) {
  const apolloClient = getApolloClient()
  const apiHost = new URL(process.env.WORDPRESS_GRAPHQL_ENDPOINT).host

  let tourData
  let seoData

  try {
    tourData = await apolloClient.query({
      query: QUERY_TOUR_BY_SLUG,
      variables: {
        slug,
      },
    })
  } catch (e) {
    console.log(
      `[tours][getTourBySlug] Failed to query tour data: ${e.message}`
    )
    throw e
  }

  const tour = [tourData?.data.tour].map(mapTourData)[0]

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (process.env.WORDPRESS_PLUGIN_SEO === true) {
    try {
      seoData = await apolloClient.query({
        query: QUERY_TOUR_SEO_BY_SLUG,
        variables: {
          slug,
        },
      })
    } catch (e) {
      console.log(
        `[tours][getTourBySlug] Failed to query SEO plugin: ${e.message}`
      )
      console.log(
        'Is the SEO Plugin installed? If not, disable WORDPRESS_PLUGIN_SEO in next.config.js.'
      )
      throw e
    }

    const { seo = {} } = seoData?.data?.tour

    tour.metaTitle = seo.title
    tour.metaDescription = seo.metaDesc
    tour.readingTime = seo.readingTime

    // The SEO plugin by default includes a canonical link, but we don't want to use that
    // because it includes the WordPress host, not the site host. We manage the canonical
    // link along with the other metadata, but explicitly check if there's a custom one
    // in here by looking for the API's host in the provided canonical link

    if (seo.canonical && !seo.canonical.includes(apiHost)) {
      tour.canonical = seo.canonical
    }

    tour.og = {
      author: seo.opengraphAuthor,
      description: seo.opengraphDescription,
      image: seo.opengraphImage,
      modifiedTime: seo.opengraphModifiedTime,
      publishedTime: seo.opengraphPublishedTime,
      publisher: seo.opengraphPublisher,
      title: seo.opengraphTitle,
      type: seo.opengraphType,
    }

    tour.article = {
      author: tour.og.author,
      modifiedTime: tour.og.modifiedTime,
      publishedTime: tour.og.publishedTime,
      publisher: tour.og.publisher,
    }

    tour.robots = {
      nofollow: seo.metaRobotsNofollow,
      noindex: seo.metaRobotsNoindex,
    }

    tour.twitter = {
      description: seo.twitterDescription,
      image: seo.twitterImage,
      title: seo.twitterTitle,
    }
  }

  return {
    tour,
  }
}

/**
 * getAllTours
 */

export async function getAllTours() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: QUERY_ALL_TOURS,
  })

  let tours = data?.data.tours.edges.map(({ node = {} }) => node)

  return {
    tours: Array.isArray(tours) && tours.map(mapTourData),
  }
}

/**
 * mapTourData
 */

export function mapTourData(tour = {}) {
  const data = { ...tour }

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

  if (data.events) {
    data.events = data.events.edges.map(({ node = {} }) => node)
  }

  return data
}
