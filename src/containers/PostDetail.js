import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { Container, CustomTitle, Post } from "../components";
import { loadPostById } from "../slices";

export const PostDetail = () => {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  params = Object.fromEntries(params);
  const { post, postsStatus } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { postId } = useParams();
  useEffect(() => {
    if (params?.commentsSection) {
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      window.scrollTo(0, 0);
    }
    dispatch(loadPostById(postId));
  }, [dispatch, postId, params?.commentsSection]);
  return (
    <Container>
      <Spin spinning={postsStatus === "loading"}>
        {postsStatus !== "loading" &&
          (Object.keys(post).length > 0 ? (
            <Post key={post._id} post={post} isCommentsVisible />
          ) : (
            <CustomTitle>
              Sorry we couldn't find what you are looking for !
            </CustomTitle>
          ))}
      </Spin>
    </Container>
  );
};
