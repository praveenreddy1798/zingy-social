import {
  Avatar,
  Typography,
  Button,
  Space,
  Anchor,
  Card,
  Divider,
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  loadPostsByUsername,
  loadUserInfoByUsername,
  unfollowUser,
} from "../slices";

const { Link } = Anchor;
const { Text, Title } = Typography;

const CustomCard = styled(Card)`
  width: max-content;
  padding: 0.25rem;
`;

const PortfolioLink = styled(Link)`
  a {
    color: var(--primary);
  }
`;

const CustomTitle = styled(Title)`
  margin-bottom: 0 !important;
`;

const CustomText = styled(Text)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileContainer = styled(Space)`
  width: 30rem;
  height: max-content;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const {
    auth: {
      userDetails: { username: loggedUsername },
      isAuth,
    },
    user: { userInfo, userStatus },
    posts: { postsByUserName, postsStatus },
  } = useSelector((state) => state);
  const {
    firstName,
    lastName,
    followers,
    bio,
    portfolio,
    profilePic,
    following,
    _id,
  } = userInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(loadUserInfoByUsername(username));
    dispatch(loadPostsByUsername(username));
  }, [dispatch, username]);
  const isAlreadyFollowing = followers
    ?.map((user) => user.username)
    .includes(loggedUsername);
  return (
    <Spin spinning={userStatus === "loading" || postsStatus === "loading"}>
      {(userStatus !== "loading" || postsStatus !== "loading") && (
        <>
          <Container>
            <ProfileContainer
              style={{ position: "relative" }}
              direction="vertical"
              align="center"
            >
              {loggedUsername === username && (
                <Button
                  onClick={() => navigate("/profile/edit")}
                  ghost
                  style={{ position: "absolute", right: 0 }}
                  type="primary"
                >
                  Edit Profile
                </Button>
              )}
              {!profilePic ? (
                <Avatar size={96} icon={<UserOutlined />} />
              ) : (
                <Avatar size={96} src={profilePic} />
              )}
              <CustomTitle level={4}>{firstName + " " + lastName}</CustomTitle>
              <CustomTitle level={5} type="secondary">
                {username}
              </CustomTitle>
              {loggedUsername !== username && (
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
              )}
              {bio && <CustomText>{bio}</CustomText>}
              {portfolio && (
                <Anchor affix={false}>
                  <PortfolioLink
                    target="_blank"
                    href={portfolio}
                    title={portfolio}
                  />
                </Anchor>
              )}
              <CustomCard>
                <Space direction="horizontal">
                  <Space
                    direction="vertical"
                    style={{ marginRight: "1rem" }}
                    align="center"
                  >
                    <Text strong>{following?.length}</Text>
                    <Text type="secondary">Following</Text>
                  </Space>
                  <Space
                    style={{ marginRight: "1rem" }}
                    direction="vertical"
                    align="center"
                  >
                    <Text strong>
                      {!postsByUserName?.length ? 0 : postsByUserName.length}
                    </Text>
                    <Text type="secondary">Posts</Text>
                  </Space>
                  <Space direction="vertical" align="center">
                    <Text strong>{followers?.length}</Text>
                    <Text type="secondary">Followers</Text>
                  </Space>
                </Space>
              </CustomCard>
            </ProfileContainer>
          </Container>
          <Divider />
          <Container>
            <CustomTitle>
              {!postsByUserName?.length ? "No Posts Available" : "Posts"}
            </CustomTitle>
          </Container>
          <Container>
            <Space direction="vertical" align="center">
              {postsByUserName?.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </Space>
          </Container>
        </>
      )}
    </Spin>
  );
};

export { Profile };
