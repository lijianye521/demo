import React, { useState } from 'react';
import { Layout, Menu, Switch, Button, Drawer } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { MenuOutlined,  EuroOutlined,
  HeartOutlined,
  CalculatorOutlined,
  BarsOutlined, } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const DropDownMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className='menubtn' type="primary" shape="circle" icon={<MenuOutlined />} onClick={showDrawer} />
      <Drawer title={111} placement="right" onClose={onClose} open={open}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>  
          <Button type="text" onClick={() => navigate('/')} icon={<EuroOutlined />}>
            Home
          </Button>
          <Button type="text" onClick={() => navigate('/upload')} icon={<HeartOutlined />}>
            Home1
          </Button>
          <Button type="text" onClick icon={<CalculatorOutlined />}>
            Home2
          </Button>
        </div>
      </Drawer>
    </>
  );
}

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
      <DropDownMenu />
      <Menu
        theme={theme}
        mode="horizontal"
        className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'} bigmenu`}
        selectedKeys={getSelectedKeys()}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div className="menu-left">
          <Menu.Item key="1" onClick={() => navigate('/')}>
            Home
          </Menu.Item>
          <Menu.Item key="6" onClick={() => navigate('/upload')}>Upload</Menu.Item>
          <Menu.Item key="7">Home2</Menu.Item>
          <Menu.Item key="8">Home3</Menu.Item>
          <Menu.Item key="9">About us</Menu.Item>
        </div>

        <div className="menu-right">
          <Switch
            checked={theme === 'dark'}
            onChange={handleThemeChange}
            style={{ marginRight: '1rem' }}
          />
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
