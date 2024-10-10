import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../../Common/Context/MyContext'
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './Orderdetails.scss'
import { CircularProgress } from '@mui/material';
const Orderdetails = () => {

    const { orderOpen, toggleorder, token, order, setOrder } = useContext(MyContext)
    const drawerwidth = window.innerWidth > 786;
    const [loader, setLoader] = useState(true)

    useEffect(() => {

        if (!token) {

            return
        }
        const fetchItems = async () => {
            try {
                const response = await fetch('http://oasis-backend-three.vercel.app/orderget', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                setOrder(data.orderInfo);
                sessionStorage.setItem('order', JSON.stringify(data.orderInfo));
            } catch (error) {
                alert('please try again')
            }
            finally {
                setLoader(false);
            }
        };

        fetchItems();
    }, [setOrder, token]);

    if (loader) {
        <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>
    }

    return (
        <div>

            <Drawer
                open={orderOpen}
                onClose={toggleorder}
                direction='right'
                size={drawerwidth ? '48%' : '100%'}
                className='od-dr'
            >
                <div className='cart-main'>
                    <button onClick={toggleorder} className='x-btn' >  &#10006; </button>
                    <h2>Orders</h2>

                </div>


                {order && order.length > 0 ? (
                    <>
                        {order.map((o) => (
                            <div className="order-item" >
                                <div className="pd-img">
                                    <img src={o.productimg} alt="" />
                                </div>
                                <div className="pdin">
                                    <h3>{o.producttitle}</h3>
                                    <p>color:<span className='clsa' style={{ backgroundColor: `${o.selectedcolor}` }}>---</span></p>
                                    <p>Price: ${o.productprice}</p>
                                    <p>Q: {o.quantity}</p>
                                    <p>Order Date: {o.orderdate}</p>
                                </div>
                                <div className="sts">
                                    <h3>order status </h3>
                                    <div style={{ backgroundColor: o.confirm === true && 'green' }}>confirmed</div>
                                    <div style={{ backgroundColor: o.shipped === true && 'green' }}>shipped</div>
                                    <div style={{ backgroundColor: o.deliverd === true && 'green' }}>deliverd</div>
                                </div>
                            </div>
                        ))
                        }
                    </>
                ) : (
                    <h2 className='nord'>No Order data</h2>
                )}


            </Drawer>
        </div>
    )
}

export default Orderdetails
