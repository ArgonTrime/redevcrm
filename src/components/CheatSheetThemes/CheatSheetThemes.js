import React from 'react';
import { getCheatSheetThemes, getCheatSheetThemesSection, postCheatSheetThemes } from '../Service/Service';
import { Table } from 'antd';
import ThemeForm from './componenst/ThemeForm';

class CheatSheetThemes extends React.Component {
    
    state = {
        data: [],
        section: [],
        visible: false,
        errorMessage: ''
    }

    componentDidMount() {
        getCheatSheetThemes()
            .then(res => this.setState({
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
        const {title, keyword, сheatSheetSectionId, image:[{response:{imageUrl:urlImage}}]} = value;
        const newValue = {title, сheatSheetSectionId, image: urlImage, keyword};

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

        const {data, section, visible, errorMessage} = this.state;
        const filter = section.map(section => {
            return {text: section.title, value: section.key}
        });

        const columns = [
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                sorter: (a, b) => b.title.toLowerCase().charCodeAt(0) - a.title.toLowerCase().charCodeAt(0),
                sortDirections: ['descend'],
                filters: filter,
                onFilter: (value, record) => value === record.сheatSheetSectionId
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
        ];

        return (
            <>
                <ThemeForm
                    showForm={this.showForm}
                    visible={visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onFinish={this.onFinish}
                    normFile={this.normFile}
                    errorMessage={errorMessage}
                    section={section}
                />
                <Table 
                    dataSource={data} 
                    columns={columns}
                />
            </>
        )
    }
}

export default CheatSheetThemes;