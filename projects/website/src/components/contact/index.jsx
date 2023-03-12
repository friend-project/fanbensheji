import { useState } from 'react'
import { Map, Marker, NavigationControl, InfoWindow, ZoomControl } from 'react-bmapgl'

import r from '../../library/request'
import './style.scss'

export default () => {
  const [tip, setTip] = useState('')
  const [name, setName] = useState('')
  const [mail, setMail] = useState('')
  const [tel, setTel] = useState('')
  const [message, setMessage] = useState('')

  const submit = async () => {
    if (!name.length) {
      setTip('请填写姓名！')
      return
    }
    if (!mail.length) {
      setTip('请填写邮箱！')
      return
    }
    if (!tel.length) {
      setTip('请填写电话号码！')
      return
    }
    if (tel && !(/^1[345789]\d{9}$/).test(tel)) {
      setTip('电话号码格式错误')
      return
    }
    if (mail && !(/^[A-Za-z0-9-_\u4e00-\u9fa5\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(mail)) {
      setTip('邮箱格式错误！')
      return
    }

    const rst = await r(
      '/contact',
      {
        name,
        mail,
        tel,
        message,
      },
      'POST',
    )
    if (!rst.code) {
      setTip('提交成功！')
    } else {
      setTip('提交失败！')
    }
  }

  return (
    <div
      className="wrap"
      id="contact"
    >
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
            <input type="text" value={name} onChange={({ target }) => setName(target.value)} />
          </div>
          <div className="input">
            <p>邮箱<span>*</span></p>
            <input type="text" value={mail} onChange={({ target }) => setMail(target.value)} />
          </div>
          <div className="input">
            <p>电话<span>*</span></p>
            <input type="text" value={tel} onChange={({ target }) => setTel(target.value)} />
          </div>
          <div className="input">
            <p>留言</p>
            <input type="text" value={message} onChange={({ target }) => setMessage(target.value)} />
          </div>
          <div className="input">
            <div className="btn" onClick={() => submit()}>提交</div>
          </div>
        </div>
        <div className="row">
          <div className="map">
            <Map
              center={{lng: 116.445021, lat: 40.056205}}
              zoom="15"
              enableDoubleClickZoom={true}
              enableDragging={true}
              enableScrollWheelZoom={true}
            >
              <Marker
                position={{lng: 116.445021, lat: 40.056205}}
              />
              <NavigationControl /> 
              <InfoWindow
                position={{lng: 116.445021, lat: 40.056205}}
                text="北京市朝阳区北苑东路乐想汇3号楼831"
                title="梵本设计"
              />
              <ZoomControl />
            </Map>
          </div>
        </div>
        {
          tip ? (
            <div className="tip_bg"  onClick={() => setTip('')}>
              <div className="tip">
                <p>{tip}</p>
                <div className="btn" onClick={() => setTip('')}>确定</div>
              </div>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}
