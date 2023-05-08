import React from 'react';
import { Layout } from 'antd';
import { useTheme } from '../App'; // 引入 useTheme 自定义 Hook
const { Content } = Layout;

const Home = () => {
  const { theme } = useTheme(); // 获取当前主题

  // 根据当前主题设置字体颜色
  const color = theme === 'dark' ? '#fff' : '#000';

  return (
    <Content style={{ padding: '50px' }}>
      <h1 style={{ color }}>Welcome to the Demo App!</h1>
      <p style={{ color }}>Enjoy your stay.</p>
    </Content>
  );
};

export default Home;
