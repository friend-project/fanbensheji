import { useState, useEffect } from 'react'
import { Table, message } from 'antd'

import r from '../../library/request'
import './style.scss'

export default () => {
    const [data, setData] = useState([])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '名字',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '电话',
            dataIndex: 'tel',
            key: 'tel',
        }, {
            title: '留言',
            dataIndex: 'message',
            key: 'message',
        }, {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
        }
    ]
    const getData = async () => {
        const rst = await r(
            '/contact',
            {},
            'GET',
        )
        if (rst.code) {
            message.error('请求错误！！！')
        } else {
            setData(rst.data)
        }
    }
    useEffect(() => { getData() }, [])

    return (
        <Table columns={columns} dataSource={data} rowKey="id" />
    )
}