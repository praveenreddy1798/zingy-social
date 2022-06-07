import axios from "axios";

export const fetchCommentsByPostId = async (postId) =>
  await axios.get(`/api/comments/${postId}`);

export const addCommentToPost = async (postId, payload) =>
  await axios.post(
    `/api/comments/add/${postId}`,
    { ...payload },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

export const editCommentInPost = async (postId, payload) =>
  await axios.post(
    `/api/comments/edit/${postId}/${payload._id}`,
    {
      ...payload,
    },
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

export const removeCommentFromPost = async (postId, commentId) =>
  await axios.delete(`/api/comments/delete/${postId}/${commentId}`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });

export const upvoteCommentInPost = async (postId, commentId) =>
  await axios.post(
    `/api/comments/upvote/${postId}/${commentId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

export const downvoteCommentInPost = async (postId, commentId) =>
  await axios.post(
    `/api/comments/downvote/${postId}/${commentId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
