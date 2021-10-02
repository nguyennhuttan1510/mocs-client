import { Button, Form, Input, Modal, Select } from 'antd'
import React from 'react'
import { constantFormat } from 'common/HandleFormat'
import './style.scss'
import { HandleConvertURLImage } from 'common/HandleConvertURLImage'

const ModalHome = (props) => {
    const {
        contents,
        data,
        isVisible,
        isDisable,
        handleSetIsVisible,
        handleChangeData,
        handleClickOK,
        timeout,
    } = props
    const { TextArea } = Input
    const [confirmLoading, setConfirmLoading] = React.useState(false)
    const [fileUpload, setFileUpload] = React.useState({})

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            handleSetIsVisible()
            setConfirmLoading(false)
            setFileUpload({})
            handleClickOK()
        }, timeout)
    }

    const handleCancel = () => {
        handleSetIsVisible()
        setFileUpload({})
    }

    const displayStatusButton = () => {
        if (!data?.chef || !data?.profile) return 'Ok'
        let result = ''
        if (data?.status === 'Order') {
            result = 'OK'
        } else if (data.profile?.name === data.chef?.name) {
            result = 'Done'
        } else {
            result = 'Receive'
        }
        return result
    }

    const changeDataForm = (e) => {
        let { value, name } = e.target
        handleChangeData(value, name)
    }

    const handleChange = (e) => {
        console.log(
            '🚀 ~ file: index.js ~ line 59 ~ handleChange ~ info',
            e.target.files[0]
        )
        handleChangeData(e.target.files[0], e.target.name)
        setFileUpload(e.target.files[0])
    }

    return (
        <>
            <Modal
                title={
                    contents === 'priceBill'
                        ? 'Payment'
                        : contents === 'foodOfTable'
                        ? 'Receive Food'
                        : contents === 'createStaff'
                        ? 'Create Staff'
                        : ''
                }
                visible={isVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button
                        key='submit'
                        type='primary'
                        loading={confirmLoading}
                        onClick={handleOk}
                    >
                        {contents === 'foodOfTable' ? displayStatusButton() : 'OK'}
                    </Button>,
                ]}
            >
                {contents === 'priceBill' ? (
                    <Form name='basic' initialValues={{ remember: false }}>
                        <div className='total_cost'>
                            {constantFormat.Money(data?.cost)}
                        </div>
                        <Form.Item
                            name='username'
                            rules={[
                                { required: true, message: 'Please input cost!' },
                            ]}
                        >
                            <Input
                                maxLength={9}
                                type='number'
                                autoComplete='off'
                                onChange={(e) => {
                                    handleChangeData(e.target.value)
                                }}
                            />
                        </Form.Item>
                        <div
                            className='total_cost'
                            style={{
                                marginTop: '20px',
                                color: `${data.cash >= 0 ? 'green' : 'red'}`,
                            }}
                        >
                            {new Intl.NumberFormat().format(data?.cash)}
                        </div>
                    </Form>
                ) : contents === 'foodOfTable' ? (
                    <>
                        {data?.note ? (
                            <div>
                                {data?.note.map((item) => {
                                    return <h4>{item}</h4>
                                })}
                            </div>
                        ) : (
                            'No Note'
                        )}
                    </>
                ) : contents === 'createStaff' ? (
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        layout='horizontal'
                    >
                        <Form.Item label='Username'>
                            <Input
                                value={data.username}
                                disabled={isDisable}
                                name='username'
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Full Name'>
                            <Input
                                name='name'
                                value={data.name}
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Position'>
                            <Select
                                value={data.position}
                                onChange={(e) => {
                                    handleChangeData(e, 'position')
                                }}
                            >
                                <Select.Option value='Admin'>Admin</Select.Option>
                                <Select.Option value='Manager'>
                                    Manager
                                </Select.Option>
                                <Select.Option value='Staff'>Staff</Select.Option>
                                <Select.Option value='Chef'>Chef</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='Phone'>
                            <Input
                                value={data.phone}
                                name='phone'
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Salary'>
                            <Input
                                value={data.salary}
                                name='salary'
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Bonus'>
                            <Input
                                value={data.bonus}
                                name='bonus'
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Avatar'>
                            <label
                                htmlFor='file-upload'
                                className='custom-file-upload'
                            >
                                Upload Image
                            </label>
                            <input
                                id='file-upload'
                                name='avatar'
                                type='file'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
                            {data?.avatar && !fileUpload?.name ? (
                                <div
                                    className='bg-image-menu'
                                    style={{
                                        backgroundImage: `url(${HandleConvertURLImage(
                                            data.avatar
                                        )})`,
                                    }}
                                ></div>
                            ) : (
                                <div>{fileUpload?.name}</div>
                            )}
                        </Form.Item>
                    </Form>
                ) : contents === 'createMenu' ? (
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        layout='horizontal'
                    >
                        <Form.Item label='Name'>
                            <Input
                                name='name'
                                value={data.name}
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Price'>
                            <Input
                                name='price'
                                value={data.price}
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Category'>
                            <Select
                                value={data.category}
                                onChange={(e) => {
                                    handleChangeData(e, 'category')
                                }}
                            >
                                <Select.Option value='food'>Food</Select.Option>
                                <Select.Option value='drink'>Drink</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='Discount'>
                            <Input
                                value={data.discount}
                                name='discount'
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Description'>
                            <TextArea
                                name='description_short_food'
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                                placeholder='Description Food'
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </Form.Item>
                        <Form.Item label='Image'>
                            <label for='file-upload' class='custom-file-upload'>
                                Upload Image
                            </label>
                            <input
                                id='file-upload'
                                name='image'
                                type='file'
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                            />
                            {data?.url_image && !fileUpload?.name ? (
                                <div
                                    className='bg-image-menu'
                                    style={{
                                        backgroundImage: `url(${HandleConvertURLImage(
                                            data.url_image
                                        )})`,
                                    }}
                                ></div>
                            ) : (
                                <div>{fileUpload?.name}</div>
                            )}
                        </Form.Item>
                    </Form>
                ) : contents === 'createTable' ? (
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        layout='horizontal'
                    >
                        <Form.Item label='Name'>
                            <Input
                                value={data.name}
                                name='name'
                                onChange={(e) => {
                                    changeDataForm(e)
                                }}
                            />
                        </Form.Item>
                    </Form>
                ) : (
                    <></>
                )}
            </Modal>
        </>
    )
}

ModalHome.defaultProps = {
    isVisible: false,
    timeout: 2000,
    contents: 'priceBill',
    data: {},
}

export default ModalHome
