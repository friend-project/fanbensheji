import {
  useRef,
  useState,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import LazyLoad from 'react-lazy-load'
import { api } from '../../config/config'
import r from '../../library/request'
import './style.scss'

export default () => {
  const ref = useRef()
  const navigate = useNavigate()
  const [source, setSource] = useState([])
  const [data, setData] = useState([])
  const [tag, setTag] = useState([])
  const [active, setActive] = useState(0)
  const [posi, setPosi] = useState(false)

  const getData = async () => {
    const rstTag = await r(
      '/tag',
      {},
      'GET',
    )
    const rst = await r(
      '/project',
      {},
      'GET',
    )
    setTag([{nick: 'all', tag: '全部', id: 0}].concat(rstTag?.data))
    setSource(rst?.data)
    setData(rst?.data)
  }

  useEffect(
    () => {
      if (active === 'all') {
        setData(source)
      } else {
        console.log(active)
        console.log(source)
        setData(source.filter(v => (v.tag === active) || !active) )
      }
    },
    [active],
  )

  const scrollTop = () => {
    const top = ref?.current?.getBoundingClientRect()?.top || 0
    if (top < -140) {
      setPosi(true)
    } else {
      setPosi(false)
    }
  }

  useEffect(
    () => {
      getData()
      if (ref.current) {
        document.addEventListener('scroll', scrollTop)
      }
    },
    [],
  )

  return (
    <div
      className="wrap"
      id="project"
      ref={ref}
    >
      <div className="title">PROJECT 作品</div>
      <div
        className={posi ? 'tag position' : 'tag'}
      >
        {
          tag.map(
            (v) => (
              <span
                key={v.nick}
                className={active === v.id ? 'active' : ''}
                onClick={() => setActive(v.id)}
              >
                {v.tag}
              </span>
            )
          )
        }
      </div>
      <div
        className={posi ? 'project position' : 'project'}
      >
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
