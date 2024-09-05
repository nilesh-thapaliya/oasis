import React, { useContext} from 'react';
import './Login.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import logimg from '../../Assets/Forms/Squircle.png';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { FaApple, FaGoogle } from 'react-icons/fa6';
import MyContext from '../../Common/Context/MyContext';

const Login = () => {


  const { loginopen,togglelogin,toggleforget,toggleregister } = useContext(MyContext);

  const drawerwidth = window.innerWidth>786;

    return (

        <>
           
            <Drawer
                open={loginopen}
                onClose={togglelogin}
                direction='right'
                size={drawerwidth?'48%':'100%'}
            >
                <div className='login-container'>
                    <div className='img-box'>
                        <button className='x-btn' onClick={togglelogin} >  &#10006; </button>
                        <h2>Login</h2>
                        <img src={logimg} alt="img" />


                    </div>

                    <section className='login-box'>

                        

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
                                    className="fields"  />
                                    {errors.password && touched.password ? (
                                        <div className='err'>{errors.password}</div>
                                    ) : null}

                                    <p onClick={toggleforget} >Forget Password?</p>
                                    <button className='btnqwe' type="submit">Login</button>
                                </Form>
                            )}
                        </Formik>

                        <p className='or'>──────── OR ────────</p>

                           <button  className='con-with'><FaGoogle/> Continue with Google</button> 
                           <button className='con-with'><FaApple  /> Continue with Apple</button> 
                           <p className='create'> <span>First time here? </span><span onClick={toggleregister} >Create an account</span></p>

                    </section>
                </div>




            </Drawer>

        </>

    )
}

export default Login
