import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice';
import { postReducer } from './PostSlice';
import { commentReducer } from './CommentSlice';


export const store = configureStore({
    reducer:{
        userReducer,
        postReducer,
        commentReducer
    }
});