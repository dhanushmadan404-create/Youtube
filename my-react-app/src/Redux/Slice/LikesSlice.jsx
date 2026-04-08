import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import likesApi from "../../api/Likes";

const initialState = {
  likesCreate: null,
  likesVideo: 0,
  userLikes: null,
  removeLikes: null,
  isLoading: false,
  isError: false,
};

// create like
export const createLikes = createAsyncThunk(
  "likes/create",
  async ({body}, thunkApi) => {
    try {
      const response = await likesApi.createLikes(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get video likes
export const getVideoLikes = createAsyncThunk(
  "likes/videoLikes",
  async ({videoId}, thunkApi) => {
    try {
      const response = await likesApi.getByVideo(videoId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get user likes
export const getUserLikes = createAsyncThunk(
  "likes/userLikes",
  async (userId, thunkApi) => {
    try {
      const response = await likesApi.getByUser(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// remove like
export const removeLikes = createAsyncThunk(
  "likes/removeLikes",
  async ({ userId, videoId }, thunkApi) => {
    try {
      const response = await likesApi.removeLikes(userId, videoId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // create like states
      .addCase(createLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likesCreate = action.payload;
      })
      .addCase(createLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // video likes states
      .addCase(getVideoLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideoLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likesVideo = action.payload;
      })
      .addCase(getVideoLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // user likes states
      .addCase(getUserLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userLikes = action.payload;
      })
      .addCase(getUserLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // remove likes states
      .addCase(removeLikes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.removeLikes = action.payload;
      })
      .addCase(removeLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default likesSlice.reducer;