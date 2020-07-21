import React from 'react';
import { getUsers } from '../Service/Service';
import { Table } from 'antd';

const {Column} = Table;

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            users: []
        }
    }
    componentWillMount() {
        getUsers('https://redevcrm.herokuapp.com/users')
        .then(users => {
            this.setState({
                users,
                isLoaded: true
            })
        })
    }

    render() {
        const {isLoaded, users} = this.state;

        if(isLoaded) {
            return (
                <Table dataSource={users.map(user => ({
                    ...user,
                    key: user._id
                }))}>
                    <Column title='First Name' dataIndex='firstName' key='firstName'/>
                    <Column title='Email' dataIndex='email' key='email'/>
                    <Column title='Birthday' dataIndex='birthday' key='birthday'/>
                    <Column title='Surname' dataIndex='lastName' key='lastName'/>
                </Table>
            )
        }

        return (
            <div>
                Loading...
            </div>
        )
        
    }
    
}

export default Users;