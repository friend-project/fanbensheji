import { useState, useEffect } from 'react'
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
import Edit from './edit'
import './style.scss'

export default () => {
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            render: (icon) => <Image height={40} src={`${api}/${icon}`} />,
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '描述',
            dataIndex: 'describe',
            key: 'describe',
        }, {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: '排序',
            dataIndex: 'turn',
            key: 'turn',
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => setEdit(0)}
                    >
                        添加
                    </Button>
                    <Button
                        onClick={() => setEdit(id)}
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
            '/workflow',
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
            '/workflow',
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
            {
                edit !== null ? (
                    <Edit
                        data={data.find(v => v.id === edit)}
                        setEdit={
                            (v) => {
                                setEdit(null)
                                if (v) {
                                    getData()
                                }
                            }
                        }
                    />
                ) : null
            }
        </>
    )
}