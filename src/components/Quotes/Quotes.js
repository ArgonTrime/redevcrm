import React from 'react';
import {Table, Button, Modal, Form, Input, Popconfirm} from 'antd';
import {getQuotes, postQuote, deleteQuote, postEditingQuotes} from '../Service/Service';
import EditableRow from './components/EditableRow';
import EditableCell from './components/EditableCell';
import './Quotes.css';

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
                    editable: true
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    render: (text, record) => this.state.data ?
                        <Popconfirm 
                            title='Сonfirm deletion?'
                            onConfirm={() => this.handleDeleteQuote(record.key)}
                        >
                            <a href={text}>Delete</a>
                        </Popconfirm>
                        : null
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
        deleteQuote(key)
            .then(() => getQuotes().then(quotes => this.setState({data: quotes})))         
    }

    onFinish = (value) => {
        postQuote(value)
            .then(quote => 
                this.setState({
                data: [...this.state.data, {...quote}],
                errorMessage: '',
                visible: false
            }))
            .catch(error => error ? this.setState({
                    errorMessage: 'Something went wrong, check the entered data'
                }) : null
            );
    }

    handleSave = row => {
        const newData = [...this.state.data];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        console.log(newData, row);
        postEditingQuotes(row.key, {text: row.quote})
            .then(() => this.setState({
                data: newData
            }));
    };

    componentDidMount() {
        getQuotes().then(quotes => this.setState({data: quotes}))
    }

    render() {
        const {data} = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell
            }
        }
        const columns = this.state.columns.map(col => {
            if (!col.editable) {
                return col;
            }
        
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        })

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
                    rowClassName={() => 'editable-row'}
                    bordered
                    components={components}
                />

                <Modal 
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    title='Quote'
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