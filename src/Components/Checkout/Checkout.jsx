import React, { useContext } from 'react'
import './Checkout.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import MyContext from '../../Common/Context/MyContext';

const Checkout = () => {

const {togglecheckout,checkoutopen,togglelogin,togglepayment} = useContext(MyContext);
    const drawerwidth = window.innerWidth>786;
  return (
    <div>
      
      <Drawer
                open={checkoutopen}
                onClose={togglecheckout}
                direction='right'
                size={drawerwidth?'48%':'100%'}         
            >
                <div className='ch-container'>
                    <div className='top-box'>
                        <button className='x-btn' onClick={togglecheckout} >  &#10006; </button>
                        <h2>Checkout</h2>
                    </div>

                    <section className='ch-box'>
                        <Formik
                            initialValues={{
                                email: '',
                                firstname: '',
                                lastnamename: '',
                                mobile: '+1',
                                address: '',
                               
                            }}
                            validationSchema={Yup.object().shape({
                                
                                firstname: Yup.string()                                
                                    .required('*First Name is required'),
                                lastname: Yup.string()                       
                                    .required('*Last Name is required'),
                                    mobile: Yup.string()
                                    .required('*Mobile no. is required')
                                    .min(10, 'Mobile no. must be at least 10 nums'),
                                address: Yup.string()                               
                                    .required('*Address is required'),
                                email: Yup.string()
                                    .email('*Enter a valid email')
                                    .required('*Email is required'),
                            })}
                            onSubmit={values => {
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='chfrm'>
                                    <h5 className='c-info'>Customer Information</h5>
                                    <p className='log'> <span>Have an account? </span><span onClick={togglelogin}> Login</span></p>

                                    <Field 
                                    name="email" 
                                    placeholder='Email'
                                    type="email" 
                                    className="fields" />
                                    {errors.email && touched.email ? <div className='err'>{errors.email}</div> : null}
                                    
                                    <h5 className='si'>Shipping Address</h5>
                                   
                                    <Field 
                                    name="firstname" 
                                    placeholder='First Name'                                    
                                    className="fields" />
                                    {errors.firstname && touched.firstname ? <div className='err'>{errors.firstname}</div> : null}

                                    <Field 
                                    name="lastname" 
                                    placeholder='Last Name'
                                    className="fields" />
                                    {errors.lastname && touched.lastname ? <div className='err'>{errors.lastname}</div> : null}

                                    <Field 
                                    name="mobile" 
                                    placeholder='Mobile No.'                                 
                                    className="fields" />
                                    {errors.mobile && touched.mobile ? <div className='err'>{errors.mobile}</div> : null}

                                    <Field 
                                    name="address" 
                                    placeholder='Address'                                  
                                    className="fields" />
                                    {errors.address && touched.address ? <div className='err'>{errors.address}</div> : null}

                                 <div className="last-fields">
                                 <Field 
                                    name="city" 
                                    placeholder='City'                                 
                                    className="fields lst" />
                                   
                                    <Field 
                                    name="country" 
                                    placeholder='Country'                                  
                                    className="fields lst" />
                                   
                                 </div>
                                    <button className='btnqwe' type="submit" onClick={togglepayment}>Proceed to payment</button>
                                </Form>
                            )}
                        </Formik>

                      
                    </section>
                </div>




            </Drawer>

    </div>
  )
}

export default Checkout
