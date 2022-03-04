import { useRef, useState, useEffect } from 'react'
import * as Style from './MapBox.syles'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useStore from '@/helpers/store'

export default function MapBox() {
  const [openTwitterModal, filterConflicts, filterTroops, filterBombing] =
    useStore((state) => [
      state.openTwitterModal,
      state.filterConflicts,
      state.filterTroops,
      state.filterBombing,
    ])
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYnVyaWVkc2lnbmFscyIsImEiOiJjbDBhdmlhZTgwM3dtM2RxOTQ5cndsYXl0In0.Gvcq3DBOKDVRhy3QLjImiA'
  const mapRef = useRef(null)
  const map = useRef(null)
  useEffect(() => {
    if (map.current) {
      let filter = ['any']
      if (useStore.getState().filterConflicts) {
        filter.push(['in', 'icon', 'conflicts'])
      }
      if (useStore.getState().filterTroops) {
        filter.push(['in', 'icon', 'troops'])
      }
      if (useStore.getState().filterBombing) {
        filter.push(['in', 'icon', 'bombing'])
      }
      map.current.setFilter('ukraine-conflicts', filter)
    }
  }, [
    useStore.getState().filterConflicts,
    useStore.getState().filterBombing,
    useStore.getState().filterTroops,
  ])
  useEffect(() => {
    if (map.current) map.current.resize()
    if (map.current) return
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/buriedsignals/cl0bjiqo6001q15t9y6tv7xx0',
    })
    console.log(map.current)
    map.current.dragRotate.disable()
    map.current.touchZoomRotate.disableRotation()
    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right'
    )

    map.current.on('click', (event) => {
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ['ukraine-conflicts', 'ukraine-conflicts-polygons'],
      })
      if (!features.length) {
        return
      }
      const feature = features[0]
      console.log(features)
      let icon = ''
      switch (feature.properties.icon) {
        case 'bombing':
          icon = `
          <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.722 0.502961C29.5159 0.292611 29.1843 0.271556 28.9531 0.45383L18.1577 8.76316L17.6834 3.55334C17.6634 3.30131 17.4807 3.09181 17.2335 3.038C16.9849 2.97994 16.7271 3.08905 16.5955 3.3079L13.782 8.07593L9.84814 4.16671C9.66715 3.99124 9.39533 3.94871 9.16945 4.06037C8.97569 4.16374 8.8536 4.3643 8.85041 4.5838C8.84914 4.61676 8.8519 4.64973 8.85871 4.68185L9.75008 10.0797L1.12985 8.66489C0.856333 8.62193 0.590043 8.77613 0.491171 9.03497C0.392484 9.2936 0.488406 9.58626 0.721089 9.73643L7.91805 14.3817L3.48542 17.5059C3.27869 17.6535 3.19042 17.9172 3.26678 18.1595C3.34313 18.4015 3.56688 18.567 3.82063 18.5691L9.05489 18.6263L3.33021 27.533C3.17261 27.774 3.21472 28.0941 3.42932 28.2863C3.64393 28.4784 3.96679 28.485 4.18904 28.3016L13.2917 20.949L15.5734 23.5988C15.7127 23.7552 15.9239 23.8268 16.1296 23.7871C16.3397 23.7515 16.5111 23.5991 16.5711 23.3944L17.5524 20.4583L22.664 22.8219C22.8947 22.9297 23.1689 22.8772 23.3431 22.6913C23.5145 22.5033 23.5475 22.2272 23.4248 22.0043L20.7013 17.1788L26.0499 15.7313C26.2971 15.6654 26.4725 15.4467 26.4834 15.1915C26.4979 14.9386 26.3451 14.7061 26.1074 14.6189L20.9548 12.6807L29.7716 1.2716C29.9538 1.0404 29.9321 0.709047 29.722 0.502961Z" fill="#FFFFFF"/>
          </svg>
          `
          break
        case 'troops':
          icon = `
            <svg width="37" height="23" viewBox="0 0 37 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M32.1297 22.9308H5.7811C4.32472 22.1364 0.749685 20.6798 0.882251 18.1642C0.882251 17.105 2.33863 16.5753 3.13321 16.5753H34.6455C35.5724 16.5753 36.8965 17.105 36.8965 18.1642C36.8965 20.6798 33.5863 21.8715 32.1299 22.9308H32.1297Z" fill="#FFFFFF"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3.00097 15.6486H34.5127C34.5574 15.1134 34.5901 14.721 34.6452 14.0596L31.8647 12.2059H15.1816L7.30365 14.0596L3.36469 14.9864L2.87231 15.1023C2.92049 15.3072 2.97259 15.5275 3.00097 15.6486Z" fill="#FFFFFF"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1364 7.30734H2.07397V8.89629H12.1364L13.1958 10.088H17.0354L17.9623 11.4119H30.2759L31.4675 8.76399L33.4536 8.63146V5.45384L29.4816 3.8649H29.2167V0.81958H28.2898V3.8649H27.0983V2.54082H26.0389V3.8649H23.5233L17.9623 5.98329H13.1957L12.1364 7.30734Z" fill="#FFFFFF"/>
            </svg>
          `
          break
        case 'conflicts':
          icon = `
          <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29.6882 1.50814L29.8947 1.71771L27.8721 3.77102C27.7482 3.72923 27.583 3.72923 27.4592 3.85491L27.3354 3.9806C27.2527 4.06449 27.2115 4.19017 27.2115 4.27406C26.9225 4.19017 26.6337 4.27406 26.3861 4.48363L18.0895 11.6067C17.8004 11.9002 17.718 12.319 17.883 12.6543C17.718 12.6125 17.5528 12.6543 17.429 12.8218C17.3052 12.9475 17.264 13.157 17.3052 13.3245C17.1402 13.3245 16.9749 13.3663 16.8099 13.4502L15.2001 11.8581L9.58649 17.5569L10.6184 19.7359L10.4946 19.8616C10.2882 20.0712 10.247 20.4064 10.3708 20.6996C9.95791 20.5739 9.50383 20.6578 9.21504 20.9931L0.340544 29.9602C-0.113515 30.4212 -0.113515 31.1335 0.340544 31.5945L4.34439 35.659C4.88108 36.2038 5.78922 36.0782 6.11914 35.4077L12.5585 23.8844C12.7235 23.5909 12.7235 23.2978 12.6412 23.0043C12.7238 22.9625 12.8062 22.9625 13.0126 22.9625C13.5905 23.0043 13.9207 23.8005 13.9207 23.8005L14.6635 25.0576L15.7781 26.8593C15.943 27.1528 16.3559 27.1946 16.6035 26.9432L16.9338 26.6079C17.4705 26.0631 17.5528 25.2251 17.1814 24.5967L16.7685 23.8844L18.7497 21.8731L17.759 20.8674L18.6671 19.9455C20.0704 21.3283 21.7628 22.1663 22.5057 22.5016C22.7533 22.5854 23.0009 22.5434 23.2073 22.3759L24.2805 21.2865C24.5695 20.993 24.4869 20.4485 24.1155 20.2807C23.1662 19.8198 21.6802 19.0236 20.6068 18.0181L20.8544 17.7668C21.102 17.5154 21.102 17.0545 20.8544 16.761L19.2452 15.0851C19.3279 15.0433 19.4517 15.0433 19.5343 14.9594C19.6581 14.8337 19.6993 14.6659 19.6993 14.4984C20.0295 14.6659 20.4836 14.5823 20.7312 14.2889L27.707 5.8245C27.9135 5.57313 27.9961 5.23788 27.872 4.94439C27.9547 4.94439 28.037 4.90259 28.1196 4.81871L28.2435 4.69302C28.3673 4.56733 28.3673 4.44165 28.3261 4.27387L30.3487 2.22056L30.5552 2.43014L32 0.96339L31.133 0L29.6882 1.50814ZM18.0482 21.9148L16.5207 23.4654L16.0255 22.711L17.4288 21.2864L18.0482 21.9148ZM16.4384 13.7857L11.8978 18.3951L10.8247 17.3057L15.3653 12.6963L16.4384 13.7857Z" fill="#FFFFFF"/>
          </svg>
          `
          break
      }

      let image = `<img src="${feature.properties.image_url}" alt="Image from ${feature.properties.source_text}" />`
      let video = `<iframe src="${feature.properties.video_url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

      const popup = new mapboxgl.Popup({
        anchor: 'top-left',
        offset: [-25, -25],
      })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `
            <div class="icon" style="background: ${
              feature.properties.country == 'russia' ? '#9E2D3C' : '#004EE4'
            }">
              ${icon}
            </div>
            <div class="panel">
              ${
                feature.properties.video_url
                  ? video
                  : feature.properties.image_url
                  ? image
                  : ''
              }
              <div class="line" style="background: ${
                feature.properties.country == 'russia' ? '#9E2D3C' : '#004EE4'
              }"></div>
              <div class="content">
                <p class="date">${feature.properties.date}</p>
                <h3 class="title">${feature.properties.title}</h3>
                <p class="description">${feature.properties.description}</p>
                <p class="source">Source : <a href="${
                  feature.properties.source_url
                }" target="_blank" style="color: ${
            feature.properties.country == 'russia' ? '#9E2D3C' : '#004EE4'
          }">${feature.properties.source_text}</a></p>
              </div>
            </div>
          `
        )
        .addTo(map.current)
    })
  }, [openTwitterModal])
  return (
    <>
      <Style.MapContainer
        style={{ width: openTwitterModal && '50vw' }}
        ref={mapRef}
      />
      <p>{useStore.getState().filterTroops ? 'oui' : 'non'}</p>
    </>
  )
}
