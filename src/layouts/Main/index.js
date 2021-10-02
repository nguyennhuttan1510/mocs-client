import React, { useState } from 'react'
import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'

import './style.scss'
import { NavLink } from 'react-router-dom'
import { CONSTANT } from 'stores/constants'
import useDispatchAction from 'hook/useDispatch'
import { useSelector } from 'react-redux'
import useHeader from 'hook/useHeader'

const Main = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const profile = useSelector((state) => state.user.profile)
    const dispatch = useDispatchAction()
    const onCollapse = () => {
        setCollapsed(!collapsed)
    }
    const { Header, Content, Footer, Sider } = Layout
    const { SubMenu } = Menu
    const { children } = props
    const [headerTitle, setHeaderTitle] = useHeader()
    return (
        <>
            <Layout style={{ minHeight: '100vh', height: '100%' }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={() => {
                        onCollapse()
                    }}
                >
                    <div className='logo' />
                    <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
                        <Menu.Item key='1' icon={<PieChartOutlined />}>
                            <NavLink
                                to='/mocs-client'
                                onClick={() => {
                                    setHeaderTitle('Dashboard')
                                }}
                            >
                                Dashboard
                            </NavLink>
                        </Menu.Item>

                        <SubMenu key='sub1' icon={<UserOutlined />} title='Admin'>
                            <Menu.Item key={9}>
                                <NavLink
                                    to='/admin/management-business'
                                    onClick={() => {
                                        setHeaderTitle('Business Management')
                                    }}
                                >
                                    Business
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={10}>
                                <NavLink
                                    to='/admin/management-staff'
                                    onClick={() => {
                                        setHeaderTitle('Personnel Management')
                                    }}
                                >
                                    Personnel
                                </NavLink>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key='2' icon={<PieChartOutlined />}>
                            <NavLink
                                to={`/profile/${profile.id}`}
                                onClick={() => {
                                    setHeaderTitle('Profile')
                                }}
                            >
                                Profile
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className='site-layout' style={{ height: '100%' }}>
                    <Header className='site-layout-background header_home_page'>
                        <div className='header-left'>{headerTitle}</div>
                        <div className='header-right'>
                            <Menu mode='inline' theme='dark'>
                                <Menu.Item
                                    onClick={() => {
                                        dispatch(CONSTANT.ACTION_TYPE.LOGOUT)
                                    }}
                                    key='1'
                                >
                                    LOGOUT
                                </Menu.Item>
                            </Menu>
                        </div>
                    </Header>
                    <Content className='content' style={{ overflow: 'auto' }}>
                        <div
                            className='site-layout-background'
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Main
