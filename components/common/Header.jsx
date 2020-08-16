import React from 'react';
import { PageHeader } from 'antd';

import Search from './Search';

const Header = () => (
  <PageHeader
    title={[
      <div style={{ color: '#fff', fontFamily: 'monospace' }}>Whatever</div>,
    ]}
    extra={[<Search />]}
    style={{ backgroundColor: '#002140', color: 'red' }}
  />
);

export default Header;
