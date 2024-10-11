import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Resetpass.scss'
import MyContext from '../../Common/Context/MyContext';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CircularProgress } from '@mui/material';
const Resetpass = () => {

    const { togglelogin,setMsg,Setsnakopen} = useContext(MyContext);
    const [loader, setLoader] = useState()
    const Navigate = useNavigate()
    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoader(true)
            const response = await axios.post('https://oasis-backend-three.vercel.app/forgot-form', values)
            const data = response.data

           
            if (data.success) {
                Setsnakopen(true)
                setMsg(data.message)
                togglelogin()
                Navigate('/')
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
        <div className='ac-detail-main'>
              {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
              <div className='reg-box'>

             
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmpassword: '',
                  
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .min(8, '*Password must be at least 8 chars')
                        .required('*password is required'),
                     
                    confirmpassword: Yup.string()
                        .min(8, '*Password must be at least 8 chars')
                        .required('*password is required')
                        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    email: Yup.string()
                        .email('*Enter a valid email')
                        .required('*Email is required'),
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='regfrm'>
                        <h5>Reset your password</h5>
                       
                        <Field
                            name="email"
                            placeholder='Email'
                            type="email"
                            className="fields" />
                        {errors.email && touched.email ? <div className='err'>{errors.email}</div> : null}

                        <Field
                            name="password"
                            type='password'
                            placeholder='update your Password'
                            className="fields" />
                        {errors.password && touched.password ? (
                            <div className='err'>{errors.password}</div>
                        ) : null}
                        <Field
                            name="confirmpassword"
                            type='confirmpassword'
                            placeholder='Confirm Password'
                            className="fields" />
                        {errors.confirmpassword && touched.confirmpassword ? (
                            <div className='err'>{errors.confirmpassword}</div>
                        ) : null}

                        <button className='btnqwe' type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
            </div>

        </div>
    )
}

export default Resetpass
