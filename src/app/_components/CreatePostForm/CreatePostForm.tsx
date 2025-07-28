"use client"
import { PostsState, UserState } from '@/lib/types'
import { Avatar, Button, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { store } from '@/lib/Redux/store'
import { CreatePost } from '@/lib/Redux/PostSlice'
import Image from 'next/image'
import toast, { LoaderIcon } from 'react-hot-toast'
const CreatePostForm = () => {
    const {user} =useSelector((stote:{userReducer:UserState})=>stote.userReducer);
    const {loading} =useSelector((stote:{postReducer:PostsState})=>stote.postReducer);
    const [imgSrc,setImgSrc]=useState<string | null>(null)
    const dispatch =useDispatch<typeof store.dispatch>();
    const formik = useFormik({
        initialValues:{
        body:"",
        image:""
        },
        onSubmit: (values,{resetForm}) => {
            const hasBody = values.body.trim() !== "";
            const hasImage = !!values.image;

            if (hasBody || hasImage) {
                const formData = new FormData();
                formData.append('body', values.body);
                if (values.image) {
                    formData.append('image', values.image);
                }

                dispatch(CreatePost(formData)).then(() => {
                    resetForm();
                });
            } else {
                toast.error("Either body or image must be provided");
            }
        }
    })
    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.currentTarget.files?.[0]
        if (file) {
        formik.setFieldValue('image', file)
        setImgSrc(URL.createObjectURL(file))
        }
       
    }
  return (
    <Paper elevation={2} sx={{padding:2}}>
        <form onSubmit={formik.handleSubmit}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{marginBottom:2}}>
                <Avatar sx={{ bgcolor: red[500] }} src={user?.photo} />
                <Typography>Write a post</Typography>
            </Stack>
            <TextField name='body' id='body-input' onChange={formik.handleChange} sx={{width:'100%'}} multiline rows={5} maxRows={10} value={formik.values.body} />
            <input id='image-input' type="file" hidden name='image' onChange={handleImageChange} />
            <label htmlFor='image-input'>
                <IconButton component="span" color='primary' sx={{marginTop:2} }>
                    Upload Imge <FileUploadIcon sx={{marginLeft:1}} />
                </IconButton>
            </label>
            {imgSrc && (
                <Image
                    src={imgSrc}
                    alt="uploaded-image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: '300px', marginTop: '1rem',objectFit:'contain', borderRadius: '8px' }}
                />
                )}

            <Button type='submit' variant='contained' color='primary' sx={{marginTop:2}}>
                {loading ? <LoaderIcon/> : "Crate" }    
            </Button>
        </form>
    </Paper>
  )
}

export default CreatePostForm
