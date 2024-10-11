import React, { useContext,  useState } from 'react'
import './Payment.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import MyContext from '../../Common/Context/MyContext';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
const Payment = () => {

   const {togglepayment,paymentopen,toggleconfirm,setCart, token,setMsg, Setsnakopen , setOrder} = useContext(MyContext);
   const [loader, setLoader] = useState()

    const drawerwidth = window.innerWidth>786;
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const orderdate = { orderdate: new Date().toISOString().split('T')[0] };
            setLoader(true)
            const { data } = await axios.post('https://oasis-backend-three.vercel.app/add2order-details', orderdate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (data.success) { 
                setCart(data.cartInfo);
                sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
                setOrder(data.orderInfo);
                sessionStorage.setItem('order', JSON.stringify(data.orderInfo));

                setMsg(data.message);
                Setsnakopen(true)
                resetForm()
                toggleconfirm()
            } else {
                setMsg(data.error);
                Setsnakopen(true)
            }
            setLoader(false)


        } catch (error) {
            console.error('Error:', error);

        }
    };

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
                    {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
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
                            onSubmit={handleSubmit     }
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
                                    placeholder='Card name'                                    
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
                                    

                                    <button className='btnqwe' type="submit" >Pay Now</button>
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
