import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Comment, List, Card, Tooltip, Spin, Avatar } from "antd";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  downvoteComment,
  editComment,
  loadCommentsByPostId,
  removeComment,
  upvoteComment,
} from "../slices";
import { checkIfAlreadyDownvoted, checkIfAlreadyUpvoted } from "../utils";
import { useNavigate } from "react-router-dom";
import { Editor } from ".";

const CommentAction = styled.span`
  padding-right: 0.5rem;
  cursor: "auto";
`;

const Comments = ({ postId }) => {
  const {
    comments: { comments, commentsStatus },
    auth: {
      userDetails: { username: loggedUsername },
      isAuth,
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [inputType, setInputType] = useState("add");
  const [selectedComment, setSelectedComment] = useState({
    postId,
    commentId: null,
    text: "",
  });
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(loadCommentsByPostId(postId));
  }, [postId, dispatch]);

  const handleAddSubmit = (e) => {
    if (!commentText) {
      return;
    }
    dispatch(addComment({ postId, payload: { text: commentText } }));
    setCommentText("");
  };

  const handleEditSubmit = (e) => {
    if (!selectedComment.text) {
      return;
    }
    dispatch(
      editComment({
        postId,
        payload: {
          _id: selectedComment.commentId,
          text: selectedComment.text,
        },
      })
    );
    setSelectedComment((selectedComment) => ({
      ...selectedComment,
      commentId: null,
      text: "",
    }));
    setInputType("add");
    setCommentText("");
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleEditChange = (e) => {
    setSelectedComment((selectedComment) => ({
      ...selectedComment,
      text: e.target.value,
    }));
  };

  const closeEditBox = () => {
    setSelectedComment((selectedComment) => ({
      ...selectedComment,
      commentId: null,
      text: "",
    }));
    setCommentText("");
    setInputType("add");
  };

  const setActions = (commentId, commentUsername, commentText, votes) => {
    const isUpvoted = checkIfAlreadyUpvoted(votes, loggedUsername);
    const isDownvoted = checkIfAlreadyDownvoted(votes, loggedUsername);
    return [
      <Tooltip key="comment-like" title="like">
        <span
          onClick={() => {
            if (!isAuth) {
              return navigate("/login");
            }
            isUpvoted
              ? dispatch(downvoteComment({ postId, commentId }))
              : dispatch(upvoteComment({ postId, commentId }));
          }}
        >
          <CommentAction className="comment-action">
            {isUpvoted ? <LikeFilled /> : <LikeOutlined />}
          </CommentAction>
        </span>
      </Tooltip>,
      <Tooltip key="comment-dislike" title="dislike">
        <span
          onClick={() => {
            if (!isAuth) {
              return navigate("/login");
            }
            isDownvoted
              ? dispatch(upvoteComment({ postId, commentId }))
              : dispatch(downvoteComment({ postId, commentId }));
          }}
        >
          <CommentAction className="comment-action">
            {isDownvoted ? <DislikeFilled /> : <DislikeOutlined />}
          </CommentAction>
        </span>
      </Tooltip>,
      commentUsername === loggedUsername && (
        <Tooltip key="edit-comment" title="edit">
          <CommentAction
            className="comment-action"
            onClick={() => {
              setSelectedComment({
                ...selectedComment,
                commentId,
                text: commentText,
              });
              setInputType("edit");
              inputRef.current.focus();
            }}
          >
            <EditOutlined />
          </CommentAction>
        </Tooltip>
      ),
      commentUsername === loggedUsername && (
        <Tooltip key="delete-comment" title="delete">
          <CommentAction
            className="comment-action"
            onClick={() => {
              dispatch(removeComment({ postId, commentId }));
            }}
          >
            <DeleteOutlined />
          </CommentAction>
        </Tooltip>
      ),
    ];
  };

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={({ text, username, profilePic, _id, votes }) => (
        <Comment
          actions={setActions(_id, username, text, votes)}
          author={username}
          content={text}
          avatar={
            !profilePic ? (
              <Avatar size={32} icon={<UserOutlined />} />
            ) : (
              profilePic
            )
          }
        />
      )}
    />
  );

  return (
    <Spin spinning={commentsStatus === "loading"}>
      <Card>
        <h3>Comments</h3>
        {commentsStatus !== "loading" && comments?.length > 0 && (
          <CommentList comments={comments} />
        )}
        <Comment
          id="#comments"
          content={
            <Editor
              inputRef={inputRef}
              onChange={inputType === "edit" ? handleEditChange : handleChange}
              onSubmit={
                inputType === "edit" ? handleEditSubmit : handleAddSubmit
              }
              value={inputType === "edit" ? selectedComment.text : commentText}
              style={{ padding: 0 }}
              inputType={inputType}
              closeEditBox={closeEditBox}
            />
          }
        />
      </Card>
    </Spin>
  );
};

export { Comments };
