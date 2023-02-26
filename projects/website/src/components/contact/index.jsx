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
    <div className="wrap">
      <div className="title">CONTACT 联系我们</div>
      <div className="contact">
        <div className="row">
          <div>
            <p>梵本设计 Fanben Design</p>
            <p>电话：139 1125 8805</p>
            <p>邮箱：fanbensheji@126.com</p>
            <p>地址：北京市朝阳区北苑东路乐想汇3号楼831</p>
          </div>
          <div className="input" style={{ marginTop: '24px', }}>
            <p>姓名<span>*</span></p>
            <input type="text" />
          </div>
          <div className="input">
            <p>邮箱<span>*</span></p>
            <input type="text" />
          </div>
          <div className="input">
            <p>电话<span>*</span></p>
            <input type="text" />
          </div>
          <div className="input">
            <p>留言<span>*</span></p>
            <textarea type="text" />
          </div>
          <div className="input">
            <div className="btn">提交</div>
          </div>
        </div>
        <div className="row">
          <div className="map"></div>
        </div>
      </div>
    </div>
  )
}