import { useState, useEffect } from 'react'
import {
    Upload,
    Input,
    Button,
    message,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { api } from '../../config/config'

import r from '../../library/request'
import './style.scss'

export default () => {
    const [loading, setLoading] = useState(false)
    const [logo, setLogo] = useState('')
    const [company, setCompany] = useState('')
    const [tel, setTel] = useState('')
    const [mail, setMail] = useState('')
    const [address, setAddress] = useState()

    const getData = async () => {
      const rst = await r(
          '/company',
          {},
          'GET',
      )
      if (rst.code) {
          message.error('请求错误！！！')
      } else {
        const data = rst.data
        setLogo(data.logo)
        setCompany(data.company)
        setTel(data.tel)
        setMail(data.mail)
        setAddress(data.address)
      }
    }
    useEffect(() => { getData() }, [])

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            setLoading(false)
            if (info.file.response?.data) {
                setLogo(info.file.response.data)
            } else {
                message.error('上传失败！！！')
            }
        }
    }

    const submit = async () => {
      if (!logo) {
          message.error('请上传logo！！！')
          return
      }
      if (!company) {
          message.error('请填写公司名称！！！')
          return
      }
      if (!tel) {
          message.error('请填写电话！！！')
          return
      }
      if (!mail) {
          message.error('请填写邮箱！！！')
          return
      }
      if (!address) {
          message.error('请填写地址！！！')
          return
      }
      const rst = await r(
          '/company',
          {
              logo,
              company,
              tel,
              mail,
              address,
          },
          'PUT',
      )
      if (rst.code) {
          message.error('上传失败！！！')
      } else {
          message.info('上传成功！！！')
      }
    }

    console.log(logo)

    return (
      <div>
        <div className='modal'>
            <div className='left'>logo:</div>
            <div className="right">
                <Upload
                    name="file"
                    data={{
                        fileType: 'logo',
                    }}
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${api}/api/upload`}
                    onChange={handleChange}
                >
                    {
                        logo ? (
                            <img
                                src={`${api}/${logo}`}
                                alt="logo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        ) : (
                            <div>
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )
                    }
                </Upload>
            </div>
        </div>
        <div className="modal">
            <div className="left">公司:</div>
            <Input
                placeholder="请填写公司名称"
                value={company}
                onChange={({ target }) => setCompany(target.value)}
            />
        </div>
        <div className="modal">
            <div className="left">电话:</div>
            <Input
                placeholder="请填写电话"
                value={tel}
                onChange={({ target }) => setTel(target.value)}
            />
        </div>
        <div className="modal">
            <div className="left">邮箱:</div>
            <Input
                placeholder="请填写邮箱"
                value={mail}
                onChange={({ target }) => setMail(target.value)}
            />
        </div>
        <div className="modal">
            <div className="left">地址:</div>
            <Input
                placeholder="请填写地址"
                value={address}
                onChange={({ target }) => setAddress(target.value)}
            />
        </div>
        <div className="modal">
            <div className="left" />
            <Button
                type="primary"
                onClick={() => submit()}
            >确认</Button>
        </div>
      </div>
    )
}
