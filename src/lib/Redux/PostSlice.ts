import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostsState } from "../types";
import { getCookie } from "cookies-next/client";
import axios from "axios";
import toast from "react-hot-toast";
import { extractErrorMessage } from "./userSlice";

const initialState:PostsState={
    loading: false,
    posts:null
}



// Async thunk for getting all posts
export const getAllPosts= createAsyncThunk('postSlice/getAllPosts',async (_:void,thunkAPI) => {
    try {
      const { data } = await axios.get('https://linked-posts.routemisr.com/posts?limit=50',{
        headers:{
            token: getCookie('token') || ''
        }
      });
      return data;
    } catch (err: unknown) {
        console.log(extractErrorMessage(err));
        return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
});

// Async thunk for getting a specific post
export const getSpecificPost= createAsyncThunk('postSlice/getSpecificPost',async (id:string,thunkAPI) => {
    try {
      const { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
            token: getCookie('token') || ''
        }
      });
      return data;
    } catch (err: unknown) {
        console.log(extractErrorMessage(err));
        return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
});

// Async thunk for creating a post
export const CreatePost= createAsyncThunk('postSlice/CreatePost',async (formData:FormData,thunkAPI) => {
    try {
      const { data } = await axios.post(`https://linked-posts.routemisr.com/posts/`,formData,{
        headers:{
            token: getCookie('token') || ''
        }
      });
      console.log(data);
      return data;
    } catch (err: unknown) {
        console.log(extractErrorMessage(err));
        return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
});



export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle getting all posts
        builder.addCase(getAllPosts.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload.posts;
            console.log(state.posts);
            
        })
        .addCase(getAllPosts.rejected, (state) => {
            state.loading = false;
            state.posts = null;
        });
        // Handle getting a specific post
        builder.addCase(getSpecificPost.pending, (state) => {
            state.loading = true;
        })
        .addCase(getSpecificPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = [action.payload.post];
            console.log(state.posts);
        })
        .addCase(getSpecificPost.rejected, (state) => {
            state.loading = false;
            state.posts = null;
            
        });

        // Handle creating a post
        builder.addCase(CreatePost.pending, (state) => {    
            state.loading = true;
        })
        .addCase(CreatePost.fulfilled, (state) => { 
            state.loading = false; 
            toast.success("Post created successfully");
        })
        .addCase(CreatePost.rejected, (state, action) => {
            state.loading = false;
            toast.error(action.payload as string);
        });

    }
});


export const postReducer = postSlice.reducer;