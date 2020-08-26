import React from 'react';
import { Layout } from 'antd';
import './LayoutComponent.css';
import { Route } from 'react-router-dom';
import Users from '../Users/Users';
import Leeds from '../Leeds/Leeds';
import Quotes from '../Quotes/Quotes';
import Tasks from '../Tasks/Tasks';
import LoginForm from '../Login/LoginForm';
import Logout from '../Logout/Logout';
import MenuItems from '../MenuItems/MenuItems';
import CheatSheet from '../CheatSheet/CheatSheet';

const { Header, Content, Sider } = Layout;

class LayoutComponent extends React.Component {
    state = {
        isLoggedIn: localStorage.getItem('token') ? true : false
    }

    handleLoginClick = () => {
        this.setState({isLoggedIn: true});
    }
    
    handleLogoutClick = () => {
        this.setState({isLoggedIn: false});
    }

    conponentDidMount() {
        localStorage.getItem('token') ? this.handleLoginClick() : this.handleLogoutClick();
    }

    render() {
        const {isLoggedIn} = this.state;
        const loginButtons = (isLoggedIn ? <Logout handleLogoutClick={this.handleLogoutClick}/> : <LoginForm handleLoginClick={this.handleLoginClick}/>);

        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    {loginButtons}
                </Header>
    
                <Layout>
                    <Sider>
                        <MenuItems isLoggedIn={isLoggedIn}/>
                    </Sider>
    
                    <Content>
                        {isLoggedIn 
                            ? <>
                                <Route path="/" render={() => <div></div>}/>
                                <Route path='/users' component={Users}/>
                                <Route path='/Leeds' component={Leeds}/>
                                <Route path='/Quotes' component={Quotes}/>
                                <Route path='/Tasks' component={Tasks}/>
                                <Route path='/CheatSheet' component={CheatSheet}/>
                            </>
                            : null
                        }      
                    </Content>
                </Layout>
            </Layout>
            
        )
    }
};

export default LayoutComponent;