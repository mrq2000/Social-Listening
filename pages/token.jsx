import React, { useState } from 'react';
import {
  Input, Modal, Typography, Row, Col,
} from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

import Layout from '../components/common/Layout';
import openNotification from '../helper/notification';

const { confirm } = Modal;

const GetToken = () => {
  const [check, setCheck] = useState(false);
  const handle = async (token) => {
    const url = `https://graph.facebook.com/me?fields=picture{url},id,name&access_token=${token}`;
    try {
      const response = await axios({
        method: 'get',
        url,
      });
      Cookies.set('Id', response.data.id);
      Cookies.set('NamePage', response.data.name);
      Cookies.set('ImgPage', response.data.picture.data.url);
      openNotification('Success', 'Thêm Token Thành Công', 'success');
      Cookies.set('Token', token);
      setCheck(true);
    } catch (e) {
      openNotification('Lỗi', 'Vui Lòng Kiểm Tra Lại Token Của Bạn.', 'error');
    }
  };

  const saveToken = (token) => {
    confirm({
      content: (
        <Typography.Text type="warning">
          Sử dụng Token này và xóa token trước đó ?
        </Typography.Text>
      ),
      onOk() {
        handle(token);
      },
    });
  };

  return (
    <Layout>
      <Input.Search
        enterButton="Add"
        type="password"
        onSearch={(token) => saveToken(token)}
      />
      <Row align="center" gutter={[16, 16]} style={{ marginTop: 50 }}>
        {Cookies.get('Id') || check ? (
          <>
            <Col>
              <img
                style={{ height: '10rem', width: '10rem' }}
                src={Cookies.get('ImgPage')}
                alt="logo"
              />
            </Col>
            <Col>
              <Typography.Title level={2}>
                {Cookies.get('NamePage')}
              </Typography.Title>
              <Typography>id: {Cookies.get('Id')}</Typography>
            </Col>
          </>
        ) : (
          <Typography.Title level={2}>
            Bạn Chưa Nhập Token Nào.
          </Typography.Title>
        )}
      </Row>
    </Layout>
  );
};

export default GetToken;
