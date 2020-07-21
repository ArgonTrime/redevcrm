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
        console.log(this.state.users);
        const {isLoaded, users} = this.state;
        if(isLoaded) {
            return (
                // <div>
                //     {users.map(user => (
                //         <div key={user._id}>
                //             First Name: {user.firstName}, Email: {user.email}, Birthday: {user.birthday}, Surname: {user.lastName}
                //         </div>
                //     ))}
                // </div>
                <Table dataSource={users}>
                    <Column title='First Name' dataIndex='firstName' key='_id'/>
                    <Column title='Email' dataIndex='email' key='_id'/>
                    <Column title='Birthday' dataIndex='birthday' key='_id'/>
                    <Column title='Surname' dataIndex='lastName' key='_id'/>
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