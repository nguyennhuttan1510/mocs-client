import HttpClient from 'services/httpClient'

const httpClient = HttpClient()

const createStaff = async (objStaff) => {
    var form = new FormData()
    // form.append("avatar", "");
    form.append('position', objStaff.position)
    // form.append("id", "10");
    form.append('name', objStaff.name)
    // form.append("phone", "");
    form.append('username', objStaff.username)
    form.append('salary', objStaff.salary)
    // form.append("password", "123456");
    let result
    try {
        const handleResponse = await httpClient.post('/staff/', form)
        result = await handleResponse.data
    } catch (error) {
        console.log(error)
    }
    return result
}

const updateStaff = async (objStaff) => {
    let result
    try {
        const handleResponse = await httpClient.patch(
            `staff/${objStaff.id}`,
            objStaff
        )
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
