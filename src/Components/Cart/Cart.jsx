import React, { useContext } from 'react';
import './Cart.scss';

import 'react-modern-drawer/dist/index.css';
import cartimg from '../../Assets/Cart/Squircle.png';
import { useNavigate } from 'react-router-dom';
import MyContext from '../../Common/Context/MyContext';



const Cart1 = () => {
    const Navigate = useNavigate()
  const { togglecart} = useContext(MyContext)
  return (
   
       <>
          
                <div  className='cart-main'>
               
                    <p>Your cart is empty</p>
                    <img src={cartimg} alt="" />
                </div>
                
                <button className="shop" onClick={()=>Navigate('/categories') || togglecart() } > Shop All</button>
         
        </>
    
  )
}

export default Cart1
