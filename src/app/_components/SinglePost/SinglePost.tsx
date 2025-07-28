"use client"
import { getSpecificPost } from '@/lib/Redux/PostSlice';
import { store } from '@/lib/Redux/store';
import { PostI, PostsState } from '@/lib/types';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import { Container } from '@mui/material';


interface SinglePostProps {
    id: string;
}
const SinglePost = ({id}:SinglePostProps) =>{
    const {posts} =useSelector((state:{postReducer:PostsState})=>state.postReducer);
    const dispatch = useDispatch<typeof store.dispatch>();
    console.log(posts);
    
    useEffect(()=>{
        dispatch(getSpecificPost(id));
    },[])

  return (
    <Container  sx={{width:{md:"60%",xs:"95%"} ,margin :'auto', marginTop: 3}}>
      {posts? <Post post={posts[0] as PostI} showComments={true} /> : <h1>Post not found</h1>}
    </Container>
  )
}

export default SinglePost
