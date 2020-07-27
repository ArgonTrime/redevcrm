import React from 'react';
import { getLeeds } from '../Service/Service';
import { Table } from 'antd';

const {Column} = Table;

class Leeds extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leeds: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        getLeeds('https://redevcrm.herokuapp.com/leeds')
        .then(leeds => {
            this.setState({
                leeds,
                isLoaded: true
            })
        })
    }

    render() {
        const {isLoaded, leeds} = this.state;
        
        if(isLoaded) {
            return (
                <Table 
                    dataSource={leeds.map(leed => ({
                        ...leed,
                        key: leed._id
                    }))}
                    style={{
                        margin: '16px'
                    }}
                >
                    <Column title='ID' dataIndex='_id' key='_id'/>
                    <Column title='Communication method' dataIndex='type' key='_id'/>
                    <Column title='Address' dataIndex='target' key='_id'/>
                </Table>
            )
        }
        
        return (
            <div>
                <span>Loading...</span>
            </div>
        )
    }
    
}

export default Leeds;