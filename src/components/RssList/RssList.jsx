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

function getRSS(i, newDatas, setDatas, listRSS) {
  fetch(`https://api.allorigins.win/get?url=${listRSS[i].feedURL}`)
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
        date: el.querySelector('pubDate').innerHTML,
        author: listRSS[i].author,
      }))
      newDatas = newDatas.concat(contentItems)
      if (i == listRSS.length - 1) {
        newDatas = newDatas.sort((a, b) => new Date(b.date) - new Date(a.date))
        setDatas({ list: newDatas })
        return
      } else {
        i += 1
        getRSS(i, newDatas, setDatas, listRSS)
      }
    })
    .catch(function (err) {
      console.log(err, ' error')
    })
}

export default function RssList() {
  const [datas, setDatas] = useState({ list: [] })
  const listRSS = [
    {
      author: 'Bellingcat',
      feedURL: 'https://politepol.com/fd/lUvjnbBxOqED',
    },
    {
      author: 'News Now',
      feedURL: 'https://politepol.com/fd/CdSCNpajIT1g',
    },
    {
      author: 'Al Jazeera',
      feedURL: 'https://www.aljazeera.com/xml/rss/all.xml',
    },
  ]
  useEffect(() => {
    getRSS(0, [], setDatas, listRSS)
  }, [])
  return (
    <Style.LatestList>
      {datas.list.map((data, index) => {
        return (
          index < 15 && (
            <li key={index}>
              <div>
                <TextMedium>{data.title}</TextMedium>
                <MinInfo>{convert(data.date)}</MinInfo>
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
