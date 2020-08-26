import React from 'react';
import {Button, Modal, Form, Input} from 'antd';

const TaskForm = ({showForm, visible, handleOk, handleCancel, onFinish, errorMessage}) => {   

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
                    margin: '16px'
                }}
            >
                Create task
            </Button>

            <Modal 
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                title='Task'
            >
                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item 
                        label='Theme'
                        name='theme'
                        rules={[{ required: true, message: 'Please input theme! '}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label='Text'
                        name='text'
                        rules={[{ required: true, message: 'Please input your text! '}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button  
                            type='primary' 
                            htmlType='submit'
                        >
                            Add task
                        </Button>
                        
                    </Form.Item>
                </Form>
                <span>{errorMessage ? errorMessage : null}</span>
            </Modal>
        </>
    )
}

export default TaskForm;