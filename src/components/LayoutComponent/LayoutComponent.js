import React from 'react';
import { Layout} from 'antd';
import './LayoutComponent.css';
import {Route} from 'react-router-dom';
import Users from '../Users/Users';
import Leeds from '../Leeds/Leeds';
import Quotes from '../Quotes/Quotes';
import Tasks from '../Tasks/Tasks';
import Activity from '../Activity/Activity';
import LoginForm from '../Login/LoginForm';
import Logout from '../Logout/Logout';
import MenuItems from '../MenuItems/MenuItems';

const { Header, Content, Sider } = Layout;

class LayoutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }
    
    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    conponentDidMount() {
        localStorage.getItem('token') ? this.handleLoginClick() : this.handleLogoutClick();
    }

    render() {

        const loginButtons = (this.state.isLoggedIn ? <Logout handleLogoutClick={this.handleLogoutClick}/> : <LoginForm handleLoginClick={this.handleLoginClick}/>);

        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    {loginButtons}
                </Header>
    
                <Layout>
                    <Sider>
                        <MenuItems isLoggedIn={this.state.isLoggedIn}/>
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
    }
};

export default LayoutComponent;