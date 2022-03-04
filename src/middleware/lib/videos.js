import { getApolloClient } from '@/middleware/lib/apollo-client'

import { QUERY_ALL_VIDEOS } from '@/middleware/data/videos'

/**
 * getAllVideos
 */

export async function getAllVideos() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: QUERY_ALL_VIDEOS,
  })

  const videos = data?.data.videos.edges.map(({ node = {} }) => node)

  return {
    videos: Array.isArray(videos) && videos,
  }
}
