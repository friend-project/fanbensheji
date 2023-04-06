import { useState, useEffect } from 'react'
import LazyLoad from 'react-lazy-load'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

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
                    <LazyLoadImage
                      alt={v.title}
                      effect={'blur'}
                      src={`${api}/${v.icon}`}
                    />
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
