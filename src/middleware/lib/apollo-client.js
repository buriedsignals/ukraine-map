import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { removeLastTrailingSlash } from '@/middleware/lib/util'

let client

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient()
  }
  return client
}

/**
 * createApolloClient
 */

export function _createApolloClient() {
  console.log('link', process.env.WORDPRESS_GRAPHQL_ENDPOINT)
  return new ApolloClient({
    link: new HttpLink({
      uri: removeLastTrailingSlash(process.env.WORDPRESS_GRAPHQL_ENDPOINT),
    }),
    cache: new InMemoryCache(),
  })
}
