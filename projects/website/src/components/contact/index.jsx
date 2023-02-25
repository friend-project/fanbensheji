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
    <div className="about">
      <div className="title">ABOUT 关于梵本</div>
      <div className="content">
        <div className="row">
          <div>
            <p>梵本设计 Fanben Design</p>
            <p>TEL: 139 1125 8805</p>
            <p>E-mail: fanbensheji@126.com</p>
            <p>北京市朝阳区北苑东路乐想汇3号楼831</p>
          </div>
          <div>
            姓名：*
            <input type="text" />
          </div>
          <div>
            邮箱：*
            <input type="text" />
          </div>
          <div>
            电话：*
            <input type="text" />
          </div>
          <div>
            留言：*
            <input type="text" />
          </div>
        </div>
        <div className="row">
          
        </div>
      </div>
    </div>
  )
}