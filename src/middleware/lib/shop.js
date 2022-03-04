import { getApolloClient } from '@/middleware/lib/apollo-client'

import { QUERY_PAGE_SHOP } from '@/middleware/data/shop'

/**
 * getPageShop
 */

export async function getPageShop() {
  const apolloClient = getApolloClient()

  const data = await apolloClient.query({
    query: QUERY_PAGE_SHOP,
  })

  const page = data?.data.page

  return {
    page: page,
  }
}
