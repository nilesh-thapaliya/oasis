import React, { useContext, useEffect, useState } from 'react';
import './Cart2.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import MyContext from '../../Common/Context/MyContext';
import axios from 'axios';
import { CircularProgress, Snackbar } from '@mui/material';
import Cart1 from './Cart.jsx'


const Cart = () => {

    const { cartOpen, togglecart, togglecheckout, token, cart, setCart, setMsg, Setsnakopen } = useContext(MyContext);
    const [loader, setLoader] = useState(true)
    const drawerwidth = window.innerWidth > 786;

    const cartvalue = cart && cart.reduce((a, b) => a + (b.productprice * b.quantity), 0)

    useEffect(() => {

        if (!token) {

            return
        }
        const fetchCartItems = async () => {
            try {
                const response = await fetch('https://oasis-backend-three.vercel.app/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setCart(data.cartInfo);
                sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
            } catch (error) {
                alert('please try again')
            }
            finally {
                setLoader(false);
            }
        };

        fetchCartItems();
    }, [setCart, token]);

    const handleIncrease = async (categoryid, productid, selectedcolor) => {
        try {
            setLoader(true)
            const { data } = await axios.post('https://oasis-backend-three.vercel.app/increase-Item', { categoryid, productid, selectedcolor }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (data.success) {
                sessionStorage.setItem('cart', JSON.stringify(data.cartInfo))
                setMsg(data.message)
                Setsnakopen(true)
                setCart(data.cartInfo)
            } else {
                setMsg(data.error)
                Setsnakopen(true)
            }

        } catch (error) {
            console.error('Error removing from cart:', error);
        } finally {
            setLoader(false)
        }
    }
    const handleDecrease = async (categoryid, productid, selectedcolor) => {
        try {
            setLoader(true)
            const { data } = await axios.post('https://oasis-backend-three.vercel.app/decrease-Item', { categoryid, productid, selectedcolor }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (data.success) {
                sessionStorage.setItem('cart', JSON.stringify(data.cartInfo))
                setMsg(data.message)
                Setsnakopen(true)
                setCart(data.cartInfo)
            } else {
                setMsg(data.error)
                Setsnakopen(true)
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        } finally {
            setLoader(false)
        }
    }

    const removeitem = async (categoryid, productid, selectedcolor) => {
        try {
            setLoader(true)
            const { data } = await axios.post('https://oasis-backend-three.vercel.app/remove-Item', { categoryid, productid, selectedcolor }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (data.success) {
                sessionStorage.setItem('cart', JSON.stringify(data.cartInfo))
                setMsg(data.message)
                Setsnakopen(true)
                setCart(data.cartInfo)
            } else {
                setMsg(data.error)
                Setsnakopen(true)
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        } finally {
            setLoader(false)
        }
    }

    if (loader) {
        <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>
    }

    return (

        <>

            <Drawer
                open={cartOpen}
                onClose={togglecart}
                direction='right'
                size={drawerwidth ? '48%' : '100%'}
                className='dr-main'

            >


                <div className='cart-main'>
                    <button onClick={togglecart} className='x-btn' >  &#10006; </button>
                    <h2>Cart</h2>

                </div>

                <div className='cart-scroll'>

                    {cart && cart.length > 0 ? (
                        <div >
                            {cart.map((item) => (
                                <>
                                    <div className='item'>
                                        <div className='img-part'>
                                            <img src={item.productimg} alt="" />
                                        </div>
                                        <div className='info-part'>
                                            <h5>{item.producttitle}</h5>
                                            <p>Ultra-functional and elegantly minimalist, our Luxe Armchair Collection draws inspirat</p>
                                            <h4>${item.productprice}</h4>
                                            <div className="cols">
                                                <div className='clrs'>
                                                    <span style={{ backgroundColor: `${item.selectedcolor}` }} className='clr'></span>

                                                </div>
                                                <span className='quantity'>
                                                    {item.quantity}
                                                </span>
                                                <button className='btn-inc dec' onClick={() => handleDecrease(item.categoryid, item.productid, item.selectedcolor)}>-</button>
                                                <button className='btn-inc ' onClick={() => handleIncrease(item.categoryid, item.productid, item.selectedcolor)}>+</button>
                                                <button className='btn-inc rmv' onClick={() => removeitem(item.categoryid, item.productid, item.selectedcolor)}>remove item</button>
                                            </div>
                                        </div>

                                    </div>

                                </>

                            ))
                            }
                        </div>) : (<><Cart1 /> </>)}

                </div>
                {cart && cart.length > 0 &&
                    <>
                        <div className="cart-summary">
                            <p>Total Items: {cart.length}</p>
                            <p>Total Price: ${cartvalue}</p>
                        </div>
                        <button className="next" onClick={togglecheckout} >Next</button>
                    </>

                }

            </Drawer>
            <Snackbar />
        </>

    )
}

export default Cart
