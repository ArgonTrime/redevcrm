import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

const QuotesForm = ({showForm, visible, handleOk, handleCancel, onFinish, errorMessage}) => {

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
                Create Quote
            </Button>
            <Modal 
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    title='Quote'
            >
                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item 
                        label='Author'
                        name='author'
                        rules={[{ required: true, message: 'Please input author! '}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label='Quote'
                        name='text'
                        rules={[{ required: true, message: 'Please input your quote! '}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button  
                            type='primary' 
                            htmlType='submit'
                        >
                            Add Quote
                        </Button>
                    </Form.Item>
                </Form>
                <span>{errorMessage ? errorMessage : null}</span>
            </Modal>
        </>
    )
}

export default QuotesForm;