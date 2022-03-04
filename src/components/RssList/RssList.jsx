import { useState, useEffect } from 'react'
import * as Style from './RssList.styles'
import { TextMedium, MinInfo, TextSmall } from '../Home/Home.syles'

function convert(str) {
  var date = new Date(str),
    mnth = ('0' + (date.getMonth() + 1)).slice(-2),
    day = ('0' + date.getDate()).slice(-2),
    year = ('' + date.getFullYear()).slice(-2)
  return [day, mnth, year].join('/')
}

export default function RssList() {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    fetch(
      'https://api.allorigins.win/get?url=https://www.aljazeera.com/xml/rss/all.xml'
    )
      .then(function (res) {
        return res.json()
      })
      .then(function (res) {
        const contents = new window.DOMParser().parseFromString(
          res.contents,
          'text/xml'
        )
        const items = contents.querySelectorAll('item')
        const contentItems = [...items].map((el) => ({
          link: el.querySelector('link').innerHTML,
          title: el.querySelector('title').innerHTML,
          date: convert(el.querySelector('pubDate').innerHTML),
          author: 'Aljazeera',
        }))
        setDatas(datas.concat(contentItems))
      })
      .catch(function (err) {
        console.log(err, ' error')
      })
  }, [])
  return (
    <Style.LatestList>
      {datas.map((data, index) => {
        return (
          index < 3 && (
            <li key={index}>
              <div>
                <TextMedium>{data.title}</TextMedium>
                <MinInfo>{data.date}</MinInfo>
              </div>
              <TextSmall>
                Source&nbsp;:&nbsp;
                <a href={data.link} target='_blank' rel='noreferrer'>
                  {data.author}
                </a>
              </TextSmall>
            </li>
          )
        )
      })}
    </Style.LatestList>
  )
}
