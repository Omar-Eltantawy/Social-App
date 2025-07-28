"use client"
import { getAllPosts } from '@/lib/Redux/PostSlice';
import { store } from '@/lib/Redux/store';
import { PostsState } from '@/lib/types';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import Loading from '../loading/Loading';

const AllPosts = () => {
    const {posts , loading } =useSelector((state:{postReducer:PostsState})=>state.postReducer);
    const dispatch = useDispatch<typeof store.dispatch>();
    console.log(posts);
    console.log(loading);
    
    useEffect(()=>{
        dispatch(getAllPosts());
    },[])
    if(loading){
        return <Loading/>
    }
  return (
    <>        
        {posts?.map((post)=>(
            <Post key={post._id} post={post}/>
        ))}
    </>
  )
}

export default AllPosts
