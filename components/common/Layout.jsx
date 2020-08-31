import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';

import Header from './Header';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const path = { '/': '1', '/fanpage': '2', '/token': '3' };
const MainLayout = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (e) => {
    const { key } = e;
    switch (key) {
      case '1':
        router.push('/');
        break;
      case '2':
        router.push('/fanpage');
        break;
      case '3':
        router.push('/token');
        break;
      case '4':
        router.push('/');
        break;
      case '5':
        router.push('/');
        break;
      case '6':
        router.push('/');
        break;
      case '7':
        router.push('/');
        break;
      default:
        break;
    }
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />

      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(val) => setCollapsed(val)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={[path[router.pathname]]}
            mode="inline"
            onClick={(e) => handleNavigation(e)}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Trang Chủ
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Fanpage của bạn
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Tài Khoản">
              <Menu.Item key="3">Token của bạn</Menu.Item>
              <Menu.Item key="4">Cách Lấy Token</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="About us">
              <Menu.Item key="6">Phạm Hữu Anh Quốc</Menu.Item>
              <Menu.Item key="8">Ngô Song Việt Hoàng</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <ArrowLeftOutlined
                style={{ fontSize: 24, marginBottom: 8 }}
                onClick={() => router.back()}
              />
              {children}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Whatever Social Listening
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
