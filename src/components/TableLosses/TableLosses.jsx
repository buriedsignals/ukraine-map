import { useState, useEffect } from 'react'
import * as Style from './TableLosses.syles'
import { TextMedium } from '../Home/Home.syles'
import useStore from '@/helpers/store'

export default function TableLosses() {
  const [datas, setDatas] = useState({})
  const updateDateJson = useStore((state) => state.updateDateJson)
  useEffect(() => {
    fetch('./jsons/losses.json')
      .then(function (res) {
        setDatas({})
        return res.json()
      })
      .then(function (res) {
        useStore.setState({ updateDateJson: res['update_date'] })
        setDatas(res['losses'])
      })
      .catch(function (err) {
        console.log(err, ' error')
        setDatas({})
      })
  }, [])
  return (
    <Style.TableLosses>
      <tbody>
        {Object.keys(datas).map((key, index) => {
          return (
            <tr key={index}>
              <td>
                {index == 0 && <Style.FlagUkraine></Style.FlagUkraine>}
                <TextMedium
                  className={
                    Number.isInteger(datas[key][0]) &&
                    datas[key][0] > datas[key][1] &&
                    'isRed'
                  }
                >
                  {datas[key][0]}
                </TextMedium>
              </td>
              <td>
                <TextMedium>{key}</TextMedium>
              </td>
              <td>
                <TextMedium
                  className={
                    Number.isInteger(datas[key][0]) &&
                    datas[key][0] < datas[key][1] &&
                    'isRed'
                  }
                >
                  {datas[key][1]}
                </TextMedium>
                {index == 0 && <Style.FlagRussia></Style.FlagRussia>}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Style.TableLosses>
  )
}
