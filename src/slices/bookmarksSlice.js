import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  fetchAllBookmarkPosts,
  addBookmarkToPost,
  removeBookmarkFromPost,
} from "../services/bookmarks";

const initialState = {
  bookmarks: [],
  bookmarksStatus: "idle",
  bookmarksError: null,
};

const setBookmarksPendingState = (state) => {
  state.bookmarksError = null;
};

const setBookmarksSuccessState = (state, payload) => {
  state.bookmarks = payload.bookmarks;
  state.bookmarksStatus = "success";
};

const setBookmarksErrorState = (state, payload) => {
  state.bookmarksError = payload;
  state.bookmarksStatus = "error";
  message.error(payload);
};

export const loadAllBookmarks = createAsyncThunk(
  "bookmarks/loadAllBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllBookmarkPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "bookmarks/addBookmark",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await addBookmarkToPost(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "bookmarks/removeBookmark",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await removeBookmarkFromPost(postId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {},
  extraReducers: {
    [loadAllBookmarks.pending]: (state) => {
      state.bookmarksStatus = "loading";
      setBookmarksPendingState(state);
    },
    [loadAllBookmarks.fulfilled]: (state, { payload }) => {
      setBookmarksSuccessState(state, payload);
    },
    [loadAllBookmarks.rejected]: (state, { payload }) => {
      setBookmarksErrorState(state, payload);
    },
    [addBookmark.pending]: (state) => {
      setBookmarksPendingState(state);
    },
    [addBookmark.fulfilled]: (state, { payload }) => {
      setBookmarksSuccessState(state, payload);
    },
    [addBookmark.rejected]: (state, { payload }) => {
      setBookmarksErrorState(state, payload);
    },
    [removeBookmark.pending]: (state) => {
      setBookmarksPendingState(state);
    },
    [removeBookmark.fulfilled]: (state, { payload }) => {
      setBookmarksSuccessState(state, payload);
    },
    [removeBookmark.rejected]: (state, { payload }) => {
      setBookmarksErrorState(state, payload);
    },
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;
