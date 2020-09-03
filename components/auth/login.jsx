import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Avatar, Typography, Row, Button,
} from 'antd';

import openNotification from '../../helper/notification';

const Login = () => {
  const [accessToken, setAccessToken] = useState(Cookies.get('token'));
  const checkAccessToken = async () => {
    const url = `https://graph.facebook.com/me?access_token=${accessToken}`;
    try {
      const response = await axios({
        method: 'get',
        url,
      });
      if (response && response.accessToken) {
        return true;
      }
      return false;
    } catch (e) {
      setAccessToken('');
      Cookies.set('token', '');
      return false;
    }
  };

  const responseFacebook = (response) => {
    Cookies.set('id', response.id);
    Cookies.set('name', response.name);
    Cookies.set('imgLink', response.picture.data.url);
    openNotification('Success', 'Thêm Token Thành Công', 'success');
    Cookies.set('token', response.accessToken);
    setAccessToken(response.accessToken);
  };

  if (!accessToken || !checkAccessToken()) {
    return (
      <FacebookLogin
        appId="2931610017126226"
        autoLoad
        fields="name,email,picture"
        scope="pages_manage_engagement"
        callback={responseFacebook}
        icon="fa-facebook"
        buttonStyle={{ fontSize: 10, padding: 10, borderRadius: 20 }}
      />
    );
  }

  return (
    <Row>
      <Avatar size={50} src={Cookies.get('imgLink')}>W</Avatar>
      <div>
        <Typography.Text style={{ color: '#fff', fontWeight: 900 }}>{Cookies.get('name')}</Typography.Text>
        <Button
          type="primary"
          style={{
            color: '#fff', fontWeight: 900, display: 'block',
          }}
          onClick={() => {
            setAccessToken('');
            Cookies.remove('token');
          }}
        >
          Đăng Xuất
        </Button>
      </div>
    </Row>
  );
};

export default Login;
