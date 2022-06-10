import { Layout, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CustomButton, FlexBetween } from ".";
import { logout } from "../slices";

const { Header: AntdHeader } = Layout;
const { Search } = Input;

const CustomHeader = styled(AntdHeader)`
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: var(--lynx-white);
  padding: 0 1rem;
  border-bottom: 0.5px solid grey;
`;

const Header = ({ setSearch, pathname, search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <CustomHeader>
      <FlexBetween style={{ height: "inherit", width: "100%" }}>
        <CustomButton
          onClick={() => navigate("/")}
          type="text"
          borderColor="none"
          width="max-content"
          height="2.5rem"
        >
          Zingy Social
        </CustomButton>
        {(pathname === "/explore" || pathname === "/") && (
          <Search
            placeholder={
              pathname === "/"
                ? "Search for a post or a user"
                : "Search for a user"
            }
            allowClear
            size="large"
            onSearch={(value) => setSearch(value)}
            style={{
              width: "20rem",
            }}
          />
        )}
        <CustomButton
          width="max-content"
          height="2.5rem"
          type="primary"
          style={{ padding: "0.25rem 2rem" }}
          onClick={() => {
            if (isAuth) {
              dispatch(logout());
            }
            navigate("/login");
          }}
        >
          {isAuth ? "Logout" : "Login"}
        </CustomButton>
      </FlexBetween>
    </CustomHeader>
  );
};

export { Header };
