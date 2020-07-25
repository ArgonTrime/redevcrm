import React from 'react';
import { Form, Input, Button, Modal} from 'antd';
import './LoginForm.css';
import {loginUser} from '../Service/Service';

class LoginForm extends React.Component {

    state = {
        visible: false,
        errorMessage: ''
    }

    showForm = () => {
        this.setState({visible: true})
    }

    handleOk = () => {
        this.setState({
            visible: false,
            errorMessage: ''
        })
    };
    
    handleCancel = () => {
        this.setState({ 
            visible: false,
            errorMessage: '' 
        });
    };

    onFinish = (values) => {
        loginUser('https://redevcrm.herokuapp.com/users/login', values)
        .then(res => {
            localStorage.setItem('token', res)
            this.setState({
                visible: false,
                errorMessage: ''
            })
        })
        .catch(error => {
            return error ? this.setState({
                errorMessage: 'Something went wrong, check the entered data'
            }) : null
        });
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                        onFinish={this.onFinish}
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
                            >
                                Login
                            </Button>
                            
                        </Form.Item>
                    </Form>
                    <span>{this.state.errorMessage ? this.state.errorMessage : null}</span>
                </Modal>
            </>
            
        )
    }
}

export default LoginForm;