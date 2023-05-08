import React from 'react';
import { Layout } from 'antd';
import { useTheme } from '../App'; // 引入 useTheme 自定义 Hook
const { Footer } = Layout;

const FooterComponent = () => {
  const { theme } = useTheme(); // 获取当前主题

  // 根据当前主题设置背景颜色和字体颜色
  const backgroundColor = theme === 'dark' ? '#001529' : '#ffffff';
  const color = theme === 'dark' ? '#fff' : '#000';

  return (
    <Footer
      className={theme === 'dark' ? 'dark-theme' : 'light-theme'}
      style={{ textAlign: 'center', backgroundColor, color }}
    >
      Demo App ©2023
    </Footer>
  );
};

export default FooterComponent;
