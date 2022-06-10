import React, { useEffect } from "react";
import { List, Button, Avatar, Card, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components";
import { followUser, loadAllUsers, unfollowUser } from "../slices";
import { useDispatch, useSelector } from "react-redux";

const UsersCard = styled(Card)`
  width: ${(props) => props?.width || "100%"};
`;

const Explore = ({ width, searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: { users, userStatus },
    auth: {
      userDetails: { username: loggedUsername },
      isAuth,
    },
  } = useSelector((state) => state);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadAllUsers());
    return () => setSearchValue("");
  }, [dispatch, setSearchValue]);

  let usersList = [];
  if (searchValue) {
    usersList = users.filter(
      (user) =>
        user.username.includes(searchValue) ||
        user.firstName.includes(searchValue) ||
        user.lastName.includes(searchValue)
    );
  } else {
    usersList = users.filter((user) => user.username !== loggedUsername);
  }

  return (
    <Container style={{ marginRight: 0, padding: "1rem" }}>
      <UsersCard width={width}>
        <Spin spinning={userStatus === "loading"}>
          <List
            itemLayout="horizontal"
            dataSource={usersList}
            renderItem={({
              username,
              firstName,
              lastName,
              _id,
              profilePic,
              followers,
            }) => {
              const isAlreadyFollowing = followers
                .map((user) => user.username)
                .includes(loggedUsername);
              return (
                <List.Item key={username}>
                  <List.Item.Meta
                    avatar={
                      profilePic ? (
                        <Avatar src={profilePic} />
                      ) : (
                        <Avatar size={32} icon={<UserOutlined />} />
                      )
                    }
                    title={
                      <Link to={`/profile/${username}`}>
                        {firstName + " " + lastName}
                      </Link>
                    }
                    description={username}
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      if (!isAuth) {
                        return navigate("/login");
                      }
                      isAlreadyFollowing
                        ? dispatch(unfollowUser(_id))
                        : dispatch(followUser(_id));
                    }}
                  >
                    {isAlreadyFollowing ? "Unfollow" : "follow"}
                  </Button>
                </List.Item>
              );
            }}
          ></List>
        </Spin>
      </UsersCard>
    </Container>
  );
};

export { Explore };
