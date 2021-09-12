import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { tableAction } from 'stores/reducers/dashboard'
import { manager } from 'stores/reducers/management'

//CONNECT SERVER SOCKET IO
const ENDPOINT = process.env.REACT_APP_API_SERVER
export const socket = io(ENDPOINT, {
    transports: ['websocket'],
})

//LISTEN DATA FORM SERVER
const SocketClient = ({ children }) => {
    const dispatch = useDispatch()

    socket.on('data-table', (listTable) => {
        dispatch(tableAction.addTable(listTable))
    })

    socket.on('data-staff', (listStaff) => {
        dispatch(tableAction.staffs(listStaff))
    })

    socket.on('data-management', (data) => {
        console.log(data)
        dispatch(manager.managementStaff(data))
    })

    socket.on('data-menu', (data) => {
        console.log(data)
        dispatch(tableAction.listMenu(data))
    })

    socket.on('data-default-table', (data) => {
        console.log(data)
        dispatch(tableAction.listTable(data))
    })

    socket.on('data-best-seller', (data) => {
        console.log(data)
        dispatch(manager.foodBestSeller(data))
    })
    return <>{children}</>
}

SocketClient.propTypes = {
    children: PropTypes.element.isRequired,
}

export default SocketClient
