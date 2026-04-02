import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewApi from "../../api/review";

const initialState = {
  reviewCreate: null,
  videoReviews: null,
  userReviews: null,
  ratingReviews: null,
  removeReview: null,
  isLoading: false,
  isError: false,
};

// create review
export const createReview = createAsyncThunk(
  "review/create",
  async (body, thunkApi) => {
    try {
      const response = await reviewApi.createReview(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get video reviews
export const getVideoReviews = createAsyncThunk(
  "review/video",
  async (videoId, thunkApi) => {
    try {
      const response = await reviewApi.getByVideo(videoId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get user reviews
export const getUserReviews = createAsyncThunk(
  "review/user",
  async (userId, thunkApi) => {
    try {
      const response = await reviewApi.getByUser(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get reviews by rating
export const getReviewsByRating = createAsyncThunk(
  "review/rating",
  async (rating, thunkApi) => {
    try {
      const response = await reviewApi.getByRating(rating);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// remove review
export const removeReview = createAsyncThunk(
  "review/remove",
  async (reviewId, thunkApi) => {
    try {
      const response = await reviewApi.removeReview(reviewId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // create review states
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewCreate = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // video reviews states
      .addCase(getVideoReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVideoReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.videoReviews = action.payload;
      })
      .addCase(getVideoReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // user reviews states
      .addCase(getUserReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userReviews = action.payload;
      })
      .addCase(getUserReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // rating reviews states
      .addCase(getReviewsByRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviewsByRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ratingReviews = action.payload;
      })
      .addCase(getReviewsByRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // remove review states
      .addCase(removeReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.removeReview = action.payload;
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default reviewSlice.reducer;