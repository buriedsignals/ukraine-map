import { useEffect } from 'react'

import * as Style from './TwitterTimeline.syles'

import { TwitterTimelineEmbed } from 'react-twitter-embed'

export default function TwitterTimeline() {
  return (
    <TwitterTimelineEmbed
      sourceType='list'
      id='1499048445713211395'
      options={{
        tweetLimit: '10',
        width: '100%',
        height: 'calc(100vh - 65px)',
      }}
      theme='dark'
      noHeader='true'
      noBorders='true'
      noFooter='true'
    ></TwitterTimelineEmbed>
  )
}
