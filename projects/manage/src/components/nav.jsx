import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, theme } from 'antd'
import {
    FundProjectionScreenOutlined,
    ReadOutlined,
    VideoCameraAddOutlined,
    VerifiedOutlined,
    TeamOutlined,
    CommentOutlined,
} from '@ant-design/icons'

const { Sider } = Layout;


export default () => {
    const navigate = useNavigate()
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const nav = [
        {
            icon: FundProjectionScreenOutlined,
            name: '项目案例',
            nick: 'project',
        }, {
            icon: ReadOutlined,
            name: '工作流程',
            nick: 'workflow',
        }, {
            icon: VideoCameraAddOutlined,
            name: '媒体发布',
            nick: 'press',
        }, {
            icon: VerifiedOutlined,
            name: '获奖证书',
            nick: 'awards',
        }, {
            icon: TeamOutlined,
            name: '关于我们',
            nick: 'about',
        }, {
            icon: CommentOutlined,
            name: '联系我们',
            nick: 'contact',
        }
    ].map(
        (n) => ({
            key: n.nick,
            label: n.name,
            icon: React.createElement(n.icon),
        })
    )

    return (
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={nav}
            onClick={({ key }) => navigate(`/main/${key}`)}
          />
        </Sider>
    )
}