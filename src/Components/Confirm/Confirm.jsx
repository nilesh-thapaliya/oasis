
import React, { useContext } from 'react';
import './Confirm.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import conimg from '../../Assets/Confirm/Squircle.png';
import MyContext from '../../Common/Context/MyContext';
const Confirm = () => {

    const { confirmopen,toggleconfirm } = useContext(MyContext);

    const drawerwidth = window.innerWidth>786;


  return (
    <div>
      <Drawer
                open={confirmopen}
                onClose={toggleconfirm}
                direction='right'
                size={drawerwidth?'48%':'100%'}
                className=''
            >
                <div  className='con-main'>
                <button className='x-btn' >  &#10006; </button>
                  
                    <img src={conimg} alt="" />
                    <h5>Your Order is Confirmed!</h5>
                    <p>Thank you for shopping with us! Your beautiful new furniture is on its way and will be with you soon. Get ready to transform your space!</p>
                <button className="done" onClick={toggleconfirm}> Done </button>
                </div>
                
            </Drawer>
    </div>
  )
}

export default Confirm
