import React, { useContext } from 'react';
import './Cart.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import cartimg from '../../Assets/Cart/Squircle.png';
import MyContext from '../../Common/Context/MyContext';


const Cart = () => {
    const { cartOpen,togglecart } = useContext(MyContext);
   
    const drawerwidth = window.innerWidth>786;
  
  return (
   
       <>
            <Drawer
                open={cartOpen}
                onClose={togglecart}
                direction='right'
                size={drawerwidth?'48%':'100%'}
                className=''
            >
                <div  className='cart-main'>
                <button onClick={toggleDrawer} className='x-btn' >  &#10006; </button>
                    <h2>Cart</h2>
                    <p>Your cart is empty</p>
                    <img src={cartimg} alt="" />
                </div>
                
                <button className="shop"> Shop All</button>
            </Drawer>
        </>
    
  )
}

export default Cart
