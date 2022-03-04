import { gql } from '@apollo/client'

export const QUERY_TOUR_BY_SLUG = gql`
  query TourBySlug($slug: ID!) {
    tour(id: $slug, idType: SLUG) {
      id
      name
      events {
        edges {
          node {
            slug
            title
            postsEvents {
              eventCity
              eventDate
              eventDesc
              eventReserved
              eventLocation {
                locationLatitude
                locationLongitude
              }
            }
          }
        }
      }
      slug
      taxonomiesTours {
        tourDesc
        tourEndDate
        tourStartDate
      }
    }
  }
`

export const QUERY_TOUR_SEO_BY_SLUG = gql`
  query TourSEOBySlug($slug: ID!) {
    tour(id: $slug, idType: SLUG) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        readingTime
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`

export const QUERY_ALL_TOURS = gql`
  query AllTours {
    tours(first: 10000) {
      edges {
        node {
          taxonomiesTours {
            tourDesc
            tourEndDate
            tourStartDate
          }
          name
          slug
          events {
            edges {
              node {
                slug
                title
                postsEvents {
                  eventCity
                  eventDate
                  eventDesc
                  eventReserved
                  eventLocation {
                    locationLatitude
                    locationLongitude
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
