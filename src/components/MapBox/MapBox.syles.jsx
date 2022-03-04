import styled, { css } from 'styled-components'

export const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 65px);
  .mapboxgl-popup-tip {
    display: none;
  }
  .mapboxgl-popup-close-button {
    margin: 7.5px;
    color: white;
    font-size: 20px;
    line-height: 0.5;
  }
  .mapboxgl-popup-content {
    display: flex;
    width: 305px;
    padding: inherit;
    background-color: inherit;
    box-shadow: inherit;
    .icon {
      position: relative;
      width: 50px;
      height: 50px;
      box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3D(-50%, -50%, 0);
      }
    }
    .panel {
      width: 255px;
      background: #ffffff;
      box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
      img,
      iframe {
        width: 255px;
        height: 156px;
      }
      .line {
        width: 100%;
        height: 5px;
      }
      .content {
        padding: 17.5px 15px;
        p,
        h3 {
          color: #525252;
          font-familly: Inter, sans-serif;
        }
        .date {
          padding-bottom: 5px;
        }
        .date,
        .source {
          font-style: normal;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: -0.02em;
        }
        .title {
          width: 80%;
          padding-bottom: 17.5px;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          letter-spacing: -0.02em;
        }
        .description {
          padding-bottom: 17.5px;
          font-style: normal;
          font-weight: 300;
          font-size: 12px;
          letter-spacing: -0.02em;
        }
        .source {
          a {
            text-decoration: underline;
          }
        }
      }
    }
  }
`
