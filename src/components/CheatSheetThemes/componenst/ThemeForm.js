import React from 'react';
import {Button, Modal, Form, Input, Upload, Select} from 'antd';
import {UploadOutlined} from '@ant-design/icons'; 

const {Option} = Select;

const ThemeForm = ({showForm, visible, handleOk, handleCancel, onFinish, normFile, errorMessage, section}) => {

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
                Create a cheat sheet theme
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
                        <Input placeholder='Theme of cheat sheet'/>
                    </Form.Item>

                    <Form.Item 
                        label='Keyword'
                        name='keyword'
                        rules={[{ required: true, message: 'Please input title! '}]}
                    >
                        <Input placeholder='Keyword'/>
                    </Form.Item>

                    <Form.Item
                        name='сheatSheetSectionId'
                        label='Section'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder='Plese chose a section'
                            allowClear
                        >
                            {section.map(section => {
                                return <Option key={section.key} value={section.key}>{section.title}</Option>
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name='image'
                        label='Upload'
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

export default ThemeForm;