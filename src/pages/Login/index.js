import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import './style.scss'
import useDispatchAction from 'hook/useDispatch'
import { CONSTANT } from 'stores/constants'
import { useHistory } from 'react-router'
import { emitLogin } from 'services/SocketIO/EmitServer'
import { staffAPI } from 'api/staffs'
import { Notify } from 'components/Notify'
const Login = (props) => {
    const dispatch = useDispatchAction()
    const history = useHistory()
    const [isSignUp, setIsSignUp] = useState(false)
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    const onFinish = async (values) => {
        if (isSignUp) {
            const value = {
                username: values.username,
                password: values.password,
                confirm: values.confirm,
                name: values.name,
            }
            const res = await staffAPI.createStaff(value)
            if (res.status) {
                Notify('success', 'Success', res.message)
                setIsSignUp(false)
            } else {
                Notify('error', 'Error', res.message)
            }
            return
        }
        const value = {
            username: values.username,
            password: values.password,
        }
        dispatch(CONSTANT.ACTION_TYPE.LOGIN, value, (res) => {
            if (res?.status) {
                const payload = {
                    position: res.data?.position,
                    userID: res.data?.id,
                    name: res.data?.name,
                }

                emitLogin.login(payload)
                if (res.data.position !== 'Client') {
                    history.push('/mocs-client')
                } else {
                    history.push('/users')
                }
            } else {
                Notify('error', 'Login Fail', 'Try again')
            }
        })
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className='form-login'>
            <h1 className='title-login'>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
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
                {isSignUp && (
                    <>
                        <Form.Item
                            label='Confirm'
                            name='confirm'
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve()
                                        }

                                        return Promise.reject(
                                            new Error(
                                                'The two passwords are not match!'
                                            )
                                        )
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label='Full Name'
                            name='name'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your full name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </>
                )}
                <div className='wrap-option'>
                    <Form.Item
                        name='remember'
                        valuePropName='checked'
                        className='form-option'
                        // style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name='remember'
                        // style={{
                        //     display: 'inline-block',
                        //     width: 'calc(50% - 12px)',
                        //     textAlign: 'end',
                        // }}
                    >
                        <div
                            className='type-login'
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                            }}
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </div>
                    </Form.Item>
                </div>
                {/* <Form.Item style={{ justifyContent: 'center' }}> */}
                <Button
                    block
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                >
                    {isSignUp ? 'Sign Up' : 'Log in'}
                </Button>
                {/* </Form.Item> */}
            </Form>
        </div>
    )
}
export default Login
