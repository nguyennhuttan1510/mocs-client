import React, { useCallback, useEffect, useState } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'

import { Row, Col, Tabs, Table, Button, Space, Badge } from 'antd'
import ModalHome from 'components/Modal'
import { useSelector } from 'react-redux'
import { emitTable } from 'services/SocketIO/EmitServer'
import { Notify } from 'components/Notify'
import { constantFormat } from 'common/HandleFormat'

var get = require('lodash/get')

const TableDetail = (props) => {
    const { detailTable, handleAddMenu, handleRemoveMenu, onClose } = props
    const table = useSelector((state) => state.dashboard.table)
    const Menu = useSelector((state) => state.dashboard.listMenu)
    const profile = useSelector((state) => state.user.profile)

    const [isVisible, setIsVisible] = useState(false)
    const [checkPay, setCheckPay] = useState(0)
    const [priceBill, setPriceBill] = useState({
        cost: 0,
        cash: 0,
    })

    useEffect(() => {
        setPriceBill((prevState) => ({
            ...prevState,
            cost: detailTable.total_cost,
        }))
    }, [detailTable])

    const { TabPane } = Tabs
    // ============================== CONFIG COL TABLE
    const columns = [
        {
            title: 'Name Food',
            dataIndex: 'name',
            render: (value) => constantFormat.upCaseFirst(value),
        },
        {
            title: 'Count',
            dataIndex: 'count',
            sorter: {
                compare: (a, b) => a.count - b.count,
                multiple: 3,
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: {
                compare: (a, b) => a.price - b.price,
                multiple: 2,
            },
            render: (value) => constantFormat.Money(value),
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            sorter: {
                compare: (a, b) => a.discount - b.discount,
                multiple: 2,
            },
            render: (value) => `${value} %`,
        },
        {
            title: 'Total',
            dataIndex: 'total',
            sorter: {
                compare: (a, b) => a.total - b.total,
                multiple: 1,
            },
            render: (value) => constantFormat.Money(value),
        },
        {
            title: 'Action',
            key: 'action',
            render: (item) => (
                <Space size='middle'>
                    {item?.status === 'Order' ? (
                        <Button
                            className='delete'
                            onClick={() => {
                                handleRemoveMenu(item, table.id)
                            }}
                        >
                            delete
                        </Button>
                    ) : item?.status === 'Pending' ? (
                        <div className='noti-table-bill'> Pending </div>
                    ) : (
                        <div className='noti-table-bill food-done'> Done </div>
                    )}
                </Space>
            ),
        },
    ]

    // ============================== END CONFIG COL TABLE

    const listFoodOrder = get(detailTable, 'menu', [])
    const isMakeFood = get(detailTable, 'isMakeFood')

    const handleSetIsVisible = () => {
        setIsVisible(false)
    }

    const handleChangePriceBill = (value) => {
        let cash = 0
        cash = value - priceBill.cost
        setCheckPay(value)
        setPriceBill((prev) => {
            return { ...prev, cash: cash }
        })
    }
    const handleClickOK = () => {
        if (!detailTable || checkPay <= 0 || priceBill.cash < 0) return
        const payload = {
            id: detailTable.id,
            server: profile,
        }
        emitTable.payBill(payload)
        setTimeout(() => {
            onClose(false)
        }, 2000)
    }

    const handleBadgeFood = useCallback(
        (item) => {
            if (!listFoodOrder) return
            const isBadge = listFoodOrder.find((e) => e.id === item.id)
            if (!isBadge || isBadge === undefined) return
            return isBadge.count
        },
        [listFoodOrder]
    )

    return (
        <div className='dashboard'>
            <ModalHome
                contents='priceBill'
                data={priceBill}
                isVisible={isVisible}
                handleSetIsVisible={handleSetIsVisible}
                handleChangeData={handleChangePriceBill}
                handleClickOK={handleClickOK}
            />
            <Button
                className='close_table'
                onClick={() => {
                    onClose(false)
                }}
            >
                X
            </Button>
            <div className='wrap_table_detail'>
                <div
                    className='total_cost'
                    onClick={() =>
                        isMakeFood || priceBill.cost === 0
                            ? setIsVisible(!isVisible)
                            : Notify(
                                  'error',
                                  'Failed',
                                  "Client is ordering, can't pay!"
                              )
                    }
                >
                    {`${
                        detailTable.total_cost
                            ? constantFormat.Money(detailTable.total_cost)
                            : 0
                    } VND`}
                </div>
                <Tabs defaultActiveKey='1'>
                    <TabPane
                        tab='FOOD'
                        className='tab_table'
                        style={{ color: 'red' }}
                        key='1'
                    >
                        <Row>
                            {Menu?.menu_food.map((item, key) => (
                                <Col key={key} className='list_table' span={6}>
                                    <Badge count={handleBadgeFood(item)}>
                                        <div
                                            className='table noselect'
                                            onClick={() => {
                                                handleAddMenu(item, table.id)
                                            }}
                                        >
                                            <h4>{item.name}</h4>
                                        </div>
                                    </Badge>
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tab='DRINK' className='tab_table' key='2'>
                        <Row>
                            {Menu?.menu_drink.map((item, key) => (
                                <Col key={key} className='list_table' span={6}>
                                    <Badge count={handleBadgeFood(item)}>
                                        <div
                                            className='table noselect'
                                            onClick={() => {
                                                handleAddMenu(item, table.id)
                                            }}
                                        >
                                            <h4>{item.name}</h4>
                                        </div>
                                    </Badge>
                                </Col>
                            ))}
                        </Row>
                    </TabPane>
                    <TabPane tab='BILL' className='tab_table bold' key='3'>
                        <Table
                            columns={columns}
                            dataSource={listFoodOrder}
                            pagination={false}
                        />
                        <div className='footer-action'>
                            <Button
                                type='primary'
                                shape='round'
                                icon={<CloudUploadOutlined />}
                                size={'large'}
                                onClick={() => {
                                    emitTable.pushMenuToChef(table)
                                    Notify(
                                        'success',
                                        'Success',
                                        'Food is making , please wait'
                                    )
                                }}
                                disabled={isMakeFood || listFoodOrder?.length === 0}
                            >
                                Push
                            </Button>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default TableDetail
