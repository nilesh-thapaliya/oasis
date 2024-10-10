import React, { useState } from 'react'
import MyContext from './MyContext'

const MyContextProvider = ({ children }) => {

    const [cartOpen, setCartOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);
    const [upopen, setUpopen] = useState(false);
    const [checkoutopen, setCheckoutopen] = useState(false);
    const [paymentopen, setPaymentopen] = useState(false);
    const [confirmopen, setConfirmopen] = useState(false);
    const [loginopen, setLoginopen] = useState(false);
    const [forgetopen, setForgetopen] = useState(false);
    const [registeropen, setRegisteropen] = useState(false);


    const togglecart = () => {
        setCartOpen((prevState) => !prevState)

    };
    const toggleorder = () => {
        setOrderOpen((prevState) => !prevState)
            setUpopen(false)
    };

    const toggleUp = () => {
        setUpopen((prevState) => !prevState)

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

// loading spinner & snackbar
const [loader, setLoader] = useState(false);
const [snakopen, Setsnakopen] = useState(false);
const [msg, setMsg] = useState('');



    const [token, setToken] = useState(() => {
        const storetoken = sessionStorage.getItem('token')
        return storetoken ? storetoken : ''
      })

      const [acdetail, setAcdetail] = useState(() => {
        const storeacd = sessionStorage.getItem('account')
        return storeacd ? JSON.parse(storeacd) : null
      })
    
      const [cart, setCart] = useState(() => {
        const storecart = sessionStorage.getItem('cart')
        return storecart ? JSON.parse(storecart) : []
      })

      const [shipping, setShipping] = useState(() => {
        const storeshipping = sessionStorage.getItem('shipping')
        return storeshipping ? JSON.parse(storeshipping) : []
      })

      const [order, setOrder] = useState(() => {
        const storeod = sessionStorage.getItem('order')
        return storeod ? JSON.parse(storeod) : [];
      })
    

      const deletetoken = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('cart');
        sessionStorage.removeItem('shipping');
        sessionStorage.removeItem('order');
    
        setToken('')
        setCart('')
        setShipping('')
        setOrder('')
    
      }

  



    return (


        <MyContext.Provider value={{orderOpen,toggleorder,order, setOrder,shipping, setShipping,cart, setCart,loader, setLoader,snakopen, Setsnakopen,msg, setMsg,acdetail, setAcdetail,deletetoken,token, setToken,toggleUp,upopen,togglecart, cartOpen, togglecheckout, checkoutopen, paymentopen, togglepayment, toggleconfirm, confirmopen, togglelogin, loginopen, toggleforget, forgetopen, toggleregister, registeropen }}>

            {children}

        </MyContext.Provider>
    )
}

export default MyContextProvider
