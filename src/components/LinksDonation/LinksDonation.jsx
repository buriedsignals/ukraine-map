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
            <Style.DonationLink href='' target='_blank'>
              <IconArrow />
              <TextMedium>Doctor without borders</TextMedium>
            </Style.DonationLink>
          </li>
          <li>
            <Style.DonationLink href='' target='_blank'>
              <IconArrow />
              <TextMedium>Doctor without borders</TextMedium>
            </Style.DonationLink>
          </li>
          <li>
            <Style.DonationLink href='' target='_blank'>
              <IconArrow />
              <TextMedium>Doctor without borders</TextMedium>
            </Style.DonationLink>
          </li>
        </Style.DonationLinksList>
      )}
    </>
  )
}
