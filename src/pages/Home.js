import React from 'react';
import { Layout } from 'antd';
const { Content } = Layout;

const Home = () => {
  return (
    <Content style={{ padding: '50px' }}>
      <h1>Welcome to the Demo App!</h1>
      <p>Enjoy your stay.</p>
    </Content>
  );
};

export default Home;
