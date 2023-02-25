import { useState, useEffect } from 'react'
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
    <div className="workflow">
      <div className="title">WORKFLOW 工作流程</div>
      <div className="content">
        {
          data.map(
            (v, i) => (
              <div key={v.id} className="row">
                <div className="t">
                  <img src={`${api}/${v.icon}`} alt="" />
                  <span>{i + 1}. {v.title}</span>
                </div>
                <p>{v.describe}</p>
                <b>{v.price}</b>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}