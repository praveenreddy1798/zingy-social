import { Card, Avatar, Divider } from "antd";
import styled from "styled-components";
import {
  UserOutlined,
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Comments } from "./Comments";
import { MenuDropdown } from "./MenuDropdown";
import { Container, FlexBetween } from "./Utils";
import { useNavigate } from "react-router-dom";
import { CustomTitle } from ".";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, likePost, removeBookmark, unlikePost } from "../slices";
const { Meta } = Card;

const CardHeader = styled(Meta)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PostContainer = styled.div`
  background-color: white;
  width: 30rem;
  margin: 1rem;
`;

const Image = styled.img`
  cursor: pointer;
`;

const Post = ({ post, isCommentsVisible = false }) => {
  const state = useSelector((state) => state);
  const {
    auth: {
      userDetails: { username },
      isAuth,
    },
    bookmarks: { bookmarks },
  } = state;
  const {
    title,
    description,
    photo,
    firstName,
    lastName,
    profilePic,
    username: postUsername,
    _id,
    likes,
  } = post;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useState(isCommentsVisible);
  return (
    <Container>
      <PostContainer>
        <Card
          title={
            <FlexBetween>
              <CardHeader
                onClick={() => navigate(`/profile/${postUsername}`)}
                avatar={
                  profilePic ? (
                    <Avatar src={profilePic} />
                  ) : (
                    <Avatar size={32} icon={<UserOutlined />} />
                  )
                }
                title={firstName + " " + lastName}
              />
              {username === postUsername && <MenuDropdown postId={_id} />}
            </FlexBetween>
          }
          bordered={false}
          cover={
            photo && (
              <Image
                onClick={() => navigate(`/posts/${_id}`)}
                alt="post"
                src={photo}
                width="400"
                height="400"
              />
            )
          }
          actions={[
            username &&
            likes.likedBy.map((user) => user.username).includes(username) ? (
              <HeartFilled
                onClick={() =>
                  !isAuth
                    ? navigate("/login")
                    : dispatch(
                        unlikePost({ postId: _id, username: postUsername })
                      )
                }
              />
            ) : (
              <HeartOutlined
                onClick={() =>
                  !isAuth
                    ? navigate("/login")
                    : dispatch(
                        likePost({ postId: _id, username: postUsername })
                      )
                }
              />
            ),
            <CommentOutlined
              onClick={() => navigate(`/posts/${_id}/?commentsSection=true`)}
              key="comments"
            />,
            bookmarks.includes(_id) ? (
              <i
                className="fa fa-bookmark bookmark-icon"
                aria-hidden="true"
                onClick={() =>
                  !isAuth ? navigate("/login") : dispatch(removeBookmark(_id))
                }
              ></i>
            ) : (
              <i
                className="fa fa-bookmark-o bookmark-icon"
                aria-hidden="true"
                onClick={() =>
                  !isAuth ? navigate("/login") : dispatch(addBookmark(_id))
                }
              ></i>
            ),
          ]}
        >
          <Meta title={title} description={description} />
          <Divider type="vertical" />
          <CustomTitle level={5}>{likes.likeCount} likes</CustomTitle>
        </Card>
        {isCommentsVisible && <Comments postId={_id} />}
      </PostContainer>
    </Container>
  );
};

export { Post };
