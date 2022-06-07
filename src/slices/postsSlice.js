import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  fetchAllPosts,
  fetchPostsByUsername,
  addLikeToPost,
  removeLikeFromPost,
  addNewPost,
  editPostById,
  deletePostById,
  fetchPostById,
} from "../services/posts";
import { MESSAGES } from "../utils";
const initialState = {
  posts: [],
  postsByUserName: [],
  postsStatus: "idle",
  postsError: null,
  post: {},
};

const setPostsPendingState = (state) => {
  state.postsError = null;
};

const setPostsSuccessState = (state, payload) => {
  state.posts = payload.posts;
  state.postsStatus = "success";
};

const setPostsByUsernameSuccessState = (state, payload) => {
  state.postsByUserName = payload.posts;
  state.postsStatus = "success";
};

const setPostsErrorState = (state, payload) => {
  state.postsError = payload;
  state.postsStatus = "error";
  message.error(payload);
};

export const loadAllPosts = createAsyncThunk(
  "posts/loadAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadPostsByUsername = createAsyncThunk(
  "posts/loadPostsByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await fetchPostsByUsername(username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addLikeToPost(payload.postId);
      return { data: response.data, username: payload.username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await removeLikeFromPost(payload.postId);
      return { data: response.data, username: payload.username };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addNewPost(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ postId, payload }, { rejectWithValue }) => {
    try {
      const response = await editPostById(postId, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await deletePostById(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadPostById = createAsyncThunk(
  "post/loadPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetchPostById(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPost: (state) => {
      state.post = {};
    },
  },
  extraReducers: {
    [loadAllPosts.pending]: (state) => {
      state.postsStatus = "loading";
      setPostsPendingState(state);
    },
    [loadAllPosts.fulfilled]: (state, { payload }) => {
      setPostsSuccessState(state, payload);
    },
    [loadAllPosts.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
    [loadPostsByUsername.pending]: (state) => {
      state.postsStatus = "loading";
      setPostsPendingState(state);
    },
    [loadPostsByUsername.fulfilled]: (state, { payload }) => {
      setPostsByUsernameSuccessState(state, payload);
    },
    [loadPostsByUsername.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
    [likePost.pending]: (state) => {
      setPostsPendingState(state);
    },
    [likePost.fulfilled]: (state, { payload: { data, username } }) => {
      setPostsSuccessState(state, data);
      state.postsByUserName = data.posts.filter(
        (post) => username === post.username
      );
      state.post = data.post;
    },
    [likePost.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
    [unlikePost.pending]: (state) => {
      setPostsPendingState(state);
    },
    [unlikePost.fulfilled]: (state, { payload: { data, username } }) => {
      setPostsSuccessState(state, data);
      state.postsByUserName = data.posts.filter(
        (post) => username === post.username
      );
      state.post = data.post;
    },
    [unlikePost.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
    [createPost.pending]: (state) => {
      setPostsPendingState(state);
    },
    [createPost.fulfilled]: (state, { payload }) => {
      setPostsSuccessState(state, payload);
      state.postsByUserName = payload.posts.filter(
        (post) => state.username === post.username
      );
      message.success(MESSAGES.POST.ADD);
    },
    [createPost.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
    [editPost.pending]: (state) => {
      setPostsPendingState(state);
    },
    [editPost.fulfilled]: (state, { payload }) => {
      setPostsSuccessState(state, payload);
      state.postsByUserName = payload.posts.filter(
        (post) => state.username === post.username
      );
      message.success(MESSAGES.POST.EDIT);
    },
    [editPost.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
    [deletePost.pending]: (state) => {
      setPostsPendingState(state);
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      setPostsSuccessState(state, payload);
      state.postsByUserName = payload.posts.filter(
        (post) => state.username === post.username
      );
      message.success(MESSAGES.POST.DELETED);
    },
    [deletePost.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
    [loadPostById.pending]: (state) => {
      state.postsStatus = "loading";
      setPostsPendingState(state);
    },
    [loadPostById.fulfilled]: (state, { payload }) => {
      state.post = payload.post;
      state.postsStatus = "success";
    },
    [loadPostById.rejected]: (state, { payload }) => {
      setPostsErrorState(state, payload);
    },
  },
});

export const { clearPost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
