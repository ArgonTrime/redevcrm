import React from 'react';
import {getCheatSheetThemes, getCheatSheetThemesSection, postCheatSheetThemes} from '../Service/Service';
import {Button, Table, Modal, Form, Input, Upload, Select} from 'antd';
import {UploadOutlined} from '@ant-design/icons'; 

const {Option} = Select;

class CheatSheetThemes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            section: [],
            columns: [
                {
                    title: 'Title',
                    dataIndex: 'title',
                    key: 'title',
                    sorter: (a, b) => b.title.toLowerCase().charCodeAt(0) - a.title.toLowerCase().charCodeAt(0),
                    sortDirections: ['descend'],
                    filter: this.state.section.map(section => {
                        return {text: section.title, value: section.key}
                    })
                },
                {
                    title: 'Keyword',
                    dataIndex: 'keyword',
                    key: 'keyword'
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
        getCheatSheetThemes().then(res => this.setState({
            data: res
        }));
        getCheatSheetThemesSection()
            .then(section => this.setState({
                section
            }));
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
        const {title, keyword, cheatSheetSectionId, image:[{response:{imageUrl:urlImage}}]} = value;
        const newValue = {title, cheatSheetSectionId, image: urlImage, keyword};

        postCheatSheetThemes(newValue)
            .then(themes => this.setState({
                data: [...this.state.data, {...themes}],
                errorMessage: '',
                visible: false
            }))
    }

    normFile = (e) => {
        if(Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    }

    render() {

        const {data, columns, section} = this.state;

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
                    Create a cheat sheet theme
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
                            name='cheatSheetSectionId'
                            label='Section'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                placeholder='Plese chose a section'
                                // onChange={onGenderChange}
                                allowClear
                            >
                                {/* <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option> */}
                                {section.map(section => {
                                    return <Option key={section.key} value={section.key}>{section.title}</Option>
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name='image'
                            label='Upload'
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

export default CheatSheetThemes;