import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Col, Row, Space, Tabs } from 'antd'
import { TableMenu } from 'api/table-and-menu'
import { constantFormat } from 'common/HandleFormat'
import ModalHome from 'components/Modal'
import { Notify } from 'components/Notify'
import TableComponent from 'components/Table'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { emitTable } from 'services/SocketIO/EmitServer'
import 'styles/_Home.scss'
import BestSellerChart from './BestSellerChart'

const Business = () => {
    const tableActive = useSelector((state) => state.dashboard.data)
    const listMenu = useSelector((state) => state.dashboard.listMenu)
    const listTable = useSelector((state) => state.dashboard.listTable)
    const dataBestSeller = useSelector(
        (state) => state.management.managementBestSeller
    )
    const [isVisible, setIsVisible] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [createForm, setCreateForm] = useState({})
    const [contentModal, setContentModal] = useState('createMenu')

    const { TabPane } = Tabs

    const handleClickOK = async () => {
        const res = isUpdate
            ? contentModal === 'createTable'
                ? await TableMenu.updateTable(createForm)
                : await TableMenu.updateMenu(createForm)
            : contentModal === 'createTable'
            ? await TableMenu.createTable(createForm)
            : await TableMenu.createMenu(createForm)
        if (res.status) {
            Notify('success', 'Success', res.message)
        } else {
            Notify('error', 'Fail', res.message)
        }
        if (contentModal === 'createMenu') {
            emitTable.getAllMenu()
        } else if (contentModal === 'createTable') {
            emitTable.getAllTableDefault()
        }
        setCreateForm({})
    }

    const handleChangeData = (value, name) => {
        setCreateForm({ ...createForm, [name]: value })
    }
    const handleSetIsVisible = () => {
        setIsVisible(false)
        setCreateForm({})
    }

    const dataListMenu =
        listMenu &&
        [...listMenu.menu_food, ...listMenu.menu_drink, ...listMenu.other].map(
            (e, index) => {
                return {
                    id: e.id,
                    count: index + 1,
                    name: e.name,
                    price: e.price,
                    discount: e.discount,
                    category: e.category,
                    url_image: e.url_image,
                    description_short_food: e.description_short_food,
                }
            }
        )

    const dataListTable =
        listTable &&
        listTable.map((e, index) => ({
            count: index + 1,
            id: e.id,
            name: e.name,
        }))

    const handleDeleteMenu = async (idMenu) => {
        if (!idMenu) return
        await TableMenu.deleteMenu(idMenu)
            .then((res) => {
                if (res.status) {
                    Notify('success', 'Success', res.message)
                } else {
                    Notify('error', 'Fail', res.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        emitTable.getAllMenu()
    }

    const handleDeleteTable = async (idTable) => {
        if (!idTable) return
        await TableMenu.deleteTable(idTable)
            .then((res) => {
                if (res.status) {
                    Notify('success', 'Success', res.message)
                } else {
                    Notify('error', 'Fail', res.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        emitTable.getAllTableDefault()
    }

    const columnsListMenu = [
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b>{constantFormat.upCaseFirst(text)}</b>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            // render: (text) => {
            //   upCaseFirst(text);
            // },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (value) => constantFormat.Money(value),
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            sorter: (a, b) => a.total_cost - b.total_cost,
            render: (value) => `${value} %`,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <DeleteOutlined
                        onClick={() => {
                            handleDeleteMenu(record.id)
                        }}
                        style={{ color: 'red' }}
                    />
                    <FormOutlined
                        onClick={() => {
                            setIsVisible(true)
                            setIsUpdate(true)
                            setCreateForm({
                                id: record.id,
                                name: record.name,
                                price: record.price,
                                category: record.category,
                                discount: record.discount,
                                url_image: record.url_image,
                                description_short_food:
                                    record.description_short_food,
                            })
                        }}
                        style={{ color: 'green' }}
                    />
                </Space>
            ),
        },
    ]

    const columnsListTable = [
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <DeleteOutlined
                        onClick={() => {
                            handleDeleteTable(record.id)
                        }}
                        style={{ color: 'red' }}
                    />
                    <FormOutlined
                        onClick={() => {
                            setIsVisible(true)
                            setIsUpdate(true)
                            setCreateForm({
                                id: record.id,
                                name: record.name,
                            })
                        }}
                        style={{ color: 'green' }}
                    />
                </Space>
            ),
        },
    ]

    const convertDataBestSeller = () => {
        let result = []
        if (!dataBestSeller) return []
        result = dataBestSeller.map((e) => ({
            category: e.name_food,
            value: e.count,
        }))
        return result
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataConvertBestSeller = useMemo(
        () => convertDataBestSeller(),
        [dataBestSeller]
    )
    return (
        <>
            <ModalHome
                data={createForm}
                contents={contentModal}
                isVisible={isVisible}
                handleChangeData={handleChangeData}
                handleClickOK={handleClickOK}
                handleSetIsVisible={handleSetIsVisible}
            />
            {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <ChartRevenue id={"chartRevenue"} />
        </Col>
        <Col span={12}>
          <ChartRevenue id={"chartA"} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ChartProfit id={"chartprofit"} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ChartBestSeller id={"chartbestseller"} />
        </Col>
      </Row> */}
            <Tabs
                defaultActiveKey='1'
                onChange={(key) => {
                    if (key === '1') {
                        setContentModal('createMenu')
                    } else if (key === '2') {
                        setContentModal('createTable')
                    }
                }}
            >
                <TabPane tab='MENU' key='1'>
                    <div style={{ marginBottom: '20px' }}>
                        <Row justify='end'>
                            <Col span={4}>
                                <div style={{ float: 'right' }}>
                                    <Button
                                        disabled={
                                            tableActive && tableActive.length !== 0
                                        }
                                        onClick={() => {
                                            setIsVisible(true)
                                            setIsUpdate(false)
                                            setCreateForm({})
                                        }}
                                    >
                                        Create Menu
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <TableComponent data={dataListMenu} columns={columnsListMenu} />
                </TabPane>
                <TabPane tab='TABLE' key='2'>
                    <div style={{ marginBottom: '20px' }}>
                        <Row justify='end'>
                            <Col span={4}>
                                <div style={{ float: 'right' }}>
                                    <Button
                                        disabled={
                                            tableActive && tableActive.length !== 0
                                        }
                                        onClick={() => {
                                            setIsVisible(true)
                                            setIsUpdate(false)
                                            setCreateForm({})
                                        }}
                                    >
                                        Create Table
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <TableComponent
                        data={dataListTable}
                        columns={columnsListTable}
                    />
                </TabPane>
                <TabPane tab='BEST SELLER' key='3'>
                    <Row>
                        <Col span={24}>
                            <BestSellerChart
                                dataBestSeller={dataConvertBestSeller}
                                columns={dataListMenu.name}
                                id={'chart_bestseller'}
                            />
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </>
    )
}

export default Business
