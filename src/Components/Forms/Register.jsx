import React, { useContext } from 'react';
import './Register.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import img2 from '../../Assets/Forms/Squircle (1).png';
import MyContext from '../../Common/Context/MyContext';

const Register = () => {
   
    const { registeropen,toggleregister,togglelogin} = useContext(MyContext);
    const drawerwidth = window.innerWidth>786;
    return (
        <>
           
            <Drawer
                open={registeropen}
                onClose={toggleregister}
                direction='right'
                size={drawerwidth?'48%':'100%'}
              
            >
                <div className='reg-container'>
                    <div className='img-box'>
                        <button className='x-btn' onClick={toggleregister} >  &#10006; </button>
                        <h2>Create an acount</h2>
                        <img src={img2} alt="img" />


                    </div>

                    <section className='reg-box'>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={Yup.object().shape({
                                password: Yup.string()
                                    .min(8, '*Password must be at least 8 chars')
                                    .matches((/^([^0-9]*)$/), "*dont't allow Numeric Value")
                                    .required('*password is required'),
                                email: Yup.string()
                                    .email('*Enter a valid email')
                                    .required('*Email is required'),
                            })}
                            onSubmit={values => {
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='regfrm'>
                                    <h5>Let's get your account set up</h5>
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
                                    className="fields"  />
                                    {errors.password && touched.password ? (
                                        <div className='err'>{errors.password}</div>
                                    ) : null}
                                 
                                    <button className='btnqwe' type="submit">Create acount</button>
                                </Form>
                            )}
                        </Formik>

                        <p className='or'>──────── OR ────────</p>
                            <div className="tc">
                            <input type="checkbox" name="check" id="check" />
                           <p>I agree to the <u>Terms and Conditions</u> of <u>Furniture</u> and acknowledge the <u>Privacy Policy</u></p>
                            </div>
                           <p className='log'> <span>Already have an account? </span><span onClick={togglelogin}> Login</span></p>

                    </section>
                </div>




            </Drawer>

        </>
    )
}

export default Register
