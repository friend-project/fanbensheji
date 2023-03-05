import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as cheerio from 'cheerio'
import r from '../../library/request'
import Header from '../../components/header'

import './style.scss'

export default () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [tag, setTag] = useState([])
  const [imgs, setImgs] = useState([])

  const getData = async () => {
    const t = await r(
      '/tag',
      {},
      'GET',
    )
    setTag(t.data)
     const rst = await r(
      `/project?id=${id}`,
      {},
      'GET',
    )
    setData(rst.data)
    const $ = cheerio.load(rst?.data?.content)
    const a = Array.from($('p')).map(
      (v) => {
        if (v?.children && v?.children[0] && v?.children[0]?.attributes && v?.children[0]?.attributes[0]) {
          return 'a'
        }
        console.log(v?.children[0]?.text)
        // v?.children && v?.children[0] && v?.children[0]?.attributes && v?.children[0]?.attributes[0] ? v?.children[0]?.attributes[0]?.value : v?.children[0]?.text
      }
    )
    console.log(a)
    /*
    const b = Array.from($('p img'))
    const c = b.map(
      (v) => v.attributes[0].value
    )
    console.log(c)
    */
  }

  useEffect(() => { getData() }, [])

  return (
    <>
      <Header />
      <div className="detail">
        <div className="title">
          <h2>{data.title}</h2>
          <p>{tag?.find(v => v.id === data.tag)?.tag}</p>
          <p>{data.year}</p>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
      </div>
    </>
  )
}
