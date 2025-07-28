"use client";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Avatar, Typography, Card, CardContent, Container } from "@mui/material";
import { UserState } from "@/lib/types";
import { store } from "@/lib/Redux/store";
import { getUserPosts } from "@/lib/Redux/userSlice";
import Post from "@/app/_components/Post/Post";

const Profile = () => {
  const { user ,userPosts } = useSelector((state: { userReducer: UserState }) => state.userReducer);
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(()=>{
    if(user?._id && typeof user._id === 'string'){
      dispatch(getUserPosts(user._id));
    }
  },[user?._id, dispatch])


  if (!user) return null;

  return (
    <Container>
      <Box sx={{width:{md:'65%',xs:'95%'}, margin:'auto', marginBlock:4}}>
      <Card elevation={3} sx={{ borderRadius: 3, p: 4, textAlign: "center" }}>
        <Avatar
          alt={user.name}
          src={user.photo || ""}
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 2,
            border: "3px solid #1976d2",
          }}
        />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
        </CardContent>
      </Card>
      {userPosts && userPosts.length > 0 ? 
      (
        userPosts.map((post)=>(
          <Post key={post._id} post={post} isProfileView  />
        ))
      ):(
        <Typography variant="h2" textAlign="center" mt={4}>
          No posts to display.
        </Typography>
      )}
    </Box>
    </Container>
  );
};

export default Profile;
