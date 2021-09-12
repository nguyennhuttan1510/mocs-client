import { socket } from './SocketClient'

const addTable = (payload) => {
    socket.emit('add-table', payload)
}

const addMenu = (payload) => {
    socket.emit('add-menu', payload)
}

const payBill = (payload) => {
    socket.emit('pay-bill', payload)
}

const removeFood = (payload) => {
    socket.emit('remove-menu', payload)
}

const pushMenuToChef = (payload) => {
    socket.emit('push-to-chef', payload)
}

const chefSelectFood = (payload) => {
    socket.emit('make-food', payload)
}

/* 
    ACTION MANAGEMENT STAFF
*/

const getAllStaff = () => {
    socket.emit('get-all-staff')
}

const getAllMenu = () => {
    socket.emit('get-all-menu')
}

const getAllTableDefault = () => {
    socket.emit('get-all-table')
}

const getAllManagement = () => {
    socket.emit('get-data-management')
}

export const emitTable = {
    getAllStaff,
    getAllMenu,
    getAllTableDefault,
    getAllManagement,

    addTable,
    addMenu,
    payBill,
    removeFood,
    pushMenuToChef,

    chefSelectFood,
}
export const emitManage = {
    getAllStaff,
    getAllMenu,
    getAllTableDefault,
    getAllManagement,
}
