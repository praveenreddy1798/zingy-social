import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { loginService, signupService } from "../services/auth";
import { MESSAGES } from "../utils";

const token = localStorage.getItem("token");
const userDetails = localStorage.getItem("userDetails");
const initialState = {
  token: token,
  isAuth: !!token,
  authStatus: "idle",
  authError: null,
  userDetails: userDetails ? JSON.parse(userDetails) : {},
};

const setAuthPendingState = (state) => {
  state.authStatus = "loading";
  state.authError = null;
};

const setAuthSuccessState = (state, payload) => {
  localStorage.setItem("token", payload.encodedToken);
  localStorage.setItem("userDetails", JSON.stringify(payload.foundUser));
  state.token = payload.encodedToken;
  state.isAuth = true;
  state.authStatus = "success";
};

const setAuthErrorState = (state, payload) => {
  state.authError = payload.errors;
  state.authStatus = "error";
  message.error(MESSAGES.SIGNUP.ERROR);
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await loginService(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await signupService(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userDetails");
      state.authStatus = "idle";
      state.authError = null;
      state.token = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      setAuthPendingState(state);
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      setAuthSuccessState(state, payload);
      state.userDetails = payload.foundUser;
      message.success(MESSAGES.LOGIN.SUCCESS);
    },
    [loginUser.rejected]: (state, { payload }) => {
      setAuthErrorState(state, payload);
    },
    [signupUser.pending]: (state) => {
      setAuthPendingState(state);
    },
    [signupUser.fulfilled]: (state, { payload }) => {
      setAuthSuccessState(state, payload);
      message.success(MESSAGES.SIGNUP.SUCCESS);
    },
    [signupUser.rejected]: (state, { payload }) => {
      setAuthErrorState(state, payload);
    },
  },
});

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
