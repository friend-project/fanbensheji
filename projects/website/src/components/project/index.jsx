import { useState, useEffect } from 'react'
import { api } from '../../config/config'
import r from '../../library/request'
import './style.scss'

export default () => {
  const [data, setData] = useState([])

  const getData = async () => {
    const rst = await r(
      '/project',
      {},
      'GET',
    )
    console.log(rst.data)
    setData(rst?.data)
  }
  useEffect(() => { getData() }, [])

  return (
    <div className="project">
      <div className="title">PROJECT 作品</div>
      <div className="content">
        <div className="inner">
          {
            data.map(
              (v) => (
                <div className="row">
                  <div className="img">
                    <img
                      src={`${api}/${v.banner}`}
                      alt={v.title}
                    />
                  </div>
                  <p>{v.title}</p>
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
  )
}