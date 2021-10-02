import HttpClient from 'services/httpClient'

const httpClient = HttpClient()

const createStaff = async (objStaff) => {
    var form = new FormData()
    form.append('avatar', objStaff.avatar)
    form.append('position', objStaff?.position || 'Client')
    form.append('name', objStaff.name)
    form.append('phone', objStaff.phone)
    form.append('username', objStaff.username)
    form.append('salary', objStaff.salary)
    form.append('password', objStaff.password)
    let result
    try {
        const handleResponse = await httpClient.post('/staff/', form)
        result = handleResponse.data
    } catch (error) {
        console.log(error)
    }
    return result
}

const updateStaff = async (objStaff) => {
    console.log('🚀 ~ file: staffs.js ~ line 25 ~ updateStaff ~ objStaff', objStaff)
    var form = new FormData()
    form.append('avatar', objStaff.avatar)
    form.append('position', objStaff?.position || 'Client')
    form.append('name', objStaff.name)
    form.append('phone', objStaff.phone)
    form.append('username', objStaff.username)
    form.append('salary', objStaff.salary || 0)
    form.append('password', objStaff.password || '')
    let result
    try {
        const handleResponse = await httpClient.post(`staff/${objStaff.id}`, form)
        result = await handleResponse.data
    } catch (error) {
        console.log(error)
    }
    return result
}

const deleteStaff = async (id) => {
    let result
    try {
        const handleResponse = await httpClient.delete(`/staff/${id}`)
        result = await handleResponse.data
    } catch (error) {
        console.log(error)
    }
    return result
}

const getAllStaff = async () => {
    let result
    try {
        const handleResponse = await httpClient.get(`/staff/`)
        result = handleResponse.data
    } catch (err) {
        console.log(err)
    }
    return result
}

export const staffAPI = {
    createStaff,
    updateStaff,
    deleteStaff,
    getAllStaff,
}
