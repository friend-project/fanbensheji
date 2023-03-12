import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Select,
  Input,
  Upload,
  Button,
  message,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { api } from '../../config/config'
import r from '../../library/request'

import Content from '../../components/editor'

export default () => {
  const navigiate = useNavigate()
  const params = useParams()
  const [tags, setTags] = useState([])

  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [year, setYear] = useState('')
  const [recommend, setRecommend] = useState(0)
  const [banner, setBanner] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)
  const getData = async () => {
    const rstTag = await r(
      '/tag',
      {},
      'GET'
    )
    if (rstTag.code) {
      message.error('请求错误！！！')
    } else {
      setTags(rstTag.data)
    }
    if (!params.id) return
    const rst = await r(
      `/project?id=${params?.id}`,
      {},
      'GET',
    )
    if (rst.code) {
      message.error('请求错误！！！')
    } else {
      setBanner(rst.data.banner)
      setRecommend(rst.data.recommend)
      setTag(rst.data.tag)
      setTitle(rst.data.title)
      setYear(rst.data.year)
      setContent(rst?.data?.content?.length ? JSON.parse(rst.data.content) : [])
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
        setBanner(info.file.response.data)
      } else {
        message.error('上传失败！！！')
      }
    }
  }

  const submit = async () => {
    if (!title) {
      message.error('请填写标题！！！')
      return
    }
    if (!tag) {
      message.error('请选择标签！！！')
      return
    }
    if (!banner) {
      message.error('请上传图标！！！')
      return
    }
    if (!content.length) {
      message.error('请填写内容！！！')
      return
    }
    const rst = await r(
      '/project',
      {
        id: params?.id || '',
        tag,
        title,
        banner,
        year,
        recommend,
        content: JSON.stringify(
          content.map(
            (v) => (
              v.type === 'text'
                ? v
                : {
                  type: v.type,
                  data: v.data.map(
                    (m) => (
                      (m?.url && m.url.replace(`${api}/`, '')) || m?.response?.data || m
                    ),
                  ),
                }
            ),
          ),
        )
      },
      'PUT',
    )

    if (rst.code) {
      message.error('上传失败！！！')
    } else {
      navigiate('/main/project')
    }
  }

  return (
    <div className="edit">
      <div className="row">
        <p>标题：</p>
        <Input
          value={title}
          placeholder="请输入标题"
          onChange={({ target }) => setTitle(target.value)}
          style={{
            width: 'calc(100% - 50px)',
          }}
        />
      </div>
      <div className="row">
        <p>标签：</p>
        <Select
          value={tag || null}
          placeholder="请选择标签"
          onChange={(v) => setTag(v)}
          options={tags.map(v => ({ value: v.id, label: v.tag }))}
          style={{
            width: 'calc(100% - 50px)',
          }}
        />
      </div>
      <div className="row">
        <p>年份：</p>
        <Input
          value={year}
          placeholder="请输入年份"
          onChange={({ target }) => setYear(target.value)}
          style={{
            width: 'calc(100% - 50px)',
          }}
        />
      </div>
      <div className="row">
        <p>推荐：</p>
        <Select
          value={recommend}
          onChange={(v) => setRecommend(v)}
          options={[
            {
              value: 0, 
              label: '不推荐',
            }, {
              value: 1, 
              label: '推荐',
            }
          ]}
          style={{
            width: 'calc(100% - 50px)',
          }}
        />
      </div>
      <div className="row">
        <p>图标：</p>
        <Upload
          name="file"
          data={{
            fileType: 'project',
          }}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`${api}/api/upload`}
          onChange={handleChange}
        >
          {
            banner ? (
              <img
              src={`${api}/${banner}`}
              alt="avatar"
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
      <div className="row">
        <p>内容：</p>
        {
          content !== null ? (
            <Content
              style={{
                width: 'calc(100% - 50px)',
              }}
              data={content}
              onChange={(v) => setContent(v)}
            />
          ) : null
        }
      </div>
      <div className="row">
        <p></p>
        <Button
        type="primary"
        onClick={() => submit()}
        >确认</Button>
      </div>
    </div>
  )
}
