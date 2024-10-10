import React, { useContext, useState } from 'react';
import './Forgot.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import img1 from '../../Assets/Forms/Squircle (2).png';
import MyContext from '../../Common/Context/MyContext';
import { CircularProgress } from '@mui/material';
import axios from 'axios';


const Forgot = () => {

    const { forgetopen,toggleforget,togglelogin,setMsg,Setsnakopen} = useContext(MyContext);
    const drawerwidth = window.innerWidth>786;
    const [loader,setLoader]=useState()

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoader(true)
            const response = await axios.post('http://oasis-backend-three.vercel.app/forgot', values)
            const data = response.data

            if (data.success) {
                Setsnakopen(true)
                setMsg(data.message)
                resetForm()

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
                open={forgetopen}
                onClose={toggleforget}
                direction='right'
                size={drawerwidth?'48%':'100%'}
              
            >
                <div className='fr-container'>
                    <div className='img-box'>
                        <button className='x-btn' onClick={toggleforget} >  &#10006; </button>
                        <h2>Forgot password</h2>
                        <img src={img1} alt="img" />


                    </div>
                    {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
                    <section className='forget-box'>
                        <Formik
                            initialValues={{
                                email: '',
                                name: '',
                            }}
                            validationSchema={Yup.object().shape({
                               
                                name: Yup.string()
                                    
                                    .required('*Name is required'),
                                email: Yup.string()
                                    .email('*Enter a valid email')
                                    .required('*Email is required'),
                            })}
                            onSubmit={handleSubmit }
                        >
                            {({ errors, touched }) => (
                                <Form className='frfrm'>
                                    <h5>Enter your email and we'll send a link to reset your password </h5>
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
                                    

                                 
                                    <button className='btnqwe' type="submit">Reset password</button>
                                </Form>
                            )}
                        </Formik>

                        <p className='or'>──────── OR ────────</p>

                           
                           <p className='log'> <span>Remember your password?</span><span onClick={togglelogin}>Back to login</span></p>

                    </section>
                </div>




            </Drawer>

        </>
    )
}

export default Forgot
