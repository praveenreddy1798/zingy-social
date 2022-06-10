import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  fetchCommentsByPostId,
  removeCommentFromPost,
  addCommentToPost,
  editCommentInPost,
  upvoteCommentInPost,
  downvoteCommentInPost,
} from "../services/comments";

const initialState = {
  comments: [],
  commentsStatus: "idle",
  commentsError: null,
};

const setCommentsPendingState = (state) => {
  state.commentsStatus = "loading";
  state.commentsError = null;
};

const setCommentsSuccessState = (state, payload) => {
  state.comments = payload.comments;
  state.commentsStatus = "success";
};

const setCommentsErrorState = (state, payload) => {
  state.commentsError = payload;
  state.commentsStatus = "error";
  message.error(payload);
};

export const loadCommentsByPostId = createAsyncThunk(
  "comments/loadAllCommentsByPostId",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await fetchCommentsByPostId(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, payload }, { rejectWithValue }) => {
    try {
      const response = await addCommentToPost(postId, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const response = await removeCommentFromPost(postId, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ postId, payload }, { rejectWithValue }) => {
    try {
      const response = await editCommentInPost(postId, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const upvoteComment = createAsyncThunk(
  "comments/upvoteComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const response = await upvoteCommentInPost(postId, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downvoteComment = createAsyncThunk(
  "comments/downvoteComment",
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      const response = await downvoteCommentInPost(postId, commentId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [loadCommentsByPostId.pending]: (state) => {
      setCommentsPendingState(state);
    },
    [loadCommentsByPostId.fulfilled]: (state, { payload }) => {
      setCommentsSuccessState(state, payload);
    },
    [loadCommentsByPostId.rejected]: (state, { payload }) => {
      setCommentsErrorState(state, payload);
    },
    [addComment.pending]: (state) => {
      setCommentsPendingState(state);
    },
    [addComment.fulfilled]: (state, { payload }) => {
      setCommentsSuccessState(state, payload);
    },
    [addComment.rejected]: (state, { payload }) => {
      setCommentsErrorState(state, payload);
    },
    [editComment.pending]: (state) => {
      setCommentsPendingState(state);
    },
    [editComment.fulfilled]: (state, { payload }) => {
      setCommentsSuccessState(state, payload);
    },
    [editComment.rejected]: (state, { payload }) => {
      setCommentsErrorState(state, payload);
    },
    [removeComment.pending]: (state) => {
      setCommentsPendingState(state);
    },
    [removeComment.fulfilled]: (state, { payload }) => {
      setCommentsSuccessState(state, payload);
    },
    [removeComment.rejected]: (state, { payload }) => {
      setCommentsErrorState(state, payload);
    },
    [upvoteComment.pending]: (state) => {
      setCommentsPendingState(state);
    },
    [upvoteComment.fulfilled]: (state, { payload }) => {
      setCommentsSuccessState(state, payload);
    },
    [upvoteComment.rejected]: (state, { payload }) => {
      setCommentsErrorState(state, payload);
    },
    [downvoteComment.pending]: (state) => {
      setCommentsPendingState(state);
    },
    [downvoteComment.fulfilled]: (state, { payload }) => {
      setCommentsSuccessState(state, payload);
    },
    [downvoteComment.rejected]: (state, { payload }) => {
      setCommentsErrorState(state, payload);
    },
  },
});

export const commentsReducer = commentsSlice.reducer;
