import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const deletePost = createAsyncThunk(
  "post/deletePost",
  // if you type your function argument here
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/post/${id}`);
      const deletePost = await response.data;
      if (!deletePost) {
        throw new Error("Data not found");
      }
      return deletePost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postMemory = createAsyncThunk(
  "post/postMemory",
  // if you type your function argument here
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post("/post", values);
      const post = await response.data;
      if (!post) {
        throw new Error("Data not found");
      }
      return post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMemory = createAsyncThunk(
  "post/postMemory",
  // if you type your function argument here
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/post/${values.id}`, values);
      const updatedPost = await response.data;
      if (!updatedPost) {
        throw new Error("Data not found");
      }
      return updatedPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const counterSlice = createSlice({
  name: "post",
  initialState: {
    // posts: null,
    isPending: false,
    error: null,
  },
  extraReducers: {
    [deletePost.pending]: (state, action) => {
      state.isPending = true;
      state.error = null;
      // state.posts = null;
    },
    [deletePost.fulfilled]: (state, action) => {
      // const deletedPost = action.payload;
      // state.posts = null;
      state.isPending = false;
      state.error = null;
    },
    [deletePost.rejected]: (state, action) => {
      const { message } = action.payload;
      // state.posts = null;
      state.isPending = false;
      state.error = message;
    },
    [postMemory.pending]: (state, action) => {
      state.isPending = true;
    },
    [postMemory.fulfilled]: (state, action) => {
      state.isPending = false;
    },
    [updateMemory.pending]: (state, action) => {
      state.isPending = true;
    },
    [updateMemory.fulfilled]: (state, action) => {
      state.isPending = false;
    },
  },
});

// Action creators are generated for each case reducer function

export default counterSlice.reducer;
