import { notification } from 'antd';

const openNotification = (message, description, type = 'info') => {
  notification[type]({
    message,
    description,
    placement: 'topRight',
  });
};

export default openNotification;
