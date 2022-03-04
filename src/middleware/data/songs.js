import { gql } from '@apollo/client'

export const QUERY_ALL_ALBUMS = gql`
  query AllAlbums {
    albums(first: 10000) {
      edges {
        node {
          albumId
          id
          name
          songs {
            edges {
              node {
                id
                postsSongs {
                  songCredits
                  songIndex
                  songLyrics
                  songAudio {
                    mediaItemUrl
                  }
                }
                title
                songId
                slug
              }
            }
          }
          slug
          taxonomiesAlbums {
            albumDuration
            albumDate
          }
        }
      }
    }
  }
`

export const QUERY_ALBUM_BY_SLUG = gql`
  query AlbumBySlug($slug: ID!) {
    album(id: $slug, idType: SLUG) {
      albumId
      id
      name
      songs {
        edges {
          node {
            id
            postsSongs {
              songCredits
              songIndex
              songLyrics
              songAudio {
                mediaItemUrl
              }
            }
            title
            songId
            slug
          }
        }
      }
      slug
      taxonomiesAlbums {
        albumDuration
        albumDate
      }
    }
  }
`

export const QUERY_ALBUM_SEO_BY_SLUG = gql`
  query AlbumSEOBySlug($slug: ID!) {
    album(id: $slug, idType: SLUG) {
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

export const QUERY_ALL_SONGS = gql`
  query AllSongs {
    songs(first: 10000) {
      edges {
        node {
          albums {
            edges {
              node {
                albumId
                id
                name
                slug
                taxonomiesAlbums {
                  albumDuration
                  albumDate
                }
              }
            }
          }
          id
          postsSongs {
            songCredits
            songIndex
            songLyrics
            songAudio {
              mediaItemUrl
            }
          }
          title
          songId
          slug
        }
      }
    }
  }
`

export const QUERY_SONG_BY_SLUG = gql`
  query SongBySlug($slug: ID!) {
    song(id: $slug, idType: SLUG) {
      albums {
        edges {
          node {
            albumId
            id
            name
            slug
            taxonomiesAlbums {
              albumDuration
              albumDate
            }
          }
        }
      }
      id
      postsSongs {
        songIndex
        songCredits
        songLyrics
        songAudio {
          mediaItemUrl
        }
      }
      title
      songId
      slug
    }
  }
`
export const QUERY_SONG_SEO_BY_SLUG = gql`
  query SongSEOBySlug($slug: ID!) {
    song(id: $slug, idType: SLUG) {
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
