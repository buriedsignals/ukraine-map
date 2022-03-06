import styled, { css } from 'styled-components'
import {
  colorMain,
  colorGreyDark,
  colorGrey,
  colorBlack,
  colorWhite,
  colorGreyLight,
} from '@/helpers/styles'
import { down } from 'styled-breakpoints'

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${colorBlack};
  overflow: hidden;
  .mobile-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transform: translate3D(-50%, -50%, 0);
    p {
      margin-top: 10.5px;
      color: ${colorWhite};
    }
  }
  ${down('md')} {
    .mobile-logo {
      display: flex;
    }
    & > * {
      display: none;
    }
  }
`

export const ThreeQuartersContainer = styled.div`
  width: 75vw;
  min-height: 100vh;
`

export const OneQuartersContainer = styled.div`
  width: 25vw;
  min-height: 100vh;
`

export const BannerContainer = styled.div`
  display: flex;
  max-height: 65px;
`

export const BannerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 17.5px;
  color: ${colorGrey};
  background: ${colorGreyDark};
`

export const BannerHeaderMap = styled(BannerHeader)`
  width: 50vw;
`

export const BannerHeaderLosses = styled(BannerHeader)``

export const BannerHeaderLatest = styled(BannerHeader)`
  a {
    padding: 5px 20px;
    color: ${colorBlack};
    background: ${colorGreyLight};
    border-radius: 20px;
  }
`

export const TitlePage = styled.h1`
  display: flex;
  align-items: center;
  color: ${colorMain};
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.02em;
  svg {
    width: 22px;
    height: 22px;
    margin-right: 7.5px;
  }
`

export const SubtitlePage = styled.h2`
  display: flex;
  align-items: center;
  color: ${colorGrey};
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: -0.02em;
  svg {
    margin-right: 10.5px;
  }
`

export const TextMedium = styled.p`
  display: inline-block;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: -0.02em;
`

export const TextSmall = styled.p`
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  letter-spacing: -0.02em;
`

export const MinInfo = styled(TextSmall)`
  color: ${colorGreyLight};
`

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  & > p {
    margin-left: 10.5px;
    margin-top: 3px;
  }
`

export const TwitterContainer = styled.div`
  position: relative;
  width: 25vw;
  z-index: 2;
`

export const ButtonMore = styled.button`
  position: relative;
  width: 25px;
  height: 25px;
  background: ${colorMain};
  border-radius: 100px;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 10px;
    height: 2px;
    background: ${colorGreyDark};
    transform: translate3D(-50%, -50%, 0);
  }
  &::after {
    width: 2px;
    height: 10px;
  }
`

export const ModalTwitter = styled.div`
  background: ${colorGreyDark};
`

export const Panel = styled.div`
  padding: 20px 30px;
  color: ${colorWhite};
  background: ${colorBlack};
`

export const PanelLosses = styled(Panel)``

export const PanelLatest = styled(Panel)`
  height: calc(100vh - 65px - 290px - 65px - 127px);
  padding: 20px 30px;
  overflow: scroll;
`

export const PanelDonation = styled(Panel)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 127px;
  padding: 20px 60px;
`

export const ButtonDonation = styled.button`
  display: none;
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
