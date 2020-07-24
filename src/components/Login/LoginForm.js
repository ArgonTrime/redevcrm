import React from 'react';
import { Form, Input, Button, Modal} from 'antd';
import './LoginForm.css';

class LoginForm extends React.Component {

    state = {
        visible: false
    }

    showForm = () => {
        this.setState({visible: true})
    }

    handleOk = () => {
        this.setState({visible: false})
    };
    
    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {

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
                    type='primary'
                    onClick={this.showForm}
                    style={{
                        float: 'right',
                        margin: '16px'
                    }}
                >
                    Login
                </Button>
                <Modal 
                    visible={this.state.visible}
                    title='To access the admin page, enter your email and password'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >

                    <Form
                        {...layout}
                    >
                        <Form.Item 
                            label='Email'
                            name='email'
                            rules={[{ required: true, message: 'Please input your Email! '}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label='Password'
                            name='password'
                            rules={[{ required: true, message: 'Please input your password! '}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button  
                                type='primary' 
                                htmlType='submit'
                                onClick={this.handleOk}
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
            </>
            
        )
    }
}

export default LoginForm;