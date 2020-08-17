import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Pie, Bar } from 'react-chartjs-2';
import { Row, Col, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import GET_COMMENTS from '../graphql/queries/getComments';

const OverView = () => {
  const { postId, label } = useRouter().query;
  const { data, error } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
      label,
    },
  });

  if (data && data.comments_aggregate && data.comments_aggregate.nodes) {
    return <Layout>hello</Layout>;
  }
  return (
    <Layout>
      <Row justify="center" style={{ paddingTop: 200 }}>
        <LoadingOutlined style={{ fontSize: 200 }} spin />
      </Row>
    </Layout>
  );
};

export default OverView;
