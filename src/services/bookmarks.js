import axios from "axios";

export const fetchAllBookmarkPosts = async () =>
  await axios.get("/api/users/bookmark/", {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  });

export const addBookmarkToPost = async (postId) =>
  await axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );

export const removeBookmarkFromPost = async (postId) =>
  await axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  );
