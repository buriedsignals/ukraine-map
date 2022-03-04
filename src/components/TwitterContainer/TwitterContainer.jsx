import { useEffect, useState } from 'react'
import useStore from '@/helpers/store'

import * as Style from './TwitterContainer.syles'

import IconTwitter from '../icons/IconTwitter'
import TwitterTimeline from '../TwitterTimeline/TwitterTimeline'

import { SubtitlePage } from '../Home/Home.syles'

export default function TwitterContainer() {
  const openTwitterModal = useStore((state) => state.openTwitterModal)
  return (
    <Style.TwitterContainer>
      <Style.BannerHeaderTwitter>
        <SubtitlePage>
          <IconTwitter />
          Verified posts
        </SubtitlePage>
        <Style.ButtonMore
          className={openTwitterModal && 'isLess'}
          onClick={() => {
            useStore.setState({
              openTwitterModal: !openTwitterModal,
            })
          }}
        />
      </Style.BannerHeaderTwitter>
      <Style.ModalTwitter
        style={{
          display: openTwitterModal ? 'block' : 'none',
        }}
      >
        <TwitterTimeline />
      </Style.ModalTwitter>
    </Style.TwitterContainer>
  )
}
