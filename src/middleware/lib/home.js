import { getApolloClient } from '@/middleware/lib/apollo-client'

import { QUERY_PAGE_HOME } from '@/middleware/data/home'

/**
 * getPageHome
 */

export async function getPageHome() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: QUERY_PAGE_HOME,
  })

  const page = data?.data.page

  return {
    page: page,
  }
}
