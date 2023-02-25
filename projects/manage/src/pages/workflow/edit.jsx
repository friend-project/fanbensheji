import { useState, useEffect } from 'react'
import {
    Modal,
    Upload,
    Input,
    InputNumber,
    message,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { api } from '../../config/config'

import r from '../../library/request'
import './style.scss'

const { TextArea } = Input

export default ({
    data,
    setEdit,
}) => {
    const [loading, setLoading] = useState(false)
    const [icon, setIcon] = useState('')
    const [title, setTitle] = useState('')
    const [describe, setDescribe] = useState('')
    const [price, setPrice] = useState('')
    const [turn, setTurn] = useState()

    useEffect(
        () => {
            if (data?.id) {
                setIcon(data.icon)
                setTitle(data.title)
                setDescribe(data.describe)
                setPrice(data.price)
                setTurn(data.turn)
            }
        },
        [data],
    )

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            setLoading(false)
            if (info.file.response?.data) {
                setIcon(info.file.response.data)
            } else {
                message.error('上传失败！！！')
            }
        }
    }

    const submit = async () => {
        if (!icon) {
            message.error('请上传图标！！！')
            return
        }
        if (!title) {
            message.error('请填写标题！！！')
            return
        }
        if (!describe) {
            message.error('请填写描述！！！')
            return
        }
        if (!turn) {
            message.error('请填写排序！！！')
            return
        }
        const rst = await r(
            '/workflow',
            {
                id: data?.id || '',
                icon,
                title,
                describe,
                price,
                turn,
            },
            'PUT',
        )
        setEdit(true)
    }

    return (
        <Modal
            title="工作流程"
            centered
            open={true}
            width={600}
            onCancel={() => setEdit(null)}
            onOk={() => submit()}
            maskClosable={false}
            cancelText="取消"
            okText="确定"
        >
            <div className='modal'>
                <div className='left'>图标:</div>
                <div className="right">
                    <Upload
                        name="file"
                        data={{
                            fileType: 'workflow',
                        }}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={`${api}/api/upload`}
                        onChange={handleChange}
                    >
                        {
                            icon ? (
                                <img
                                    src={`${api}/${icon}`}
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
            </div>
            <div className="modal">
                <div className="left">标题:</div>
                <Input
                    placeholder="请填写标题"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div className="modal">
                <div className="left">描述:</div>
                <TextArea
                    rows={4}
                    placeholder="请填写描述"
                    value={describe}
                    onChange={({ target }) => setDescribe(target.value)}
                />
            </div>
            <div className="modal">
                <div className="left">价格:</div>
                <TextArea
                    rows={2}
                    placeholder="请填写价格"
                    value={price}
                    onChange={({ target }) => setPrice(target.value)}
                />
            </div>
            <div className="modal">
                <div className="left">排序:</div>
                <InputNumber
                    value={turn}
                    onChange={(n) => setTurn(n)}
                    min={1}
                />
            </div>
        </Modal>
    )
}
