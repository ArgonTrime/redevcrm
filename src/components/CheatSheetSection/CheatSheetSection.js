import React from 'react';
import { getCheatSheetSections, postCheatSheetSections } from '../Service/Service';
import { Table } from 'antd';
import SectionForm from './components/SectionForm';

class CheatSheetSection extends React.Component {
    
    state = {
        data: [],
        visible: false,
        errorMessage: ''
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

        const {data, visible, errorMessage} = this.state;

        const columns = [
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
        ];

        return (
            <>
                <SectionForm
                    showForm={this.showForm}
                    visible={visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onFinish={this.onFinish}
                    normFile={this.normFile}
                    errorMessage={errorMessage}
                />
                <Table 
                    dataSource={data} 
                    columns={columns}
                />
            </>
        )
    }
}

export default CheatSheetSection;