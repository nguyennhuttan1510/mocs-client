import { Tabs } from 'antd'
import { staffAPI } from 'api/staffs'
import ModalHome from 'components/Modal'
import { Notify } from 'components/Notify'
import React, { useState } from 'react'
import { emitManage } from 'services/SocketIO/EmitServer'
import 'styles/_Home.scss'
import InfoStaff from './InfoStaff'
import SalaryStaff from './Salary'
import './style.scss'

const Personnel = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    const [formCreate, setFormCreate] = useState({})

    const handleChangeData = (value, name) => {
        setFormCreate({ ...formCreate, [name]: value })
    }
    const { TabPane } = Tabs

    const handleClickOK = async () => {
        await staffAPI
            .createStaff(formCreate)
            .then((res) => {
                if (res.status) {
                    Notify('success', 'Success', res.message)
                } else {
                    Notify('error', 'Fail', res.message)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        emitManage.getAllStaff()
        emitManage.getAllManagement()
    }

    const handleSetIsVisible = () => {
        setIsVisible(false)
    }

    return (
        <div className='management-admin'>
            <ModalHome
                data={formCreate}
                contents={'createStaff'}
                isVisible={isVisible}
                handleChangeData={handleChangeData}
                handleClickOK={handleClickOK}
                handleSetIsVisible={handleSetIsVisible}
            />
            <Tabs defaultActiveKey='1'>
                <TabPane tab='INFORMATION' key='1'>
                    <InfoStaff setIsVisible={setIsVisible} />
                </TabPane>
                <TabPane tab='SALARY' key='2'>
                    <SalaryStaff />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Personnel
