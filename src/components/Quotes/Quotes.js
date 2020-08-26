import React from 'react';
import {Table, Popconfirm} from 'antd';
import {getQuotes, postQuote, deleteQuote, postEditingQuotes} from '../Service/Service';
import EditableRow from './components/EditableRow';
import EditableCell from './components/EditableCell';
import './Quotes.css';
import QuotesForm from './components/QuotesForm';

class Quotes extends React.Component {

    state = {
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
        postEditingQuotes(row.key, {text: row.quote})
            .then(() => this.setState({
                data: newData
            }));
    };

    componentDidMount() {
        getQuotes().then(quotes => this.setState({data: quotes}))
    }

    render() {
        const {data, visible, errorMessage} = this.state;
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
        });

        return (
            <>
                <QuotesForm
                    showForm={this.showForm}
                    visible={visible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    onFinish={this.onFinish}
                    errorMessage={errorMessage}
                />
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
            </>
        )
    }
}

export default Quotes;