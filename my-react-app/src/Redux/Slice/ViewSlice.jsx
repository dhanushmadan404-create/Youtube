import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import viewApi from "../../api/View";

const initialState = {
  viewCreate: null,
  videoViews: null,
  userViews: null,
  isLoading: false,
  isError: false,
};

// create view
export const createView = createAsyncThunk(
  "view/create",
  async (body, thunkApi) => {
    try {
      const response = await viewApi.createView(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get video views
export const getVideoViews = createAsyncThunk(
  "view/video",
  async (videoId, thunkApi) => {
    try {
      const response = await viewApi.getByVideo(videoId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get user views
export const getUserViews = createAsyncThunk(
  "view/user",
  async (userId, thunkApi) => {
    try {
      const response = await viewApi.getByUser(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // create view states
      .addCase(createView.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createView.fulfilled, (state, action) => {
        state.isLoading = false;
        state.viewCreate = action.payload;
      })
      .addCase(createView.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // video views states
      .addCase(getVideoViews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideoViews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videoViews = action.payload;
      })
      .addCase(getVideoViews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // user views states
      .addCase(getUserViews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserViews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userViews = action.payload;
      })
      .addCase(getUserViews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default viewSlice.reducer;