import { notification } from 'antd'

export const Notify = (type = 'success', message = '', description = '') => {
    notification[type]({
        message: message,
        description: description,
    })
}
