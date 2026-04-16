import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import followersApi from "../../api/Followers";

const initialState = {
  followerCreate: null,
  followers: null,
  following: null,
  checkFollowers:false,
  topChannels: [],
  removeFollowers: null,
  isLoading: false,
  isError: false,
};

// create follower
export const createFollowers = createAsyncThunk(
  "followers/create",
  async ({body}, thunkApi) => {
    try {
      const response = await followersApi.createFollower(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
//check
export const checkFollowers = createAsyncThunk(
  "followers/checkFollowers",
  async ({body}, thunkApi) => {
    try {
      const response = await followersApi.checkFollower(body.user_id,body.fan_id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// get followers
export const getFollowers = createAsyncThunk(
  "followers/getFollowers",
  async ({userId}, thunkApi) => {
    try {
      const response = await followersApi.getByFollowers(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get following
export const getFollowing = createAsyncThunk(
  "followers/getFollowing",
  async ({userId}, thunkApi) => {
    try {
      const response = await followersApi.getByFollowing(userId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// remove following
export const removeFollowing = createAsyncThunk(
  "followers/removeFollowing",
  async ({ userId, fanId }, thunkApi) => {
    try {
      const response = await followersApi.removeFollow(userId, fanId);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// get top channels
export const getTopChannelsThunk = createAsyncThunk(
  "followers/getTopChannels",
  async (_, thunkApi) => {
    try {
      const response = await followersApi.getTopChannels();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // create follower states
      .addCase(createFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followerCreate = action.payload;
      })
      .addCase(createFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // followers states
      .addCase(getFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.followers = action.payload;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // following states
      .addCase(getFollowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.following = action.payload;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

        // checkFollowers
      .addCase(checkFollowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkFollowers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkFollowers = action.payload;
      })
      .addCase(checkFollowers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })


      // remove following states
      .addCase(removeFollowing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFollowing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.removeFollowers = action.payload;
      })
      .addCase(removeFollowing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      
      // top channels states
      .addCase(getTopChannelsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTopChannelsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topChannels = action.payload;
      })
      .addCase(getTopChannelsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default followersSlice.reducer;