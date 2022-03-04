import { gql } from '@apollo/client'

export const QUERY_PAGE_HOME = gql`
  query PageHome {
    page(id: "29", idType: DATABASE_ID) {
      id
      slug
      pagesHome {
        homeTouractive
      }
    }
  }
`
