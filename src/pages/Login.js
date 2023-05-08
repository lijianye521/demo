import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Layout, Form, Input, Button, message } from 'antd';
import { useTheme } from '../App'; // 引入 useTheme 自定义 Hook
const { Content } = Layout;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme(); // 获取当前主题

  // 根据当前主题设置字体颜色
  const color = theme === 'dark' ? '#fff' : '#000';

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    try {
      
      const response = await axios.post('http://localhost:5000/login', values);
      message.success('Successful Log in.');
      setLoading(false);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');

    } catch (error) {
      message.error('Wrong password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Content style={{ padding: '50px' }}>
      <h1 style={{ color }}>Login</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label={<span style={{ color }}>Username</span>} // 添加字体颜色
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span style={{ color }}>Password</span>} // 添加字体颜色
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Login;
