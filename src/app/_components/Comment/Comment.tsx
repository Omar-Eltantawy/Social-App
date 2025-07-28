import { CommentI, CommentState } from '@/lib/types'
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

interface CommentProps {
    comment:CommentI 
}

const Comment = ({comment}:CommentProps) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={comment?.commentCreator.photo} />
        }
        title={comment?.commentCreator?.name}
        subheader={new Date(comment?.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary',fontSize: '1rem' }}>
          {comment?.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Comment
