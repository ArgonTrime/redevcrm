import React from 'react';
import {getCheatSheetSections, postCheatSheetSections} from '../Service/Service';
import {Table, Button, Modal, Form, Input, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons'; 

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
                    sortDirections: ['descend'],
                    filters: [
                        { text: 'JavaScript', value: 'javascript' },
                        { text: 'React', value: 'react' },
                        { text: 'Redux', value: 'redux' }
                    ],
                    onFilter: (value, record) => record.title.indexOf(value.toLowerCase()) === 0
                },
                {
                    title: 'Logo',
                    dataIndex: 'logo',
                    key: 'logo',
                    render: (dataIndex) => (
                        dataIndex === '' || dataIndex === null ?
                        null :
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
                        null :
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
        const {title, logo:[{response:{imageUrl:urlLogo}}], image:[{response:{imageUrl:urlImage}}]} = value;
        const newValue = {title, logo: urlLogo, image: urlImage};

        postCheatSheetSections(newValue)
            .then(section => this.setState({
                data: [...this.state.data, {...section}],
                errorMessage: '',
                visible: false
            }))
            .catch(error => error ? this.setState({
                    errorMessage: 'Something went wrong, check the entered data'
                }) : null
            );
    }

    normFile = (e) => {
        if(Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
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
                        marginBottom: '16px'
                    }}
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
                    title='Cheat sheet'
                >

                    <Form
                        {...layout}
                        onFinish={this.onFinish}
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
                            getValueFromEvent={this.normFile}
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
                            getValueFromEvent={this.normFile}
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
                    <span>{this.state.errorMessage ? this.state.errorMessage : null}</span>
                </Modal>
            </div>
        )
    }
}

export default CheatSheetSection;