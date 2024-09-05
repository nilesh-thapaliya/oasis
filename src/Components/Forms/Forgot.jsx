import React, { useContext } from 'react';
import './Forgot.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import img1 from '../../Assets/Forms/Squircle (2).png';
import MyContext from '../../Common/Context/MyContext';


const Forgot = () => {

    const { forgetopen,toggleforget,togglelogin} = useContext(MyContext);
    const drawerwidth = window.innerWidth>786;
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

                    <section className='forget-box'>
                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={Yup.object().shape({
                               
                                email: Yup.string()
                                    .email('*Enter a valid email')
                                    .required('*Email is required'),
                            })}
                            onSubmit={values => {
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='frfrm'>
                                    <h5>Enter your email and we'll send a link to reset your password </h5>
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
