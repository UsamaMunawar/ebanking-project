import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  FileTextOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/features/account/accountSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validUser = useSelector((state) => state.account.loggedUser);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!validUser) {
      navigate('login');
    }
  }, [validUser]);

  const onCollapse = () => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div
          className='logo'
          style={{
            width: '100%',
            height: '3.8rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ color: 'white', fontSize: '20px' }}>
            E-Banking App
          </span>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item
            key='1'
            icon={<DesktopOutlined />}
            onClick={() => {
              navigate('/dashboard');
            }}
          >
            Dashboard
          </Menu.Item>
          <SubMenu key='sub1' icon={<FileTextOutlined />} title='Transactions'>
            <Menu.Item
              key='sub3'
              onClick={() => {
                navigate('deposit');
              }}
            >
              Deposit
            </Menu.Item>
            <Menu.Item
              key='sub4'
              onClick={() => {
                navigate('withdraw');
              }}
            >
              Withdrawl
            </Menu.Item>
            <Menu.Item
              key='sub5'
              onClick={() => {
                navigate('transfer');
              }}
            >
              Transfer
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key='3'
            icon={<ProfileOutlined />}
            onClick={() => {
              navigate('statement');
            }}
          >
            Statement
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
            paddingLeft: '2rem',
            paddingRight: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ color: 'white', fontSize: '16px' }}>
            {validUser?.firstname} {validUser?.lastname}
          </div>
          <Link
            to='login'
            onClick={() => {
              dispatch(logoutUser());
            }}
          >
            Logout
          </Link>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            className='site-layout-background'
            style={{
              padding: 24,
              height: '80vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>E-Banking App</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
