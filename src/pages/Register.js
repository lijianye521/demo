import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Layout, Form, Input, Button, message } from 'antd';
const { Content } = Layout;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/register', values);
      message.success('Registration successful. Please log in.');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      message.error('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Content style={{ padding: '50px' }}>
      <h1>Register</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default Register;
