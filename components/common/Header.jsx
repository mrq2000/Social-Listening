import React from 'react';
import { PageHeader } from 'antd';

import Search from './Search';

const Header = () => (
  <PageHeader
    title={[
      <div style={{ color: '#fff', fontFamily: 'monospace' }} key="1">Whatever</div>,
    ]}
    extra={[<Search key="1" />]}
    style={{ backgroundColor: '#002140', color: 'red' }}
  />
);

export default Header;
