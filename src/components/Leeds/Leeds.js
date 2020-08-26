import React from 'react';
import { getLeeds } from '../Service/Service';
import { Table } from 'antd';

class Leeds extends React.Component {
    
    state = {
        leeds: []
    }

    componentDidMount() {
        getLeeds()
            .then(leeds => this.setState({
                leeds
            }))
    }

    render() {
        const {leeds} = this.state;

        const columns = [
            {
                title: 'ID',
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: 'Communication method',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: 'Address',
                dataIndex: 'target',
                key: 'target'
            }
        ]

        return (
            <Table
                dataSource={leeds}
                columns={columns}
                style={{
                    margin: '16px'
                }}
            />
        )
    }
}

export default Leeds;