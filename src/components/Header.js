import React from 'react';
import { Layout, Menu, Switch } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
const { Header: AntHeader } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const getSelectedKeys = () => {
    switch (location.pathname) {
      case '/':
        return ['1'];
      case '/login':
        return ['2'];
      case '/register':
        return ['3'];
      default:
        return ['1'];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleThemeChange = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <AntHeader>
     <Menu
  theme={theme}
  mode="horizontal"
  className={theme === 'dark' ? 'dark-theme' : 'light-theme'}
  selectedKeys={getSelectedKeys()}
  style={{ display: 'flex', justifyContent: 'space-between' }}
>

        <div>
          <Menu.Item key="1" onClick={() => window.location.href = '/'}>
            Home
          </Menu.Item>
          <Menu.Item key="6">
            Home1
          </Menu.Item>
          <Menu.Item key="7">
            Home2
          </Menu.Item>
          <Menu.Item key="8">
            Home3
          </Menu.Item>
          <Menu.Item key="9">
            Home4
          </Menu.Item>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch checked={theme === 'dark'} onChange={handleThemeChange} style={{ marginRight: '1rem' }} />

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
                Welcome, {user.username}
              </Menu.Item>
            </>
          )}
        </div>
      </Menu>
    </AntHeader>
  );
};

export default HeaderComponent;
