"use client"
import { UserState } from '@/lib/types'
import { Avatar, Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { store } from '@/lib/Redux/store'
import { getUserData, updateUserPhoto } from '@/lib/Redux/userSlice'
import { LoaderIcon } from 'react-hot-toast'
const UpdatePhoto = () => {
    const {user,loading} =useSelector((stote:{userReducer:UserState})=>stote.userReducer);
    const dispatch =useDispatch<typeof store.dispatch>();
    const formik = useFormik({
        initialValues:{
        photo:""
        },
        onSubmit: (values,{resetForm}) => {
            console.log(values);
            const formData = new FormData();
            if(values.photo){
                formData.append('photo', values.photo);
                dispatch(updateUserPhoto(formData)).then(()=>{
                resetForm();
                dispatch(getUserData())
                })
            }            
        }
    })
    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.files){
            console.log(e.currentTarget.files[0]);
            formik.setFieldValue('photo', e.currentTarget.files[0]);
        }
       
    }
  return (
    <Paper elevation={2} sx={{padding:2}}>
        <form onSubmit={formik.handleSubmit}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} sx={{marginBottom:2}}>
                <Avatar sx={{ bgcolor: red[500] }} src={user?.photo} />
                <Typography>Update Your photo</Typography>
            </Stack>
            <input id='photo-input' type="file" hidden name='photo' onChange={handleImageChange} />
            <label htmlFor='photo-input'>
                <IconButton component="span" color='primary' sx={{marginTop:2} }>
                    Upload Imge <FileUploadIcon sx={{marginLeft:1}} />
                </IconButton>
            </label>
            <Button type='submit' variant='contained' color='primary' sx={{marginTop:2}}>
               {loading ? <LoaderIcon/>:"Update"} 
            </Button>
        </form>
    </Paper>
  )
}

export default UpdatePhoto
