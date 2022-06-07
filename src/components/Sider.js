import { Layout, Menu } from "antd";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  RocketOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Sider: antdSider } = Layout;

const CustomMenu = styled(Menu)`
  font-size: 1.325rem;
  flex-direction: column;
  && {
    li {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      height: 3.5rem;
      padding: 1.5rem;
    }
    .ant-menu-item-icon {
      font-size: 1.325rem;
    }
  }
`;

const CustomSider = styled(antdSider)`
  top: 4rem;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  @media only screen and (max-width: 1000px) {
    top: 5rem;
  }

  @media only screen and (max-width: 600px) {
    top: 6rem;
  }
`;

const Sider = ({ setIsCollapsed, hideSider }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userDetails: { username },
  } = useSelector((state) => state.auth);

  const menuItems = [
    {
      icon: <HomeOutlined />,
      label: "Home",
      route: "/",
      name: "Home",
    },
    {
      icon: <RocketOutlined />,
      label: "Explore",
      route: "/explore",
    },
    {
      icon: (
        <i className="fa fa-bookmark-o bookmark-icon" aria-hidden="true"></i>
      ),
      label: "Bookmarks",
      route: "/bookmarks",
    },
    {
      icon: <UserOutlined />,
      label: "Profile",
      route: `/profile/${username}`,
    },
    {
      icon: <PlusCircleOutlined />,
      label: "Post",
      route: "/post/create",
    },
  ];
  return (
    !hideSider && (
      <CustomSider
        collapsible={false}
        width="18rem"
        collapsedWidth="5rem"
        breakpoint={"md"}
        onCollapse={(collapsed) => setIsCollapsed(collapsed)}
      >
        <CustomMenu
          theme="dark"
          defaultSelectedKeys={["/"]}
          selectedKeys={[location.pathname]}
        >
          {menuItems.map(({ icon, route, label }) => (
            <CustomMenu.Item
              key={route}
              icon={icon}
              onClick={() => {
                if (!username && label === "Profile") {
                  return navigate("/login");
                }
                return navigate(route);
              }}
            >
              {label}
            </CustomMenu.Item>
          ))}
        </CustomMenu>
      </CustomSider>
    )
  );
};

export { Sider };
