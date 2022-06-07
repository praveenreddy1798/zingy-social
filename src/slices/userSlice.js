import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import {
  fetchUserInfoById,
  editUserInfoById,
  followSelectedUser,
  unfollowSelectedUser,
  fetchAllUsers,
} from "../services/user";

const initialState = {
  userInfo: {},
  users: [],
  userStatus: "idle",
  userError: null,
};

const setUserPendingState = (state) => {
  state.userStatus = "loading";
  state.userError = null;
};

const setUserInfoSuccessState = (state, payload) => {
  state.userInfo = payload.user;
  state.userStatus = "success";
};

const setUsersSuccessState = (state, payload) => {
  const { data, userId } = payload;
  state.users = data.users;
  if (userId) {
    state.userInfo = data.users.find((user) => user._id === userId);
  }
  state.userStatus = "success";
};

const setUserErrorState = (state, payload) => {
  state.userError = payload;
  state.userStatus = "error";
  message.error(payload);
};

export const loadUserInfoByUsername = createAsyncThunk(
  "user/loadUserInfoByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await fetchUserInfoById(username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editUserInfo = createAsyncThunk(
  "user/editUserInfo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await editUserInfoById(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/followUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await followSelectedUser(userId);
      return { data: response.data, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "user/unfollowUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await unfollowSelectedUser(userId);
      return { data: response.data, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadAllUsers = createAsyncThunk(
  "users/loadAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers();
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [loadAllUsers.pending]: (state) => {
      setUserPendingState(state);
    },
    [loadAllUsers.fulfilled]: (state, { payload }) => {
      setUsersSuccessState(state, payload);
    },
    [loadAllUsers.rejected]: (state, { payload }) => {
      setUserErrorState(state, payload);
    },
    [loadUserInfoByUsername.pending]: (state) => {
      setUserPendingState(state);
    },
    [loadUserInfoByUsername.fulfilled]: (state, { payload }) => {
      setUserInfoSuccessState(state, payload);
    },
    [loadUserInfoByUsername.rejected]: (state, { payload }) => {
      setUserErrorState(state, payload);
    },
    [editUserInfo.pending]: (state) => {
      setUserPendingState(state);
    },
    [editUserInfo.fulfilled]: (state, { payload }) => {
      setUserInfoSuccessState(state, payload);
    },
    [editUserInfo.rejected]: (state, { payload }) => {
      setUserErrorState(state, payload);
    },
    [followUser.pending]: (state) => {
      setUserPendingState(state);
    },
    [followUser.fulfilled]: (state, { payload }) => {
      setUsersSuccessState(state, payload);
    },
    [followUser.rejected]: (state, { payload }) => {
      setUserErrorState(state, payload);
    },
    [unfollowUser.pending]: (state) => {
      setUserPendingState(state);
    },
    [unfollowUser.fulfilled]: (state, { payload }) => {
      setUsersSuccessState(state, payload);
    },
    [unfollowUser.rejected]: (state, { payload }) => {
      setUserErrorState(state, payload);
    },
  },
});

export const userReducer = userSlice.reducer;
