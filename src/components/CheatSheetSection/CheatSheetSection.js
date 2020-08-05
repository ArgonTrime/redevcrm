import React from 'react';
import {getCheatSheetSections} from '../Service/Service';
import {Table, Button, Modal, Form, Input} from 'antd';
import {FileExcelOutlined} from '@ant-design/icons';

class CheatSheetSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                    sorter: (a, b) => b.title.toLowerCase().charCodeAt(0) - a.title.toLowerCase().charCodeAt(0),
                    sortDirections: ['descend']
                },
                {
                    title: 'Logo',
                    dataIndex: 'logo',
                    key: 'logo',
                    render: (dataIndex) => (
                        dataIndex === '' || dataIndex === null ?
                        <FileExcelOutlined style={{
                            fontSize: '20px'
                        }}/> :
                        <img src={dataIndex} alt='' style={{
                            height: '80px',
                            width: '120px'
                        }}/> 
                    )
                },
                {
                    title: 'Image',
                    dataIndex: 'image',
                    key: 'image',
                    render: (dataIndex) => (
                        dataIndex === '' || dataIndex === null ?
                        <FileExcelOutlined style={{
                            fontSize: '20px'
                        }}/> :
                        <img src={dataIndex} alt='' style={{
                            height: '80px',
                            width: '120px'
                        }}/>
                    )
                }     
            ],
            visible: false,
            errorMessage: ''
        }
    }

    componentDidMount() {
        getCheatSheetSections().then(res => console.log(res));
        getCheatSheetSections()
            .then(sections => this.setState({data: sections}));
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
        console.log(value);
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
                >
                    Create cheat sheet
                </Button>
                <Table 
                    dataSource={data} 
                    columns={columns}
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

export default CheatSheetSection;