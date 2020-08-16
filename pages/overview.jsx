import React from 'react';
import { useRouter } from 'next/router';
import { Pie } from 'react-chartjs-2';
import { Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import Card from '../components/common/Card';

const OverView = () => {
  const router = useRouter();
  let post = {};
  let data = {};
  const options = {
    responsive: false,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 20,
      },
    },
  };

  if (typeof router.query.post !== 'undefined') {
    post = JSON.parse(router.query.post);
    data = {
      labels: ['Tích Cực', 'Tiêu Cực', 'Trung Lập'],
      datasets: [
        {
          data: [
            post.pos_total ? post.pos_total : 0,
            post.neg_total ? post.neg_total : 0,
            post.neu_total ? post.neu_total : 0,
          ],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        },
      ],
    };
  }
  if (post && data) {
    return (
      <Layout>
        <Card post={post} />
        <Pie data={data} height={300} width={400} options={options} />
      </Layout>
    );
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
