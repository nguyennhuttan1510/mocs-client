import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { tableAction } from 'stores/reducers/dashboard'
import { manager } from 'stores/reducers/management'
import { homeAction } from 'stores/reducers/clients/home'
import { cartAction } from 'stores/reducers/clients/cart'
import { authAction } from 'stores/reducers/user'

//CONNECT SERVER SOCKET IO
const ENDPOINT = process.env.REACT_APP_API_SERVER
export const socket = io(ENDPOINT, {
    transports: ['websocket'],
})

//LISTEN DATA FORM SERVER
const SocketClient = ({ children }) => {
    const dispatch = useDispatch()
    socket.on('info-user', (data) => {
        if (!data) return
        dispatch(authAction.loginSuccess(data))
    })

    socket.on('data-manage-tables', (listTable) => {
        dispatch(tableAction.addTable(listTable))
    })

    socket.on('the-list-table', (data) => {
        console.log(data)
        dispatch(tableAction.listTable(data))
    })

    socket.on('the-list-menu', (data) => {
        console.log(data)
        dispatch(tableAction.listMenu(data))
    })

    // socket.on('notification-message-client', (data) => {
    //     console.log(data)
    //     Notify(data.type, data.title, data.description, 'bottomRight')
    // })

    // socket.on('notification-message-service', (data) => {
    //     console.log(data)
    //     Notify(data.type, data.title, data.description)
    // })

    //================ADMIN==========================

    socket.on('data-staff', (listStaff) => {
        dispatch(tableAction.staffs(listStaff))
    })

    socket.on('data-management', (data) => {
        console.log(data)
        dispatch(manager.managementStaff(data))
    })

    socket.on('data-business', (data) => {
        console.log(data)
        dispatch(manager.foodBestSeller(data))
    })

    //========================= CLIENTS ==================

    socket.on('client-information', (data) => {
        dispatch(authAction.loginSuccess(data))
    })
    socket.on('event-for-client', (data) => {
        dispatch(homeAction.getEvent(data))
    })
    socket.on('table-client', (data) => {
        dispatch(cartAction.getTableClient(data))
    })
    socket.on('category-home-client', (data) => {
        dispatch(homeAction.getCategory(data))
    })
    socket.on('the-list-menu', (data) => {
        dispatch(homeAction.getListMenu(data))
    })
    socket.on('bill-client', (data) => {
        dispatch(cartAction.getBill(data))
    })
    return <>{children}</>
}

SocketClient.propTypes = {
    children: PropTypes.element.isRequired,
}

export default SocketClient
