import { useState, useEffect } from 'react'
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import { api } from '../../config/config'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  });

const Uploads = ({
  data,
  onChange,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false) // 预览图片开启
  const [previewImage, setPreviewImage] = useState('') // 预览图片地址
  const [previewTitle, setPreviewTitle] = useState('') // 预览图片标题
  const handleCancel = () => setPreviewOpen(false) // 图片预览关闭

  const [fileList, setFileList] = useState([])

  useEffect(
    () => {
      setFileList(data.data)
    },
    [],
  )

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || (file.preview))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1))
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

  useEffect(
    () => {
      onChange({
        ...data,
        data: fileList,
      })
    },
    [fileList],
  )

  return (
    <>
      <div
        style={{
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            right: '-14px',
            cursor: 'pointer',
          }}
          onClick={() => onChange({ ...data, handle: 'delete' })}
        >
          <CloseCircleOutlined />
        </div>
        <Upload
          name="file"
          data={{
            fileType: 'project',
          }}
          listType="picture-card"
          fileList={
            fileList.map(
              (v, i) => (
                typeof v === 'string'
                  ? {
                    id: i,
                    uid: i,
                    name: v,
                    status: 'done',
                    url: `${api}/${v}`,
                  }
                  : v
              )
            )
          }
          onPreview={handlePreview}
          multiple={true}
          onChange={handleChange}
          action={`${api}/api/upload`}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}

export default Uploads
