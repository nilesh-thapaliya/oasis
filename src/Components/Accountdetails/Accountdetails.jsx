import React, { useContext, useState } from 'react'
import './Accountdetails.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Alert, CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MyContext from '../../Common/Context/MyContext';
const Accountdetails = () => {

    const [edit, setEdit] = useState(false)
    const [info, setInfo] = useState(true)
    const [loader, setLoader] = useState(false);
    const [snakopen, Setsnakopen] = useState(false);
    const [msg, setMsg] = useState('');
    const{acdetail, setAcdetail,setToken,token} =useContext(MyContext)

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoader(true)
            const {data} = await axios.post('https://oasis-backend-three.vercel.app/update-acdetails', values,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    },
               })

            if (data.success) {
                Setsnakopen(true)
                setMsg(data.message)
                setEdit(false)

                setAcdetail(data.accountInfo)  
                sessionStorage.setItem('account',JSON.stringify(data.accountInfo))

                setToken(data.tokendata)
                sessionStorage.setItem('token', data.tokendata)
                setInfo(true)
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
            {info && <div className='info1'>
                <h2>acount information</h2> <br />

                <p><b>Name : </b> {acdetail.name}</p>
                <p><b>Email : </b>{acdetail.email}</p>
                <p><b>Password : </b> *********</p>
                <button onClick={() => setEdit(!edit) || setInfo(!info)} >Edit</button>

            </div>}
            {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
            {edit && <div className='reg-box'>
                <Formik
                    initialValues={{
                        email: `${acdetail.email}`,
                        name:  `${acdetail.name}`,
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
                            <h5>Update your information</h5>
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
                                placeholder='update your Password'
                                className="fields" />
                            {errors.password && touched.password ? (
                                <div className='err'>{errors.password}</div>
                            ) : null}

                            <button className='btnqwe' type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snakopen}
                autoHideDuration={3000}
                onClose={() => Setsnakopen(false)}>
                <Alert
                    onClose={() => Setsnakopen(false)}
                    severity={msg.match('updated') ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Accountdetails
