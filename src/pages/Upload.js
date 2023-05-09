import React, { useState, useEffect } from 'react';
import { Layout, Button, message, Form, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Content } from 'antd/es/layout/layout';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const Upload = () => {

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  // 根据当前主题设置字体颜色
  const color = theme === 'dark' ? '#fff' : '#000';


  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showReject, setReject] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setReject(true);
    } else {
      setReject(false);
      setImageFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: '.nii.gz',
    maxSize: MAX_FILE_SIZE,
    multiple: false,
});

const [image, setImage] = useState(null);

const handleSubmit = () => {
  setIsLoading(true);
  setErrorMessage("");
  const formData = new FormData();
  formData.append('file', imageFile);

  //...
axios.post('http://localhost:5000/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
.then(response => {
  axios.get(`http://localhost:5000/visualize/${response.data.filename}`)
  .then(response => {
    setIsLoading(false);
    setImage(response.data.image);  // store the returned image in state
  })
  .catch(error => {
    console.log('Error', error.message);
    setErrorMessage("An error occurred while visualizing the image.");
    setIsLoading(false);
  });
})
//...

};

  const handleBack = () => {
    setImageFile(null);
    setErrorMessage("");
  };

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks, will run on unmount
    return () => imageFile ? URL.revokeObjectURL(imageFile.preview) : "";
  }, [imageFile]);

  return (
    <Content style={{ padding: '0px 50px' }}>
      <div className='upload-container' style={{ margin: '0 auto', padding: '24px', maxWidth: '600px' }}>
        {user ? (
          <Form onFinish={handleSubmit}>
            <Form.Item>
              <div {...getRootProps()} className={`dropzone text-center ${isDragActive ? 'drop text-black' : ''} ${showReject ? 'error' : ''}`}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the file here...</p>
                ) : (
                  <p>Drag and drop a file here, or click to select a file</p>
                )}
              </div>
            </Form.Item>
            {imageFile && (
              <div style={{ margin: '0 auto', maxWidth: '500px', textAlign: 'center' }}>
                <Form.Item>
                  <p style={{color}}>Selected File: {imageFile.name}</p>
                  <img src={imageFile.preview} alt="Preview" style={{ width: '200px', height: '200px' }} />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                      上传
                    </Button>
                    <Button onClick={handleBack}>返回</Button>
                  </Space>




                </Form.Item>


                {image && (
              <div style={{ margin: '0 auto', maxWidth: '500px', textAlign: 'center' }}>
                <Form.Item>
                  <img src={`data:image/png;base64,${image}`} alt="Visualized" style={{ width: '500px', height: '500px' }} />
                </Form.Item>
              </div>
            )}
              </div>
            )}
            {showReject && <p>Invalid file format. Please upload a PNG or JPEG file.</p>}
            {errorMessage && <p>{errorMessage}</p>}
          </Form>
        ) : (
          <div style={{ margin: '0 auto', maxWidth: '500px', textAlign: 'center' }}>
            <p style={{color}}>请先登录</p>
          </div>)}
      </div>
    </Content>
  );
};

export default Upload;