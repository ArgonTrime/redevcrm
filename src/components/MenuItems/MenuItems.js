import React from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const MenuItems = ({isLoggedIn}) => {
    return (
        isLoggedIn 
            ? <Menu 
                theme="dark" 
                mode="inline" 
                style={{
                    height: '100vh'
                }}>
                <Menu.Item key="1">
                    <Link to='/users'>Users</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to='/Leeds'>Leeds</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to='/Quotes'>Quotes</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to='/Tasks'>Tasks</Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to='/CheatSheet'>Cheat sheet</Link>
                </Menu.Item>
            </Menu>
            : <Menu 
                theme="dark" 
                mode="inline" 
                style={{
                    height: '100vh'
                }}>
            </Menu>
    )
    
}

export default MenuItems;