import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "1", icon: <UserOutlined />, label: <Link to="/">Products</Link> },
    {
      key: "2",
      icon: <LaptopOutlined />,
      label: <Link to="/subpage/1">SubCategory 1</Link>,
    },
    {
      key: "3",
      icon: <NotificationOutlined />,
      label: <Link to="/subcategorypage">SubCategory 2</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} style={{ background: colorBgContainer }}>
        <Menu mode="inline" items={menuItems} />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
