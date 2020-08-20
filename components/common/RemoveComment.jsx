import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import openNotification from '../../helper/notification';

const { confirm } = Modal;

const RemoveComment = ({ commentId, postId }) => {
  const remove = async () => {
    const token = Cookies.get('Token');
    const url = `https://graph.facebook.com/${postId}_${commentId}?access_token=${token}`;
    try {
      const response = await axios({
        method: 'delete',
        url,
      });
      if (response.data && response.data.success) {
        openNotification('Remove Success', 'Xóa comment thành công', 'success');
      }
    } catch (e) {
      openNotification(
        'Remove Fail',
        'Bạn không thể xóa comment này. Hãy chắc chắn token của bạn chính xác',
        'error',
      );
    }
  };

  const handleRemoveTask = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography.Text type="danger">
          Are You Sure To Delete It ?
        </Typography.Text>
      ),
      onOk() {
        remove();
      },
    });
  };

  return (
    <Button
      type="primary"
      danger
      onClick={() => handleRemoveTask()}
      size="small"
    >
      Remove
    </Button>
  );
};

RemoveComment.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};

export default RemoveComment;
