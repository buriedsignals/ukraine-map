import { gql } from '@apollo/client'

export const QUERY_ALL_VIDEOS = gql`
  query AllVideos {
    videos(first: 10000) {
      edges {
        node {
          id
          postsVideos {
            videoColor
            videoDesc
            videoGif {
              altText
              sourceUrl
            }
            videoLink {
              title
              url
            }
          }
          slug
          title
        }
      }
    }
  }
`
