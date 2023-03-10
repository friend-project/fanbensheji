import { useState, useEffect } from 'react'
import r from '../../library/request'
import './style.scss'

export default () => {
  const [data, setData] = useState('')

  const getData = async () => {
    const rst = await r(
      '/about',
      {},
      'GET',
    )
    setData(rst?.data?.content)
  }
  useEffect(() => { getData() }, [])

  return (
    <div
      className="wrap"
      id="about"
    >
      <div
        className="about"
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    </div>
  )
}
