import React from 'react';
import { Layout, Menu} from 'antd';
import './LayoutComponent.css';
import {Route, Link} from 'react-router-dom';
import Users from '../Users/Users';
import Leeds from '../Leeds/Leeds';
import Quotes from '../Quotes/Quotes';
import Tasks from '../Tasks/Tasks';
import Activity from '../Activity/Activity';
import LoginForm from '../Login/LoginForm';

const { Header, Content, Sider } = Layout;

const LayoutComponent = () => {
    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <LoginForm/>
            </Header>

            <Layout>
                <Sider>
                    <Menu theme="dark" mode="inline" style={{
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
                            <Link to='Activity'>Activity</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Content>
                        <Route path="/" render={() => <div></div>}/>
                        <Route path='/users' component={Users}/>
                        <Route path='/Leeds' component={Leeds}/>
                        <Route path='/Quotes' component={Quotes}/>
                        <Route path='/Tasks' component={Tasks}/>
                        <Route path='/Activity' component={Activity}/>
                </Content>
            </Layout>
        </Layout>
        
    )
};

export default LayoutComponent;