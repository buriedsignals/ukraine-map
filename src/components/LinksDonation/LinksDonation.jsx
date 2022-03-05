import { useRef, useState, useEffect } from 'react'
import * as Style from './LinksDonation.syles'
import { TextMedium } from '../Home/Home.syles'
import IconArrow from '../icons/IconArrow'

export default function LinksDonation() {
  const [open, setOpen] = useState(false)
  return (
    <>
      {!open ? (
        <Style.ButtonDonation
          onClick={() => {
            setOpen(true)
          }}
        >
          Support Ukraine
        </Style.ButtonDonation>
      ) : (
        <Style.DonationLinksList>
          <li>
            <Style.DonationLink
              href='https://crisisrelief.un.org/ukraine-crisis?gclid=CjwKCAiAyPyQBhB6EiwAFUuakqBC_3GjjYdfDiffpI_CEYsLm9lcf_IOoW8AC1x6Yrw4Vl8H_w1mbhoC2eEQAvD_BwE'
              target='_blank'
            >
              <IconArrow />
              <TextMedium>Crisis Relief</TextMedium>
            </Style.DonationLink>
          </li>
          <li>
            <Style.DonationLink
              href='https://www.pah.org.pl/en/'
              target='_blank'
            >
              <IconArrow />
              <TextMedium>Polish Humanitarian Action</TextMedium>
            </Style.DonationLink>
          </li>
          <li>
            <Style.DonationLink
              href='https://www.doctorswithoutborders.org/what-we-do/news-stories/news/msf-assesses-response-ukraine-conflict-escalates'
              target='_blank'
            >
              <IconArrow />
              <TextMedium>Doctor Without Borders</TextMedium>
            </Style.DonationLink>
          </li>
        </Style.DonationLinksList>
      )}
    </>
  )
}
