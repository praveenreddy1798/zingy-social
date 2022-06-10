import axios from "axios";

export const fetchUserInfoById = async (username) =>
  await axios.get(`/api/users/${username}/`);

export const editUserInfoById = async (payload) =>
  await axios.post("/api/users/edit/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("token"),
    },
  });

export const followSelectedUser = async (userId) =>
  await axios.post(
    `/api/users/follow/${userId}/`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

export const unfollowSelectedUser = async (userId) =>
  await axios.post(
    `/api/users/unfollow/${userId}/`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

export const fetchAllUsers = async () =>
  await axios.get("/api/users/", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });
