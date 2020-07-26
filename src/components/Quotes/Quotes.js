import React from 'react';
import {Table} from 'antd';
import {getQuotes} from '../Service/Service';

class Quotes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                  },
                  {
                    title: 'Actions',
                    dataIndex: 'actions',
                    key: 'actions',
                  }
            ]

        }
    }

    componentDidMount() {
        getQuotes('https://redevcrm.herokuapp.com/quotes')
            .then(res => res.map(item => {
                const {_id, author, text} = item;
                return {
                        key: _id,
                        author,
                        quote: text,
                        actions: 'Delete'
                    }
                })
            )
            .then(newObj => this.setState({data: newObj}))
    }

    render() {
        const {data, columns} = this.state;

        return (
            <div>
                <Table dataSource={data} columns={columns}/>
            </div>
        )
    }
    
}

export default Quotes;