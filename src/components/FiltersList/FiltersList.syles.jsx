import styled, { css } from 'styled-components'

export const ListFilters = styled.ul`
  display: flex;
  li {
    margin-left: 10.5px;
    button {
      opacity: 0.5;
      &.isActive {
        opacity: 1;
      }
    }
  }
`
