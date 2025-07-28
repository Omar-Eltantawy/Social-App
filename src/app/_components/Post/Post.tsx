"use client";
import { styled } from '@mui/material/styles';
import {
  Card, CardHeader, CardContent, CardActions, Collapse,
  Avatar, IconButton, Typography, Box, Divider,
  IconButtonProps,
  TextField,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { CommentState, PostI, UserState } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/lib/Redux/store';
import { deleteUserSpecificPost, getUserPosts } from '@/lib/Redux/userSlice';
import { useState } from 'react';
import { createComment } from '@/lib/Redux/CommentSlice';
import { getSpecificPost } from '@/lib/Redux/PostSlice';
import { LoaderIcon } from 'react-hot-toast';

interface PostProps {
  post: PostI;
  showComments?: boolean;
  isProfileView?: boolean; 
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})<ExpandMoreProps>(({ theme, expand }) => ({
  marginLeft: 'auto',
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Post({ post, showComments,isProfileView }: PostProps) {
  const { user} = useSelector((state: { userReducer: UserState }) => state.userReducer);
  const { loading} = useSelector((state: { commentReducer: CommentState }) => state.commentReducer);
  const [newComment, setNewComment] = useState('');
  const dispatch= useDispatch<typeof store.dispatch>()
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deletePost=()=>{
    dispatch(deleteUserSpecificPost(post._id)).then(()=>{
      if(user?._id && typeof user._id === 'string'){
        dispatch(getUserPosts(user._id));
      }
    })
  }
  const handleAddComment=()=>{
  
    dispatch(createComment({ content: newComment, post: post._id })).then(()=>{
      setNewComment("");
      dispatch(getSpecificPost(post?._id))
    })
  }

  return (
    <Card
      elevation={3}
      sx={{
        maxWidth: '100%',
        marginBlock: 2,
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} src={post?.user?.photo} />
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography fontWeight={600}>{post?.user?.name}</Typography>}
        subheader={new Date(post.createdAt).toLocaleString()}
      />

      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.body}
        </Typography>

        {post.image && (
          <Box sx={{ position: 'relative', height: { xs: 200, md: 400 }, borderRadius: 2, overflow: 'hidden' }}>
            <Image
              src={post?.image}
              alt={post.body}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
        )}
      </CardContent>

      <CardActions disableSpacing sx={{ px: 2, justifyContent: 'space-between' }}>
        <Box>
          <IconButton>
            <FavoriteIcon color="error" />
          </IconButton>

          <IconButton component={Link} href={`/post/${post._id}`}>
            <CommentIcon color="primary" />
          </IconButton>

          <IconButton>
            <ShareIcon />
          </IconButton>
        </Box>

        {isProfileView && (
          <IconButton onClick={deletePost}  sx={{ color: 'error.main' }}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>

        <Box sx={{ px: 2, pb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            rows={2}
          />
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleAddComment}>
            {loading?<LoaderIcon/>:"Comment"}
          </Button>
        </Box>

        {!showComments && post.comments.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            {/* Always show the first comment */}
            <Comment comment={post.comments[0]} />

            {/* Conditionally render the rest of the comments */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              {post.comments.slice(1).map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </Collapse>
          </>
        )}


      
      {showComments && post.comments.length > 0 && (
        post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      )}

     

    </Card>
  );
}
