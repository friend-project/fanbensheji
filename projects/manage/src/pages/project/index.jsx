import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Table,
    message,
    Image,
    Button,
    Space,
    Popconfirm,
} from 'antd'

import { api } from '../../config/config'
import r from '../../library/request'
import './style.scss'

export default () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
        }, {
            title: '图标',
            dataIndex: 'banner',
            key: 'banner',
            render: (banner) => <Image height={40} src={`${api}/${banner}`} />,
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '时间',
            dataIndex: 'year',
            key: 'year',
        }, {
            title: '推荐',
            dataIndex: 'recommend',
            key: 'recommend',
            render: (recommend) => (recommend ? '推荐' : '')
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate('/main/project/add')}
                    >
                        添加
                    </Button>
                    <Button
                        onClick={() => navigate(`/main/project/edit/${id}`)}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title="确认删除？"
                        onConfirm={() => deleteData(id)}
                        okText="删除"
                        cancelText="取消"
                    >
                        <Button
                            danger
                        >
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            ) 
        }
    ]
    const getData = async () => {
        const rst = await r(
            '/project',
            {},
            'GET',
        )
        if (rst.code) {
            message.error('请求错误！！！')
        } else {
            setData(rst.data)
        }
    }
    const deleteData = async (id) => {
        const rst = await r(
            '/project',
            {
                id,
            },
            'DELETE',
        )
        if (!rst.code) {
            message.error('删除失败！！！')
        } else {
            getData()
        }
    }
    useEffect(() => { getData() }, [])

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}