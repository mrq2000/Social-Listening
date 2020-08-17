import React from 'react';
import { useRouter } from 'next/router';
import { Pie, Bar } from 'react-chartjs-2';
import { Row, Col, Button } from 'antd';
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

  const barOptions = {
    responsive: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
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
          label: 'Biểu đồ đánh giá của người dùng',
        },
      ],
    };
  }

  if (post && data) {
    const handle = (key) => {
      router.push({ pathname: '/detail', query: { key, postId: `${post.post_id}` } });
    };

    return (
      <Layout>
        <Card post={post} />
        <Row justify="space-around" align="center" style={{ marginTop: 16 }}>
          <Col style={{ display: 'flex', alignItems: 'center' }}>
            <Pie data={data} height={300} width={400} options={options} />
          </Col>

          <Col>
            <Bar data={data} width={400} height={400} options={barOptions} />
          </Col>
        </Row>

        <Row justify="space-around" style={{ marginTop: 16 }}>
          <Button
            style={{
              backgroundColor: '#36A2EB',
              color: '#fff',
              fontWeight: 'bold',
            }}
            onClick={() => handle('__lb__positive')}
          >
            Tích Cực
          </Button>

          <Button
            style={{
              backgroundColor: '#FF6384',
              color: '#fff',
              fontWeight: 'bold',
            }}
            onClick={() => handle('__lb__negative')}
          >
            Tiêu Cực
          </Button>

          <Button
            style={{
              backgroundColor: '#FFCE56',
              color: '#fff',
              fontWeight: 'bold',
            }}
            onClick={() => handle('__lb__neutral')}
          >
            Trung Lập
          </Button>
        </Row>
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
