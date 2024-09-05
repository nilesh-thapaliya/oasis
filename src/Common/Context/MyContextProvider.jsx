import React, { useState } from 'react'
import MyContext from './MyContext'
const MyContextProvider = ({ children }) => {

    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutopen, setCheckoutopen] = useState(false);
    const [paymentopen, setPaymentopen] = useState(false);
    const [confirmopen, setConfirmopen] = useState(false);
    const [loginopen, setLoginopen] = useState(false);
    const [forgetopen, setForgetopen] = useState(false);
    const [registeropen, setRegisteropen] = useState(false);


    const togglecart = () => {
        setCartOpen((prevState) => !prevState)

    };

    const toggleconfirm = () => {
        setConfirmopen((prevState) => !prevState)
        setCartOpen(false);
        setCheckoutopen(false);
        setPaymentopen(false);
    };
    const togglepayment = () => {
        setPaymentopen((prevState) => !prevState)
        setCartOpen(false);
        setCheckoutopen(false);
    };

    const togglecheckout = () => {
        setCheckoutopen((prevState) => !prevState)
        setCartOpen(false);

    };

    const togglelogin = () => {
        setLoginopen((prevState) => !prevState)
        setForgetopen(false);
        setRegisteropen(false);
        setCheckoutopen(false);
    };

    const toggleforget = () => {
        setLoginopen(false)
        setForgetopen((prevState) => !prevState)

    };

    const toggleregister = () => {
        setLoginopen(false);
        setRegisteropen((prevState) => !prevState)

    };



    return (


        <MyContext.Provider value={{togglecart, cartOpen, togglecheckout, checkoutopen, paymentopen, togglepayment, toggleconfirm, confirmopen, togglelogin, loginopen, toggleforget, forgetopen, toggleregister, registeropen }}>

            {children}

        </MyContext.Provider>
    )
}

export default MyContextProvider
