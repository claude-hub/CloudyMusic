import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {connect} from "react-redux";
import {} from './lib';
import './App.css'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  state = {
    collapsed: false,
    current: '1',
    openKeys: [],
    display:false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  render() {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <div className="logo-mini">云</div>
            <div className="logo-lg">云Music</div>
          </div>
          <Menu
            theme="dark"
            //defaultSelectedKeys={['1']}
            mode="inline"
            openKeys={this.state.openKeys}
            selectedKeys={[this.state.current]}
            onOpenChange={this.onOpenChange}
            onClick={this.handleClick}
          >
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED


          </Footer>
        </Layout>
      </Layout>
    );
  }
}

// App.contextTypes = {
//   store: React.PropTypes.object
// };

// // 你的组件需要哪些状态值
// const mapStateToProps = (state) => {
//   return {
//       token: state.Session.Token,
//       user: state.Session.User,
//       models: state.Models.Models
//   }
// };

// //  方法返回action， 组件内用 this.props.xxx调用
// const mapDispatchToProps = {
//   setUser: (param) => {
//       return {
//           type: 'USER:SET',
//           user: param
//       }
//   },
//   singOut: () => {
//       return {
//           type: 'SESSION:DOWN',
//       }
//   }
// };

// App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
