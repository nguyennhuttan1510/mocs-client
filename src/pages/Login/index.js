import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { authAction } from 'stores/reducers/user'
import './style.scss'
import useDispatchAction from 'hook/useDispatch'
import { CONSTANT } from 'stores/constants'
import { useHistory } from 'react-router'
const Login = (props) => {
    const dispatch = useDispatchAction()
    const history = useHistory()
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    }

    const onFinish = (values) => {
        const value = {
            username: values.username,
            password: values.password,
        }
        dispatch(CONSTANT.ACTION_TYPE.LOGIN, value, (res) => {
            if (res.status) {
                // history.push('/mocs-client')
                history.push('/users/3')
            }
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className='form-login'>
            <Form
                {...layout}
                name='basic'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[
                        { required: true, message: 'Please input your username!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        { required: true, message: 'Please input your password!' },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login
