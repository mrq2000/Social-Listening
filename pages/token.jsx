import React from 'react';
import { Input, Modal, Typography } from 'antd';

import Layout from '../components/common/Layout';
import openNotification from '../helper/notification';

const { confirm } = Modal;

const GetToken = () => {
  const saveToken = (token) => {
    confirm({
      content: (
        <Typography.Text type="warning">
          Sử dụng Token này và xóa token trước đó ?
        </Typography.Text>
      ),
      onOk() {
        openNotification('Success', 'Thêm Token Thành Công', 'success');
        localStorage.setItem('Token', token);
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
    </Layout>
  );
};

export default GetToken;
