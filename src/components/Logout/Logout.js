import React from 'react';
import {Button} from 'antd';
import {Link} from 'react-router-dom';

const Logout = ({handleLogoutClick}) => {

    const clearToken = () => {
        localStorage.clear();
        handleLogoutClick();
    }

    return (
        <Button 
            type="primary" 
            style={{
                float: 'right',
                margin: '16px'
            }}
            onClick={() => clearToken()}
        >
            <Link to='/'>Logout</Link>
        </Button>
    )
}

export default Logout;