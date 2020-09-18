import React, { useState, useEffect } from 'react';
import {
  Button, Modal, Typography, Row, Col, Card,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';

import openNotification from '../../helper/notification';
import DELETE_COMMENT from '../../graphql/mutations/deteleComment';

const { confirm } = Modal;

const RemoveComment = ({ commentId, postId, id }) => {
  const [open, setOpen] = useState(false);
  const clone = Cookies.get('pageInfos');
  const [pageInfos, setPageInfos] = useState();

  useEffect(() => {
    const pageInfosJson = JSON.parse(clone);
    setPageInfos(pageInfosJson);
  }, [clone]);

  const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    variables: {
      id: parseInt(id, 10),
    },
  });

  if (error) console.log(error);
  const remove = async (token) => {
    const url = `https://graph.facebook.com/${postId}_${commentId}?access_token=${token}`;
    try {
      const response = await axios({
        method: 'delete',
        url,
      });
      if (response.data && response.data.success) {
        deleteComment();
        openNotification('Remove Success', 'Xóa comment thành công', 'success');
      }
    } catch (e) {
      openNotification(
        'Remove Fail',
        'Bạn không thể xóa comment này. Hãy chắc chắn bạn có quyền xóa commeny này',
        'error',
      );
    }
  };

  const handleRemoveTask = async (token) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography.Text type="danger">
          Are You Sure To Delete It ?
        </Typography.Text>
      ),
      onOk() {
        remove(token);
      },
    });
  };

  const renderChoosePage = () => {
    if (pageInfos) {
      return (
        <Modal visible={open}>
          <Typography.Title level={3}>
            Chọn Fanpage để xóa
          </Typography.Title>
          <Row gutter={[16, 16]}>
            {
              pageInfos.map((pageInfo) => (
                <Col span={12} key={pageInfo.id}>
                  <Card
                    hoverable
                    cover={<img alt="example" src={pageInfo.picture.data.url} />}
                    onClick={() => {
                      handleRemoveTask(pageInfo.access_token);
                      setOpen(false);
                    }}
                  >
                    <Card.Meta title={pageInfo.name} description={`id: ${pageInfo.id}`} />
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Modal>
      );
    }
    return <></>;
  };

  return (
    <>
      <Button
        type="primary"
        danger
        onClick={() => setOpen(true)}
        size="small"
      >
        Remove
      </Button>

      {renderChoosePage()}
    </>
  );
};

RemoveComment.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RemoveComment;
