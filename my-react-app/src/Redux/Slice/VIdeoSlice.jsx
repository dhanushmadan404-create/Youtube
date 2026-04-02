import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videoApi from "../../api/VIdeo";

const initialState = {
  raVideo: [],
  cateVideo: [],
  userVideo: [],
  removeVideo: null,
  updateVideo: null,
  isLoading: false,
  isError: false,
};
export const CreateVideo=createAsyncThunk(
  "Video/create",
  async({body},thunkApi)=>{
     try {
      const response = await videoApi.videoCreate(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
)
// get all videos
export const getAllVideo = createAsyncThunk(
  "video/getAll",
  async (_, thunkApi) => {
    try {
      const response = await videoApi.videoRandom();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get by category
export const getVideoByCategory = createAsyncThunk(
  "video/byCategory",
  async (category, thunkApi) => {
    try {
      const response = await videoApi.videoByCategory(category);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get by user
export const getVideoByUser = createAsyncThunk(
  "video/byUser",
  async (userId, thunkApi) => {
    try {
      const response = await videoApi.videoByUser(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// remove video
export const removeVideo = createAsyncThunk(
  "video/remove",
  async (videoId, thunkApi) => {
    try {
      const response = await videoApi.removeVideo(videoId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update video
export const updateVideo = createAsyncThunk(
  "video/update",
  async ({ videoId, body }, thunkApi) => {
    try {
      const response = await videoApi.updateVideo(videoId, body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // get all videos
      .addCase(getAllVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.raVideo = action.payload;
      })
      .addCase(getAllVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // category videos
      .addCase(getVideoByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideoByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cateVideo = action.payload;
      })
      .addCase(getVideoByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // user videos
      .addCase(getVideoByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideoByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userVideo = action.payload;
      })
      .addCase(getVideoByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // remove video
      .addCase(removeVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.removeVideo = action.payload;
      })
      .addCase(removeVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // update video
      .addCase(updateVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateVideo = action.payload;
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default videoSlice.reducer;