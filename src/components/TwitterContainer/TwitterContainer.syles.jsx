import styled, { css } from 'styled-components'
import { BannerHeader } from '../Home/Home.syles'
import { colorMain, colorGreyDark } from '@/helpers/styles'

export const BannerHeaderTwitter = styled(BannerHeader)`
  border-left: 1.5px solid rgba(255, 255, 255, 0.1);
  border-right: 1.5px solid rgba(255, 255, 255, 0.1);
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
  &.isLess {
    &::after {
      display: none;
    }
  }
`

export const ModalTwitter = styled.div`
  background: ${colorGreyDark};
`
