"use client"
import { store } from '@/lib/Redux/store'
import { getUserData, userLogin} from '@/lib/Redux/userSlice'
import { UserState } from '@/lib/types'
import { Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'


const LoginForm = () => {
    const {loading} =useSelector((state:{userReducer:UserState})=>state.userReducer);
    const router=useRouter();
    const dispatch = useDispatch<typeof store.dispatch>();
    const initialValues = {
        email: '',
        password: '',
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
            dispatch(userLogin(values)).then((res)=>{
                if(res?.payload.message === "success"){
                    router.push('/');
                    dispatch(getUserData())
                }
            })
        }
    }
    )
  return (
     <Container>
        <Paper elevation={4}  sx={{width:{md:'65%',xs:'95%'} , margin:'auto',textAlign:'center', marginBlock:4, padding:2} }>
            <Typography component='h1' variant='h4'>
                Login Now
            </Typography>
            <Divider sx={{marginBlock:2}}/>
            <form onSubmit={formik.handleSubmit} style={{width:'100%'}}>
                <TextField onChange={formik.handleChange} value={formik.values.email} id="email-basic" label="User email" variant="outlined" sx={{width:'100%',marginTop:2}} name='email' type='email' />
                <TextField onChange={formik.handleChange} value={formik.values.password} id="password-basic" label="User password" variant="outlined" sx={{width:'100%',marginTop:2}} name='password' type='password' />

                <Button type='submit' variant="contained" sx={{width:'100%', marginTop:2, padding:2}}>
                    {loading? <LoaderIcon/> : "Login"}
                </Button>
            </form>
        </Paper>
    </Container>
  )
}

export default LoginForm
