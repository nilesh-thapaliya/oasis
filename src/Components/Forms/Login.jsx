import React, { useContext, useState } from 'react';
import './Login.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import logimg from '../../Assets/Forms/Squircle.png';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { FaApple, FaGoogle } from 'react-icons/fa6';
import MyContext from '../../Common/Context/MyContext';
import axios from 'axios';
import { Alert, CircularProgress, Snackbar } from '@mui/material';


const Login = () => {

    const [loader, setLoader] = useState(false)
    const [snakopen, Setsnakopen] = useState(false)
    const [msg, setMsg] = useState('')

    const { loginopen, togglelogin, toggleforget, toggleregister, setToken, setAcdetail,setCart, setOrder ,setShipping} = useContext(MyContext);

    const drawerwidth = window.innerWidth > 786;

    const handleLogin = async (values, { resetForm }) => {
        try {
            setLoader(true)
            const response = await axios.post('https://oasis-backend-three.vercel.app/login', values)
            const data = response.data

            if (data.success) {
                Setsnakopen(true)
                setMsg(data.message)

                setToken(data.tokendata)
                sessionStorage.setItem('token', data.tokendata)

                setAcdetail(data.accountInfo)  
                sessionStorage.setItem('account',JSON.stringify(data.accountInfo))
                  
                setShipping(data.shippingInfo)
                sessionStorage.setItem('shipping',JSON.stringify(data.shippingInfo))

                setOrder(data.orderInfo);
                sessionStorage.setItem('order', JSON.stringify(data.orderInfo));

                setCart(data.cartInfo)
                sessionStorage.setItem('cart', JSON.stringify(data.cartInfo))

                resetForm()
                togglelogin()
            } else {
                Setsnakopen(true)
                setMsg(data.error)
            }
            setLoader(false)

        } catch (error) {
            console.error('Error:', error);

        }
    };


    return (

        <>

            <Drawer
                open={loginopen}
                onClose={togglelogin}
                direction='right'
                size={drawerwidth ? '48%' : '100%'}
            >
                <div className='login-container'>
                    <div className='img-box'>
                        <button className='x-btn' onClick={togglelogin} >  &#10006; </button>
                        <h2>Login</h2>
                        <img src={logimg} alt="img" />


                    </div>
                    {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
                    <section className='login-box'>



                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string()
                                    .min(8, '*Password must be at least 8 chars')

                                    .required('*password is required'),
                                email: Yup.string()
                                    .email('*Enter a valid email')
                                    .required('*Email is required'),
                            })}
                            onSubmit={handleLogin}
                        >
                            {({ errors, touched }) => (
                                <Form className='lgfrm'>
                                    <h5>Welcome back </h5>

                                    <Field
                                        name="email"
                                        placeholder='Email'
                                        type="email"
                                        className="fields" />
                                    {errors.email && touched.email ? <div className='err'>{errors.email}</div> : null}
                                    <Field
                                        name="password"
                                        type='password'
                                        placeholder='Password'
                                        className="fields" />
                                    {errors.password && touched.password ? (
                                        <div className='err'>{errors.password}</div>
                                    ) : null}

                                    <p onClick={toggleforget} >Forget Password?</p>
                                    <button className='btnqwe' type="submit">Login</button>
                                </Form>
                            )}
                        </Formik>

                        <p className='or'>──────── OR ────────</p>

                        <button className='con-with'><FaGoogle /> Continue with Google</button>
                        <button className='con-with'><FaApple /> Continue with Apple</button>
                        <p className='create'> <span>First time here? </span><span onClick={toggleregister} >Create an account</span></p>

                    </section>
                </div>




            </Drawer>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snakopen}
                autoHideDuration={3000}
                onClose={() => Setsnakopen(false)}>
                <Alert
                    onClose={() => Setsnakopen(false)}
                    severity={msg.match('thanks') ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </>

    )
}

export default Login
