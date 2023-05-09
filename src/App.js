import React, { useState, createContext, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import './App.css';

export const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [theme, setTheme] = useState('dark');
  const backgroundColor = theme === 'dark' ? '#001529' : '#ffffff';

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
     <Layout
  className={theme === 'dark' ? 'dark-theme' : 'light-theme'}
  style={{ minHeight: '100vh', backgroundColor }}
>

        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
        <Footer />
      </Layout>
    </ThemeContext.Provider>
  );
};

export default App;
