import { Col, Row } from 'antd'
import { constantFormat } from 'common/HandleFormat'
import TableSalary from 'components/Table'
import React from 'react'
import { useSelector } from 'react-redux'

const Salary = (props) => {
    const dataManagement = useSelector((state) => state.management.managementStaff)

    const data = dataManagement
        ? dataManagement.map((e, index) => {
              return {
                  count: index + 1,
                  name: e.name,
                  phone: e.phone ? e.phone : 'No phone',
                  total_cost: e.total_cost + e.bonus + e.salary,
                  revenue: e.total_cost,
                  salary: e.salary,
                  bonus: e.bonus,
              }
          })
        : []

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
            render: (text) => <a>{constantFormat.upCaseFirst(text)}</a>,
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
