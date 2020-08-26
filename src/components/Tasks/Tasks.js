import React from 'react';
import { getTasks, postTask } from '../Service/Service';
import { Table } from 'antd';
import TaskForm from './components/TaskForm';

class Tasks extends React.Component {

    state = {
        data: [],
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

        const {data, visible, errorMessage} = this.state;

        const columns = [
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
        ];

        return (
            <>
                <TaskForm
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
                />
            </>
        )
    }
}

export default Tasks;