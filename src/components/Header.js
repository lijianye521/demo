import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" onClick={() => window.location.href = '/'}>
          Home
        </Menu.Item>
        {!user ? (
          <>
            <Menu.Item key="2" onClick={() => navigate('/login')}>
              Login
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate('/register')}>
              Register
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="4" onClick={handleLogout}>
              Logout
            </Menu.Item>
            <Menu.Item key="5" disabled>
              {user.username}
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default HeaderComponent;
