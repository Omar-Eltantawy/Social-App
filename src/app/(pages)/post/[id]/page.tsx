import SinglePost from '@/app/_components/SinglePost/SinglePost';
import React from 'react'

interface IdProps {
    params: Promise<{id: string}>
}

const page = async ({params}:IdProps) => {
    const {id} = await params; 
    console.log(id);
    
  return (
    <SinglePost id = {id} />
  )
}

export default page
