import React from 'react';
import {Table, Button, Modal, Form, Input, Popconfirm} from 'antd';
import {getQuotes, postQuote, deleteQuote} from '../Service/Service';

class Quotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    title: 'Author',
                    dataIndex: 'author',
                    key: 'author',
                },
                {
                    title: 'Quote',
                    dataIndex: 'quote',
                    key: 'quote',
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    render: (text, record) =>
                        <Popconfirm 
                            title='Сonfirm deletion?'
                            onConfirm={() => this.handleDeleteQuote(record.key)}
                        >
                            <a href={text}>Delete</a>
                        </Popconfirm>
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

    handleDeleteQuote = (key) => {
        const quotes = [...this.state.data];
       
        deleteQuote(key, 'https://redevcrm.herokuapp.com/quotes')
            .then(res => console.log(res))
            .then(() => this.setState({
                data: quotes.filter(item => item.key !== key)
            }))
    }

    onFinish = (value) => {
        postQuote('https://redevcrm.herokuapp.com/quotes', value)
            .then(res => {
                const {_id, author, text} = res;
                return {
                    key: _id,
                    author,
                    quote: text,
                    actions: 'Delete'
                }
            })
            .then(quote => 
                this.setState({
                data: [...this.state.data, {...quote}],
                errorMessage: '',
                visible: false
            }))
            .catch(error => {
                console.log(error);
                return error ? this.setState({
                    errorMessage: 'Something went wrong, check the entered data'
                }) : null
            });
    }

    componentDidMount() {
        getQuotes('https://redevcrm.herokuapp.com/quotes')
            .then(res => res.map(item => {
                const {_id, author, text} = item;
                return {
                    key: _id,
                    author,
                    quote: text,
                    actions: 'Delete'
                }
            }))
            .then(quotes => this.setState({data: quotes}))
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
                    Create Quote
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
                >

                    <Form
                        {...layout}
                        onFinish={this.onFinish}
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
                    <span>{this.state.errorMessage ? this.state.errorMessage : null}</span>
                </Modal>
            </div>
        )
    }
    
}

export default Quotes;