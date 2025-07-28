import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserI, UserState } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteCookie, getCookie, setCookie } from "cookies-next/client";

const initialState: UserState = {
  loading: false,
  token: getCookie("token") || null,
  user: null,
  userPosts: null,
};

// Helper function for extracting error messages
export const extractErrorMessage = (err: unknown): string => {
  const error = err as { response?: { data?: { error?: string } } };
  return error.response?.data?.error || "Something went wrong";
};

// Async thunk for user registration
export const userRegister = createAsyncThunk(
  "userSlice/userRegister",
  async (values: UserI, thunkAPI) => {
    try {
      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signup", values);
      return data;
    } catch (err: unknown) {
      console.log(extractErrorMessage(err));
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Async thunk for user login
export const userLogin = createAsyncThunk(
  "userSlice/userLogin",
  async (values: UserI, thunkAPI) => {
    try {
      const { data } = await axios.post("https://linked-posts.routemisr.com/users/signin", values);
      return data;
    } catch (err: unknown) {
      console.log(extractErrorMessage(err));
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Async thunk for getting user data
export const getUserData = createAsyncThunk(
  "userSlice/getUserData",
  async (_: void, thunkAPI) => {
    try {
      const { data } = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
        headers: {
          token: getCookie("token") || "",
        },
      });
      return data;
    } catch (err: unknown) {
      console.log(extractErrorMessage(err));
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Async thunk for updating user photo
export const updateUserPhoto = createAsyncThunk(
  "userSlice/updateUserPhoto",
  async (formData: FormData, thunkAPI) => {
    try {
      const { data } = await axios.put("https://linked-posts.routemisr.com/users/upload-photo", formData, {
        headers: {
          token: getCookie("token") || "",
        },
      });
      console.log(data);
      return data;
    } catch (err: unknown) {
      console.log(extractErrorMessage(err));
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Async thunk for getting user posts
export const getUserPosts = createAsyncThunk(
  "userSlice/getUserPosts",
  async (id: string | undefined, thunkAPI) => {
    try {
      const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
        headers: {
          token: getCookie("token") || "",
        },
      });
      console.log(data);
      return data;
    } catch (err: unknown) {
      console.log(extractErrorMessage(err));
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

// Async thunk for deleting user posts
export const deleteUserSpecificPost = createAsyncThunk(
  "userSlice/deleteUserSpecificPost",
  async (id: string | undefined, thunkAPI) => {
    try {
      const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: {
          token: getCookie("token") || "",
        },
      });
      console.log(data);
      return data;
    } catch (err: unknown) {
      console.log(extractErrorMessage(err));
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

export const userslice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie("token");
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
        toast.success("Registration successful! You can now log in.");
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload as string);
      });

    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        console.log(state.token);
        setCookie("token", action.payload.token);
        toast.success("Login successful!");
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload as string);
      });

    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log(state.user);
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload as string);
      });

    builder
      .addCase(updateUserPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPhoto.fulfilled, (state) => {
        state.loading = false;
        toast.success("Photo updated successfully!");
      })
      .addCase(updateUserPhoto.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload as string);
      });

    builder
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload.posts;
        console.log(state.userPosts);
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload as string);
      });

    builder
      .addCase(deleteUserSpecificPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserSpecificPost.fulfilled, (state) => {
        state.loading = false;
        toast.success("Post deleted");
      })
      .addCase(deleteUserSpecificPost.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        toast.error(action.payload as string);
      });
  },
});

export const userReducer = userslice.reducer;
export const { logout } = userslice.actions;
