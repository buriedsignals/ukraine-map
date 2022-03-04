import { gql } from '@apollo/client'

export const QUERY_PAGE_SHOP = gql`
  query PageShop {
    page(id: "39", idType: DATABASE_ID) {
      id
      slug
      pagesShop {
        shopBackground {
          altText
          sourceUrl
        }
      }
    }
  }
`
