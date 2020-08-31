import React from 'react';
import Cookies from 'js-cookie';
import { Row, Typography, Col } from 'antd';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import GET_POST from '../graphql/queries/getPostById';
import Card from '../components/common/Card';

const Fanpage = () => {
  const fanpageId = Cookies.get('Id');
  const { loading, data } = useQuery(GET_POST, {
    variables: {
      id: fanpageId,
    },
  });

  if (!fanpageId) {
    return (
      <Layout>
        <Row justify="center" style={{ paddingTop: 200 }}>
          <Typography.Title level={3}>Bạn Chưa Nhập Token</Typography.Title>
        </Row>
      </Layout>
    );
  }
  if (loading) {
    return (
      <Layout>
        <Row justify="center" style={{ paddingTop: 200 }}>
          <LoadingOutlined style={{ fontSize: 200 }} spin />
        </Row>
      </Layout>
    );
  }

  if (data && data.posts) {
    return (
      <Layout>
        <Row gutter={[16, 16]}>
          {data.posts.map((post) => (
            <Col span={12} key={post.id}>
              <Card post={post} />
            </Col>
          ))}
        </Row>
      </Layout>
    );
  }
  return (
    <Layout>
      Error
    </Layout>
  );
};

export default Fanpage;
