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
            <svg width="10" height="32" viewBox="0 0 10 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.0512695 19.1992H9.02361V22.5277H0.0512695V19.1992Z" fill="#FFFFFF"/>
              <path d="M4.5378 31.7466C5.42695 31.7466 7.61825 29.2409 7.61825 29.2409C8.53619 27.8968 9.02616 26.3067 9.02411 24.6791V23.5405H0.0517643V24.6791C0.0496969 26.3067 0.539937 27.8968 1.45762 29.2409C1.45762 29.2409 3.58637 31.7466 4.5378 31.7466Z" fill="#FFFFFF"/>
              <path d="M9.0239 12.8844C9.02158 11.8202 8.67657 10.7849 8.0398 9.93211L6.95441 8.4849C6.81925 8.30477 6.81925 8.0572 6.95441 7.87708L9.0239 5.11809V0.875183L5.0441 3.75927V7.81767C5.0441 8.09729 4.8172 8.32418 4.53759 8.32418C4.25797 8.32418 4.03107 8.09728 4.03107 7.81767V3.75927L0.0512695 0.875183V5.11809L2.12076 7.8776C2.25592 8.05748 2.25592 8.3053 2.12076 8.48543L1.03537 9.93264C0.398599 10.7852 0.0533204 11.8205 0.0512695 12.8849V18.1864H9.02361L9.0239 12.8844Z" fill="#FFFFFF"/>
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
            <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.722 0.502961C29.5159 0.292611 29.1843 0.271556 28.9531 0.45383L18.1577 8.76316L17.6834 3.55334C17.6634 3.30131 17.4807 3.09181 17.2335 3.038C16.9849 2.97994 16.7271 3.08905 16.5955 3.3079L13.782 8.07593L9.84814 4.16671C9.66715 3.99124 9.39533 3.94871 9.16945 4.06037C8.97569 4.16374 8.8536 4.3643 8.85041 4.5838C8.84914 4.61676 8.8519 4.64973 8.85871 4.68185L9.75008 10.0797L1.12985 8.66489C0.856333 8.62193 0.590043 8.77613 0.491171 9.03497C0.392484 9.2936 0.488406 9.58626 0.721089 9.73643L7.91805 14.3817L3.48542 17.5059C3.27869 17.6535 3.19042 17.9172 3.26678 18.1595C3.34313 18.4015 3.56688 18.567 3.82063 18.5691L9.05489 18.6263L3.33021 27.533C3.17261 27.774 3.21472 28.0941 3.42932 28.2863C3.64393 28.4784 3.96679 28.485 4.18904 28.3016L13.2917 20.949L15.5734 23.5988C15.7127 23.7552 15.9239 23.8268 16.1296 23.7871C16.3397 23.7515 16.5111 23.5991 16.5711 23.3944L17.5524 20.4583L22.664 22.8219C22.8947 22.9297 23.1689 22.8772 23.3431 22.6913C23.5145 22.5033 23.5475 22.2272 23.4248 22.0043L20.7013 17.1788L26.0499 15.7313C26.2971 15.6654 26.4725 15.4467 26.4834 15.1915C26.4979 14.9386 26.3451 14.7061 26.1074 14.6189L20.9548 12.6807L29.7716 1.2716C29.9538 1.0404 29.9321 0.709047 29.722 0.502961Z" fill="#FFFFFF"/>
            </svg>
          `
          break
      }

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
              <img src="${feature.properties.image}" alt="Image from ${
            feature.properties.source_text
          }" />
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
