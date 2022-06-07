import axios from "axios";

export const fetchAllPosts = async () => await axios.get("/api/posts");

export const fetchPostById = async (postId) =>
  await axios.get(`/api/posts/${postId}`);

export const fetchPostsByUsername = async (username) =>
  await axios.get(`/api/posts/user/${username}/`);

export const addNewPost = async (payload) =>
  await axios.post("/api/posts/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("token"),
    },
  });

export const editPostById = async (postId, payload) =>
  await axios.post(`/api/posts/edit/${postId}/`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("token"),
    },
  });

export const deletePostById = async (postId) =>
  await axios.delete(`/api/posts/${postId}/`, {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });

export const addLikeToPost = async (postId) =>
  await axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

export const removeLikeFromPost = async (postId) =>
  await axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
