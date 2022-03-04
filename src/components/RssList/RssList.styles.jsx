import { colorMain } from '@/helpers/styles'
import styled, { css } from 'styled-components'

export const LatestList = styled.ul`
  li {
    &:not(:last-child) {
      margin-bottom: 16.5px;
      padding-bottom: 16.5px;
      border-bottom: 1.5px solid rgba(255, 255, 255, 0.1);
    }
    div {
      display: flex;
      justify-content: space-between;
    }
    a {
      color: ${colorMain};
      text-decoration: underline;
    }
  }
`
