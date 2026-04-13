import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import videoApi from "../../api/VIdeo";

const initialState = {
  raVideo: [],
  cateVideo: [],
  userVideo: [],
  followingVideos: [],
  searchResult: [],
  recommendedVideos: [],
  removeVideo: null,
  updateVideo: null,
  isLoading: false,
  isError: false,
};

// get paginated videos
export const getPaginatedVideos = createAsyncThunk(
  "video/getPaginated",
  async ({ skip, limit, age }, thunkApi) => {
    try {
      const response = await videoApi.videoPaginated(skip, limit, age);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// search videos
export const searchVideos = createAsyncThunk(
  "video/search",
  async (query, thunkApi) => {
    try {
      const response = await videoApi.searchVideos(query);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get following feed
export const getFollowingFeed = createAsyncThunk(
  "video/followingFeed",
  async (followerId, thunkApi) => {
    try {
      const response = await videoApi.followingFeed(followerId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get recommended videos
export const getRecommendedVideos = createAsyncThunk(
  "video/recommended",
  async ({ videoId, category, title }, thunkApi) => {
    try {
      const response = await videoApi.recommendedVideos(videoId, category, title);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// increment view count
export const incrementViewCountThunk = createAsyncThunk(
  "video/incrementView",
  async (videoId, thunkApi) => {
    try {
      const response = await videoApi.incrementView(videoId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
  async ({category}, thunkApi) => {
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
      return { videoId, data: response.data }; // Return videoId for immediate filtering
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
      return { videoId, body, data: response.data };
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

      // paginated videos (See More)
      .addCase(getPaginatedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        // Append unique videos to existing list
        const newVideos = action.payload.filter(
          (nv) => !state.raVideo.some((ev) => ev._id === nv._id)
        );
        state.raVideo = [...state.raVideo, ...newVideos];
      })

      // search result
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResult = action.payload;
      })

      // following feed
      .addCase(getFollowingFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followingVideos = action.payload;
      })

      // recommended videos
      .addCase(getRecommendedVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recommendedVideos = action.payload;
      })

      // category videos
      .addCase(getVideoByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cateVideo = action.payload;
      })

      // user videos
      .addCase(getVideoByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userVideo = action.payload;
      })

      // remove video (immediate reflection)
      .addCase(removeVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        const vid = action.payload.videoId;
        state.raVideo = state.raVideo.filter((v) => v._id !== vid);
        state.userVideo = state.userVideo.filter((v) => v._id !== vid);
        state.cateVideo = state.cateVideo.filter((v) => v._id !== vid);
      })

      // update video (immediate reflection)
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        const { videoId, body } = action.payload;
        const updateFunc = (v) => v._id === videoId ? { ...v, ...body } : v;
        state.raVideo = state.raVideo.map(updateFunc);
        state.userVideo = state.userVideo.map(updateFunc);
        state.cateVideo = state.cateVideo.map(updateFunc);
      });
  },
});

export default videoSlice.reducer;
