import postReducer from "./post/post.slice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  post: postReducer,
});

export default rootReducer;
