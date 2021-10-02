import { socket } from './SocketClient'

const addTable = (payload) => {
    socket.emit('add-table', { ...payload, socketID: socket.id })
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
// const loginStaff = () => {
//     socket.emit('login-success')
// }

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
    socket.emit('get-all-data-management')
}

/* 
    ACTION CLIENT
*/

const callPayBill = (objTable) => {
    socket.emit('client-pay-bill', objTable)
}
const setFeedBack = (objFeedBack) => {
    socket.emit('client-feedback', objFeedBack)
}

const getProfile = (idClient) => {
    socket.emit('get-profile-client', idClient)
}

const login = (position) => {
    socket.emit('login', { ...position, socketID: socket.id })
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

    callPayBill,
}
export const emitManage = {
    getAllStaff,
    getAllMenu,
    getAllTableDefault,
    getAllManagement,
}

export const emitLogin = {
    // loginStaff,
    login,
}
export const emitClient = {
    // loginStaff,
    setFeedBack,
    getProfile,
}
