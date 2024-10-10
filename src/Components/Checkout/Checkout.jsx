import React, { useContext, useEffect, useState } from 'react'
import './Checkout.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import MyContext from '../../Common/Context/MyContext';
import { CircularProgress } from '@mui/material';
import axios from 'axios';

const Checkout = () => {

    const { togglecheckout, checkoutopen, togglepayment, setMsg, token, Setsnakopen, setShipping, shipping } = useContext(MyContext);
    const drawerwidth = window.innerWidth > 786;
    const [loader, setLoader] = useState()

    useEffect(() => {

        if (!token) {

            return
        }
        const fetchshipping = async () => {
            try {
                const { data } = await axios.get('http://oasis-backend-three.vercel.app/shipping-info', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })

                setShipping(data.shippingInfo)
                sessionStorage.setItem('shipping', JSON.stringify(data.shippingInfo))
            } catch (error) {
                alert('please try again')
            }
            finally {
                setLoader(false);
            }
        };

        fetchshipping();
    }, [setShipping, token]);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoader(true)
            const { data } = await axios.post('http://oasis-backend-three.vercel.app/shipping', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (data.success) {
                Setsnakopen(true)
                setMsg(data.message)

                setShipping(data.shippingInfo)
                sessionStorage.setItem('shipping', JSON.stringify(data.shippingInfo))

                resetForm()
                togglepayment()


            } else {
                Setsnakopen(true)
                setMsg(data.error)
            }
            setLoader(false)

        } catch (error) {
            console.error('Error:', error);

        }
    };
   // Initial values for the form
   const initialValues = shipping && shipping.length > 0
   ? {
       email: shipping[0].email,
       firstname: shipping[0].firstname,
       lastname: shipping[0].lastname,
       mobile: shipping[0].mobile,
       address: shipping[0].address,
       city: shipping[0].city,
       country: shipping[0].country,
   }
   : {
       email: '',
       firstname: '',
       lastname: '',
       mobile: '',
       address: '',
       city: '',
       country: '',
   };

    return (
        <div>
            {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}

            <Drawer
                open={checkoutopen}
                onClose={togglecheckout}
                direction='right'
                size={drawerwidth ? '48%' : '100%'}
            >
                <div className='ch-container'>
                    <div className='top-box'>
                        <button className='x-btn' onClick={togglecheckout} >  &#10006; </button>
                        <h2>Checkout</h2>
                    </div>

                    <section className='ch-box'>
                        <Formik
                            initialValues={initialValues}
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
                            onSubmit={handleSubmit}
                            enableReinitialize={true} 
                        >
                            {({ errors, touched }) => (
                                <Form className='chfrm'>
                                    <h5 className='c-info'>Customer Information</h5>


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
                                    <button className='btnqwe' type="submit" >Proceed to payment</button>
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
