import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  postsReducer,
  userReducer,
  bookmarksReducer,
  commentsReducer,
} from "./slices";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
    user: userReducer,
    comments: commentsReducer,
  },
  devTools: true,
});
