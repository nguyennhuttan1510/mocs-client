import { Col, Row } from 'antd'
import { constantFormat } from 'common/HandleFormat'
import TableSalary from 'components/Table'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const Salary = (props) => {
    const dataManagement = useSelector((state) => state.management.managementStaff)

    const convertStaffData = () => {
        let result = []
        if (!dataManagement) return result
        dataManagement.forEach((e, index) => {
            if (e.position !== 'Client') {
                result.push({
                    count: index + 1,
                    name: e.name,
                    phone: e.phone ? e.phone : 'No phone',
                    total_cost: e.total_cost + e.bonus + e.salary,
                    revenue: e.total_cost,
                    salary: e.salary,
                    bonus: e.bonus,
                })
            }
        })
        return result
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const data = useMemo(() => convertStaffData(), [dataManagement])

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
            render: (text) => <div>{constantFormat.upCaseFirst(text)}</div>,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: (value) => value.phone === 'No phone',
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            sorter: (a, b) => a.total_cost - b.total_cost,
            render: (value) => constantFormat.Money(value),
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
            sorter: (a, b) => a.salary - b.salary,
            render: (value) => constantFormat.Money(value),
        },
        {
            title: 'Bonus',
            dataIndex: 'bonus',
            key: 'bonus',
            sorter: (a, b) => a.bonus - b.bonus,
            render: (value) => constantFormat.Money(value),
        },
        {
            title: 'Total',
            dataIndex: 'total_cost',
            key: 'total_cost',
            sorter: (a, b) => a.total_cost - b.total_cost,
            render: (value) => constantFormat.Money(value),
        },
    ]
    return (
        <div>
            <Row>
                {/* <Col span={24}>
          <div className="management-staffs">
            <p>Manager Staff</p>
            <ChartManagementStaff id={"staff-management"} />
          </div>
        </Col> */}
                <Col span={24}>
                    <div className='table-salary'>
                        <TableSalary data={data} columns={columns} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

Salary.propTypes = {}

export default Salary
