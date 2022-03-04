import { colorBlack, colorMain } from '@/helpers/styles'
import styled, { css } from 'styled-components'

export const ButtonDonation = styled.button`
  margin: 0 auto;
  padding: 10px 40px;
  color: ${colorBlack};
  background: ${colorMain};
  border-radius: 20px;
`

export const DonationLinksList = styled.ul`
  li {
    &:not(:last-child) {
      margin-bottom: 16.5px;
    }
  }
`

export const DonationLink = styled.a`
  display: flex;
  align-items: center;
  color: ${colorMain};
  svg {
    margin-right: 10.5px;
  }
`
