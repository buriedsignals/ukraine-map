import { useEffect, useState } from 'react'
import useStore from '@/helpers/store'

import * as Style from './FiltersList.syles'

import { TextMedium } from '../Home/Home.syles'

export default function FiltersList() {
  const [filterConflicts, filterBombing, filterTroops] = useStore((s) => [
    s.filterConflicts,
    s.filterBombing,
    s.filterTroops,
  ])
  return (
    <Style.ListFilters>
      <li>
        <button
          className={filterConflicts ? 'isActive' : ''}
          onClick={() => {
            useStore.setState({
              filterConflicts: !filterConflicts,
            })
          }}
        >
          <TextMedium>+ Conflicts</TextMedium>
        </button>
      </li>
      <li>
        <button
          className={filterBombing ? 'isActive' : ''}
          onClick={() => {
            useStore.setState({
              filterBombing: !filterBombing,
            })
          }}
        >
          <TextMedium>+ Bombing</TextMedium>
        </button>
      </li>
      <li>
        <button
          className={filterTroops ? 'isActive' : ''}
          onClick={() => {
            useStore.setState({
              filterTroops: !filterTroops,
            })
          }}
        >
          <TextMedium>+ Troops</TextMedium>
        </button>
      </li>
    </Style.ListFilters>
  )
}
