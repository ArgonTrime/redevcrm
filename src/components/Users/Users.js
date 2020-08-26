import React from 'react';
import { getUsers } from '../Service/Service';
import { Table } from 'antd';

class Users extends React.Component {
    
    state = {
        users: []
    }

    componentDidMount() { 
        getUsers().then(users => this.setState({ users }));
    }

    render() {
        const {users} = this.state;

        const columns = [
            {
                title: 'First name',
                dataIndex: 'firstName',
                key: 'firstName',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Birthday',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: 'Surname',
                dataIndex: 'lastName',
                key: 'lastName',
            }
        ];

        return (
            <Table
                dataSource={users}
                columns={columns}
                style={{
                    margin: '16px'
                }}
            />
        )
        
    }
    
}

export default Users;