import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import SEARCH_POST from '../graphql/queries/searchPost';

const Home = () => {
  const router = useRouter();
  const { key } = router.query;

  const { data, loading } = useQuery(SEARCH_POST, {
    variables: {
      content: `%${key}%`,
      limit: 10,
      offset: 0,
    },
  });

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
  return <Layout />;
};

export default Home;
