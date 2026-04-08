import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/User";

const initialState = {
  createUser: null,
infoAl:null,
  info: null,
  login: null,
  updateUser: null,
  isLoading: false,
  isError: false,
};

// create user

export const createUser = createAsyncThunk(
  "user/create",
  async ({body}, thunkApi) => {
    console.log(body)
    try {
      const response = await userApi.userCreate(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// get user by email
export const getUserByEmail = createAsyncThunk(
  "user/getByEmail",
  async ({email}, thunkApi) => {
    try {
      const response = await userApi.getByEmail(email);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// get user by user_id
export const getUserById = createAsyncThunk(
  "user/getById",
  async ({Id}, thunkApi) => {
    try {
      const response = await userApi.getByUserId(Id);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
// login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({body}, thunkApi) => {
    try {
      const response = await userApi.login(body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// update user
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userId, body }, thunkApi) => {
    try {
      const response = await userApi.updateUser(userId, body);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // create user states
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // get user states
      .addCase(getUserByEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.info = action.payload;
      })
      .addCase(getUserByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      //get by id

       // get user states
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.infoAl= action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      // login states
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.login = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })

      // update user states
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.updateUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export default userSlice.reducer;