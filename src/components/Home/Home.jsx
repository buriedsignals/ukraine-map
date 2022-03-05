import * as Style from './Home.syles'

import MapBox from '../MapBox/MapBox'
import TableLosses from '../TableLosses/TableLosses'
import RssList from '../RssList/RssList'
import LinksDonation from '../LinksDonation/LinksDonation'
import TwitterContainer from '../TwitterContainer/TwitterContainer'
import FiltersList from '../FiltersList/FiltersList'
import useStore from '@/helpers/store'
import IconLogo from '../icons/IconLogo'

export default function Home() {
  const updateDateJson = useStore((state) => state.updateDateJson)
  const today = new Date()
  const endDate = new Date(updateDateJson)
  const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24))
  const hours = parseInt((Math.abs(endDate - today) / (1000 * 60 * 60)) % 24)
  const minutes = parseInt(
    (Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60)) % 60
  )
  let lastUpdate = ''
  if (days > 0) {
    lastUpdate = days + ' day'
    lastUpdate += days > 1 ? 's' : ''
  } else {
    if (hours > 0) {
      lastUpdate = hours + ' hour'
      lastUpdate += hours > 1 ? 's' : ''
    } else {
      lastUpdate = minutes + ' min'
      lastUpdate += minutes > 1 ? 's' : ''
    }
  }
  return (
    <Style.PageContainer>
      <div className='mobile-logo'>
        <IconLogo />
        <Style.TextMedium>
          Please use a desktop to access the conflict monitor.
        </Style.TextMedium>
      </div>
      <Style.ThreeQuartersContainer>
        <Style.BannerContainer>
          <Style.BannerHeaderMap>
            <Style.TitlePage>
              <a
                href='https://buriedsignals.com/'
                target='_blank'
                rel='noreferrer'
              >
                <IconLogo />
              </a>
              Ukraine Conflict Monitor
            </Style.TitlePage>
            <Style.FiltersContainer>
              <Style.TextMedium>Filters :</Style.TextMedium>
              <FiltersList />
              <Style.MinInfo>Updated 2 hours ago</Style.MinInfo>
            </Style.FiltersContainer>
          </Style.BannerHeaderMap>
          <TwitterContainer />
        </Style.BannerContainer>
        <MapBox />
      </Style.ThreeQuartersContainer>
      <Style.OneQuartersContainer>
        <div>
          <Style.BannerHeaderLosses>
            <Style.SubtitlePage>Losses</Style.SubtitlePage>
            <Style.MinInfo>Updated {lastUpdate} ago</Style.MinInfo>
          </Style.BannerHeaderLosses>
          <Style.PanelLosses>
            <TableLosses />
          </Style.PanelLosses>
        </div>
        <div>
          <Style.BannerHeaderLatest>
            <Style.SubtitlePage>Latest</Style.SubtitlePage>
            <a
              href='https://correctiv.org/en/latest-stories/2022/03/01/sanctions-tracker-live-monitoring-of-all-sanctions-against-russia/'
              target='_blank'
              rel='noreferrer'
            >
              <Style.TextSmall>Sanctions Tracker</Style.TextSmall>
            </a>
          </Style.BannerHeaderLatest>
          <Style.PanelLatest>
            <RssList />
          </Style.PanelLatest>
        </div>
        <Style.PanelDonation>
          <LinksDonation />
        </Style.PanelDonation>
      </Style.OneQuartersContainer>
    </Style.PageContainer>
  )
}
