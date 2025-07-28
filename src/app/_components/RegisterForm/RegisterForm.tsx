"use client"
import { store } from '@/lib/Redux/store'
import { userRegister } from '@/lib/Redux/userSlice'
import { UserState } from '@/lib/types'
import { Button, Container, Divider, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'


const RegisterForm = () => {
    const {loading} =useSelector((state:{userReducer:UserState})=>state.userReducer);
    const router=useRouter();
    const dispatch = useDispatch<typeof store.dispatch>();
    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        dateOfBirth:'',
        gender:''
    }
    const formik = useFormik({
        initialValues,
        onSubmit:async (values)=>{
            const allFilled = Object.values(values).every(
                (val) => typeof val === 'string' ? val.trim() !== '' : val !== ''
            );
            if (!allFilled) {
                toast.error("All fields must be filled.");
                return;
            }
            console.log(values);
            dispatch(userRegister(values)).then((res)=>{
                if(res?.payload.message === "success"){
                    router.push('/login');
                }
            })
        }
    }
    )
  return (
     <Container>
        <Paper elevation={4}  sx={{width:{md:'65%',xs:'95%'} , margin:'auto',textAlign:'center', marginBlock:4, padding:2} }>
            <Typography component='h1' variant='h4'>
                Register Now
            </Typography>
            <Divider sx={{marginBlock:2}}/>
            <form onSubmit={formik.handleSubmit} style={{width:'100%'}}>
                <TextField onChange={formik.handleChange} value={formik.values.name}  id="date-basic" label="User name" variant="outlined" sx={{width:'100%',marginTop:2}} name='name' type='text' />
                <TextField onChange={formik.handleChange} value={formik.values.email} id="email-basic" label="User email" variant="outlined" sx={{width:'100%',marginTop:2}} name='email' type='email' />
                <TextField onChange={formik.handleChange} value={formik.values.password} id="password-basic" label="User password" variant="outlined" sx={{width:'100%',marginTop:2}} name='password' type='password' />
                <TextField onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword-basic" label="User rePassword" variant="outlined" sx={{width:'100%',marginTop:2}} name='rePassword' type='password' />

                <Grid container sx={{marginTop:2}} spacing={2}>
                    <Grid size={10}>
                        <TextField onChange={formik.handleChange}  value={formik.values.dateOfBirth} id="date-basic"  variant="outlined" sx={{width:'100%'}} name='dateOfBirth' type='date' />
                    </Grid>
                    <Grid size={2}>
                        <Select onChange={formik.handleChange} value={formik.values.gender} id="gender-select" name='gender' sx={{width:'100%'}}>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Button type='submit' variant="contained" sx={{width:'100%', marginTop:2, padding:2}}>
                    {loading? <LoaderIcon/> :"Register"}
                </Button>
            </form>
        </Paper>
    </Container>
  )
}

export default RegisterForm
