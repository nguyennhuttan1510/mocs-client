import HttpClient from 'services/httpClient'

const httpClient = HttpClient()

const requires = (formData) => {
    console.log(
        '🚀 ~ file: table-and-menu.js ~ line 6 ~ requires ~ formData',
        formData
    )
    let form = new FormData()

    form.append('name', formData.name)
    form.append('price', formData.price)
    form.append('category', formData.category)
    form.append('discount', formData.discount ? parseInt(formData.discount) : 0)
    form.append('url_image', formData?.image ? formData?.image : null)
    form.append('description_short_food', formData?.description_short_food)
    form.append('_method', formData?.method || 'POST')
    // console.log('🚀 ~ file: table-and-menu.js ~ line 7 ~ requires ~ form', form)
    return form
}

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
    console.log(
        '🚀 ~ file: table-and-menu.js ~ line 31 ~ updateMenu ~ formData',
        formData
    )
    const require = requires(formData)
    // let form = new FormData()

    // form.append('name', formData.name)
    // form.append('price', formData.price)
    // form.append('category', formData.category)
    // form.append('discount', formData.discount ? parseInt(formData.discount) : 0)
    // const form = {
    //     name: formData.name,
    //     price: formData.price,
    //     category: formData.category,
    //     discount: formData.discount ? parseInt(formData.discount) : 0,
    // }
    console.log(
        '🚀 ~ file: table-and-menu.js ~ line 50 ~ updateMenu ~ form',
        require
    )
    let result
    try {
        const handleResponse = await httpClient.post(`menu/${formData.id}`, require)
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
