import React, { useContext } from 'react'
import './Payment.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import MyContext from '../../Common/Context/MyContext';

const Payment = () => {

   const {togglepayment,paymentopen,toggleconfirm} = useContext(MyContext);

    const drawerwidth = window.innerWidth>786;

  return (
    <div>
      <Drawer
                open={paymentopen}
                onClose={togglepayment}
                direction='right'
                size={drawerwidth?'48%':'100%'}         
            >
                <div className='pm-container'>
                    <div className='top-box'>
                        <button className='x-btn' onClick={togglepayment} >  &#10006; </button>
                        <h2>Payment</h2>
                    </div>

                    <section className='pm-box'>
                        <Formik
                            initialValues={{
                                cardnumber: '',
                                expdate: '',
                                cvv: '',
                                cardname: '',
                               
                            }}
                            validationSchema={Yup.object().shape({
                                
                                cardnumber: Yup.string()                                
                                    .required('*card Number is required'),
                                expdate: Yup.string()                       
                                    .required('*Exp.date is required'),
                                    cardname: Yup.string()                               
                                    .required('*cardname is required'),
                                cvv: Yup.string()
                                    .required('*cvv is required'),
                            })}
                            onSubmit={values => {
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className='pmfrm'>
                                  
                                    <Field 
                                    name="cardnumber" 
                                    placeholder='Card number'                                    
                                    className="fields" />
                                    {errors.cardnumber && touched.cardnumber ? <div className='err'>{errors.cardnumber}</div> : null}

                                  

                                 <div className="card-fields">
                                 <Field 
                                    name="expdate" 
                                    placeholder='Exp.date'                                 
                                    className="fields" />
                                    {errors.expdate && touched.expdate ? <div className='err'>{errors.expdate}</div> : null}

                                    <Field 
                                    name="cvv" 
                                    placeholder='CVV'                                  
                                    className="fields" />
                                    {errors.cvv && touched.cvv ? <div className='err cverr'>{errors.cvv}</div> : null}
                                   
                                 </div>

                                 <Field 
                                    name="cardname" 
                                    placeholder='Card number'                                    
                                    className="fields" />
                                    {errors.cardname && touched.cardname ? <div className='err'>{errors.cardname}</div> : null}

                                    <span className='add-box'>
                                    <input type="checkbox"/> Use shipping address as billing address
                                    </span>
                                    
                                    <span className='rem-box'>
                                        <h5>Remember me</h5>
                                       <span>
                                       <input type="checkbox" />Save my information for faster checkout
                                        </span>   
                                    </span>
                                    

                                    <button className='btnqwe' type="submit" onClick={toggleconfirm}>Pay Now</button>
                                </Form>
                            )}
                        </Formik>

                      
                    </section>
                </div>




            </Drawer>


    </div>
  )
}

export default Payment
