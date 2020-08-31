import React from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SectionForm = ({showForm, visible, handleOk, handleCancel, onFinish, normFile, errorMessage}) => {

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 12}
    }

    const tailLayout = {
        wrapperCol: { offset: 0, span: 4 },
    }

    return (
        <>
            <Button 
                type="primary"
                onClick={showForm}
                style={{
                    marginBottom: '16px'
                }}
            >
                Create cheat sheet
            </Button>
            <Modal 
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                title='Cheat sheet'
            >

                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item 
                        label='Title'
                        name='title'
                        rules={[{ required: true, message: 'Please input title! '}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name='logo'
                        label='Logo'
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                        extra='PNG'
                    >
                        <Upload name='image' action='https://redevcrm.herokuapp.com/upload' listType='picture'>
                            <Button>
                                <UploadOutlined /> Upload photo
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name='image'
                        label='Image'
                        valuePropName='fileList'
                        getValueFromEvent={normFile}
                        extra='PNG'
                    >
                        <Upload name='image' action='https://redevcrm.herokuapp.com/upload' listType='picture'>
                            <Button>
                                <UploadOutlined /> Upload photo
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button  
                            type='primary' 
                            htmlType='submit'
                        >
                            Create cheat sheet
                        </Button>
                        
                    </Form.Item>
                </Form>
                <span>{errorMessage && errorMessage}</span>
            </Modal>
        </>
    )
}

export default SectionForm;