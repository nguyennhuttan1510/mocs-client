import React, { useMemo } from 'react'
import { Table, Space, Button, Row, Col } from 'antd'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Notify } from 'components/Notify'
import { emitManage } from 'services/SocketIO/EmitServer'
import { staffAPI } from 'api/staffs'
import { constantFormat } from 'common/HandleFormat'

const InfoStaff = (props) => {
    const { setIsVisible, setFormCreate, setIsUpdate } = props

    const listStaff = useSelector((state) => state.dashboard.staffs)

    const handleRemoveStaff = async (id) => {
        await staffAPI
            .deleteStaff(id)
            .then((res) => {
                if (res.status) {
                    Notify('success', 'Success', res.message)
                    emitManage.getAllStaff()
                    emitManage.getAllManagement()
                } else {
                    Notify('error', 'Failed', res.message)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    const columns = [
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <Link to={`/profile/${record.id}`}>
                    {constantFormat.upCaseFirst(text)}
                </Link>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (text) => (text ? text : 'No Phone'),
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => constantFormat.Date(text),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <DeleteOutlined
                        onClick={() => {
                            handleRemoveStaff(record.id)
                        }}
                        style={{ color: 'red' }}
                    />
                    <FormOutlined
                        onClick={() => {
                            setIsVisible(true)
                            setIsUpdate(true)
                            setFormCreate({
                                id: record.id,
                                username: record.username,
                                name: record.name,
                                phone: record.phone,
                                position: record.position,
                                salary: record.salary,
                                bonus: record.bonus,
                                avatar: record.avatar,
                            })
                        }}
                        style={{ color: 'green' }}
                    />
                </Space>
            ),
        },
    ]

    const convertStaffData = () => {
        let result = []
        if (!listStaff) return result
        listStaff.forEach((e, index) => {
            if (e.position !== 'Client') {
                result.push({
                    id: e.id,
                    count: index + 1,
                    username: e.username,
                    name: e.name,
                    phone: e.phone,
                    position: e.position,
                    bonus: e.bonus,
                    salary: e.salary,
                    avatar: e.avatar,
                    createdAt: e.createdAt,
                })
            }
        })
        return result
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = useMemo(() => convertStaffData(), [listStaff])

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <Row justify='end'>
                    <Col span={4}>
                        <div style={{ float: 'right' }}>
                            <Button
                                onClick={() => {
                                    setIsVisible(true)
                                    setIsUpdate(false)
                                    setFormCreate({})
                                }}
                            >
                                Create Staff
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

InfoStaff.propTypes = {}

export default InfoStaff
