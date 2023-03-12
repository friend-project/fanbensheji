import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ImgsViewer from 'react-viewer'
import { flatMap } from 'lodash'

import r from '../../library/request'
import Header from '../../components/header'
import { api } from '../../config/config'

import './style.scss'

export default () => {
  const params = useParams()
  const [data, setData] = useState({})
  const [tag, setTag] = useState([])
  const [imgs, setImgs] = useState([])
  const [show, setShow] = useState(false)
  const [activeIndex, setActiveIndex] = useState()

  const getData = async () => {
    const t = await r('/tag', {}, 'GET')
    const rst = await r(`/project?id=${params.id}`, {}, 'GET')
    setTag(t.data)
    setData(rst.data)
    if (rst.data.content.length) {
      let c = JSON.parse(rst.data.content)
      c = flatMap(c.filter(v => v.type === 'pic').map(v => v.data))
      setImgs(c)
    }
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
        >
          {
            data?.content?.length && JSON.parse(data.content).map(
              (v, i) => (
                v.type === 'text' ? (
                  <p
                    className="text"
                    key={`${v.data}${i}`}
                  >
                    {v.data}
                  </p>
                ) : (
                  v.data.map(
                    (m) => (
                      <div
                        key={m}
                        className="img"
                        onClick={
                          () => {
                            console.log(imgs.indexOf(m))
                            setActiveIndex(imgs.indexOf(m))
                            setShow(true)
                          }
                        }
                      >
                        <img src={`${api}/${m}`} />
                      </div>
                    )
                  )
                )
              )
            )
          }
        </div>
      </div>
      {
        imgs.length ? (
          <ImgsViewer
            images={
              imgs.map(
                (v) => ({
                  src: `${api}/${v}`,
                  alt: '',
                }),
              )
            }
            visible={show}
            onClose={() => setShow(false)}
            activeIndex={activeIndex}
          />
        ) : null
      }
    </>
  )
}
