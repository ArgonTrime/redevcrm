import React from 'react';
import {getTasks, postTask} from '../Service/Service';
import {Table, Button, Modal, Form, Input} from 'antd';

class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    title: 'Theme',
                    dataIndex: 'theme',
                    key: 'theme',
                },
                {
                    title: 'Text',
                    dataIndex: 'text',
                    key: 'text',
                }
            ],
            visible: false,
            errorMessage: ''
        }
    }

    showForm = () => {
        this.setState({visible: true})
    }

    handleOk = () => {
        this.setState({
            visible: false,
            errorMessage: ''
        });
    }
    
    handleCancel = () => {
        this.setState({ 
            visible: false,
            errorMessage: '' 
        });
    }

    onFinish = (value) => {
        postTask(value)
            .then(task => this.setState({
                data: [...this.state.data, {...task}],
                errorMessage: '',
                visible: false
            }))
            .catch(error => error ? this.setState({
                    errorMessage: 'Something went wrong, check the entered data'
                }) : null
            );
    }

    componentDidMount() {
        getTasks().then(res => this.setState({data: res}));
    }

    render() {

        const {data, columns} = this.state;

        const layout = {
            labelCol: {span: 8},
            wrapperCol: {span: 12}
        }

        const tailLayout = {
            wrapperCol: { offset: 0, span: 4 },
        }

        return (
            <div>
                <Button 
                    type="primary"
                    onClick={this.showForm}
                    style={{
                        margin: '16px'
                    }}
                >
                    Create task
                </Button>
                <Table 
                    dataSource={data} 
                    columns={columns}
                    style={{
                        margin: '0 16px'
                    }}
                />

                <Modal 
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    title='Task'
                >

                    <Form
                        {...layout}
                        onFinish={this.onFinish}
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
                    <span>{this.state.errorMessage ? this.state.errorMessage : null}</span>
                </Modal>
            </div>
        )
    }
}

export default Tasks;