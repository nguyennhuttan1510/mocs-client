import { notification } from 'antd'

export const Notify = (
    type = 'success',
    message = '',
    description = '',
    placement = 'topRight'
) => {
    notification[type]({
        message: message,
        description: description,
        placement,
    })
}
