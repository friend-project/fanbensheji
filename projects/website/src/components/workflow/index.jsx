import { useState, useEffect } from 'react'
import LazyLoad from 'react-lazy-load'

import { api } from '../../config/config'
import r from '../../library/request'
import './style.scss'

export default () => {
  const [data, setData] = useState([])

  const getData = async () => {
    const rst = await r(
      '/workflow',
      {},
      'GET',
    )
    setData(rst?.data)
  }
  useEffect(() => { getData() }, [])

  return (
    <div
      className="wrap"
      id="workflow"
    >
      <div className="title">WORKFLOW 工作流程</div>
      <div className="workflow">
        {
          data.map(
            (v, i) => (
              <LazyLoad
                threshold={0.95}
                className="row"
                key={v.id}
              >
                <>
                  <div className="t">
                    <img src={`${api}/${v.icon}`} alt="" />
                    <span>{i + 1}. {v.title}</span>
                  </div>
                  <p>{v.describe}</p>
                  <b>{v.price}</b>
                </>
              </LazyLoad>
            )
          )
        }
      </div>
    </div>
  )
}
