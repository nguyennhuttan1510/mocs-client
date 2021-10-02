import HttpClient from 'services/httpClient'

const httpClient = HttpClient()

const orderFood = async (listFood) => {
    let result
    try {
        const res = await httpClient.post('/login', listFood)
        if (res.data?.status) {
            result = {
                status: true,
                message: 'Order successful',
            }
        } else {
            throw new Error('Order is invalid')
        }
    } catch (error) {
        result = {
            status: false,
            message: error.message,
        }
    }
    return result
}

const ApiCart = {
    orderFood,
}

export default ApiCart
