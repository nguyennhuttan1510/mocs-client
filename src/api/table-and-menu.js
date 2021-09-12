import HttpClient from 'services/httpClient'

const httpClient = HttpClient()

const requires = (formData) => ({
    name: formData.name,
    price: parseInt(formData.price),
    category: formData.category,
    discount: formData.discount ? parseInt(formData.discount) : 0,
})

const createMenu = async (formData) => {
    const require = requires(formData)
    let result
    try {
        const handleResponse = await httpClient.post('menu/', require)
        result = await handleResponse.data
    } catch (error) {
        console.log(error)
        result = {
            status: false,
        }
    }
    return result
}

const updateMenu = async (formData) => {
    const require = requires(formData)
    let result
    try {
        const handleResponse = await httpClient.put(`menu/${formData.id}`, require)
        result = handleResponse.data
    } catch (error) {
        console.log(error)
        result = {
            status: false,
        }
    }
    return result
}

const deleteMenu = async (idMenu) => {
    let result
    try {
        const handleResponse = await httpClient.delete(`menu/${idMenu}`)
        result = await handleResponse.data
    } catch (error) {
        console.log(error)
    }
    return result
}

const getAllMenu = async () => {
    let result
    try {
        const handleResponse = await httpClient.get('menu/')
        result = await handleResponse.data
    } catch (error) {
        console.log(error)
    }
    return result
}

const createTable = async (formData) => {
    const require = {
        name: formData.name,
    }
    let result
    try {
        const handleResponse = await httpClient.post('table/', require)
        result = await handleResponse.data
    } catch (error) {
        result = {
            status: false,
        }
    }
    return result
}

const updateTable = async (formData) => {
    const require = {
        name: formData.name,
    }
    let result
    try {
        const handleResponse = await httpClient.put(`table/${formData.id}`, require)

        result = await handleResponse.data
    } catch (error) {
        result = {
            status: false,
        }
    }
    return result
}

const deleteTable = async (idTable) => {
    let result
    try {
        const handleResponse = await httpClient.delete(`table/${idTable}`)
        result = await handleResponse.data
    } catch (error) {
        result = {
            status: false,
        }
    }
    return result
}

export const TableMenu = {
    createMenu,
    updateMenu,
    deleteMenu,
    getAllMenu,
    createTable,
    updateTable,
    deleteTable,
}
