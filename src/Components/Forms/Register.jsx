import React, { useContext, useState } from 'react';
import './Register.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import img2 from '../../Assets/Forms/Squircle (1).png';
import MyContext from '../../Common/Context/MyContext';
import axios from 'axios';
import { Alert, CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


const Register = () => {

    const { registeropen, toggleregister, togglelogin } = useContext(MyContext);
    const drawerwidth = window.innerWidth > 786;

    const [loader, setLoader] = useState(false);
    const [snakopen, Setsnakopen] = useState(false);
    const [msg, setMsg] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {

        if (!isChecked) {
            
            Setsnakopen(true);
            setMsg("Please accept the terms and conditions.");
            return;
        }
        try {
            setLoader(true)
            const response = await axios.post('http://oasis-backend-three.vercel.app/register', values)
            const data = response.data

            if (data.success) {
                Setsnakopen(true)
                setMsg(data.message)
                resetForm()
                toggleregister()
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
                open={registeropen}
                onClose={toggleregister}
                direction='right'
                size={drawerwidth ? '48%' : '100%'}

            >
                <div className='reg-container'>
                    <div className='img-box'>
                        <button className='x-btn' onClick={toggleregister} >  &#10006; </button>
                        <h2>Create an acount</h2>
                        <img src={img2} alt="img" />


                    </div>
                    {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
                    <section className='reg-box'>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                password: '',
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string()
                                    .min(8, '*Password must be at least 8 chars')
                                    .required('*password is required'),
                                name: Yup.string()
                                    .required('*name is required'),
                                email: Yup.string()
                                    .email('*Enter a valid email')
                                    .required('*Email is required'),
                            })}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form className='regfrm'>
                                    <h5>Let's get your account set up</h5>
                                    <Field
                                        name="name"
                                        placeholder='Name'
                                        type="name"
                                        className="fields" />
                                    {errors.name && touched.name ? <div className='err'>{errors.name}</div> : null}
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

                                    <button className='btnqwe' type="submit">Create acount</button>
                                </Form>
                            )}
                        </Formik>

                        <p className='or'>──────── OR ────────</p>
                        <div className="tc">
                            <input type="checkbox"
                                name="check"
                                id="check"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)} />
                            <p>I agree to the <u>Terms and Conditions</u> of <u>Furniture</u> and acknowledge the <u>Privacy Policy</u></p>
                        </div>
                        <p className='log'> <span>Already have an account? </span><span onClick={togglelogin}> Login</span></p>

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
                    severity={msg.match('successful') ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Register
