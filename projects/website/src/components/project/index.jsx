import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LazyLoad from 'react-lazy-load'
import { api } from '../../config/config'
import r from '../../library/request'
import './style.scss'

export default () => {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  const getData = async () => {
    const rst = await r(
      '/project',
      {},
      'GET',
    )
    setData(rst?.data)
  }
  useEffect(() => { getData() }, [])

  return (
    <div
      className="wrap"
      id="project"
    >
      <div className="title">PROJECT 作品</div>
      <div className="project">
        <div className="inner">
          {
            data.map(
              (v) => (
                <div
                  key={v.id}
                  className="row"
                  onClick={() => navigate(`/project/${v.id}`)}
                >
                  <div className="img">
                    <LazyLoad
                      threshold={0.95}
                    >
                      <img
                        src={`${api}/${v.banner}`}
                        alt={v.title}
                      />
                    </LazyLoad>
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
