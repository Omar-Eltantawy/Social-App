import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CommentState } from "../types";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import toast from "react-hot-toast";


const initialState:CommentState={
    loading:false,
    content: null,
    post:null
}



// Async thunk for creating a comment
export const createComment= createAsyncThunk('commentSlice/createComment',async (comment:{ content: string; post: string },thunkAPI) => {
    try {
      const { data } = await axios.post(`https://linked-posts.routemisr.com/comments/`,comment,{
        headers:{
            token: getCookie('token') || ''
        }
      });
      console.log(data);
      return data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      console.log(error.response?.data?.error);
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Something went wrong');
    }
});

export const commentSlice=createSlice({
    name:"comment",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createComment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createComment.fulfilled,(state)=>{
            state.loading = false;
            toast.success("Your Comment Added Successfully");
        })
        .addCase(createComment.rejected,(state,action)=>{
            state.loading=false;
            toast.error(action.payload as string);
        })
    }
})

export const commentReducer = commentSlice.reducer;
