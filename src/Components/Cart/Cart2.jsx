import React, { useContext } from 'react';
import './Cart2.scss';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import cartimg1 from '../../Assets/Products/image (1).png';
import cartimg2 from '../../Assets/Products/image (2).png';
import MyContext from '../../Common/Context/MyContext';



const Cart = () => {


    const { cartOpen,togglecart,togglecheckout} = useContext(MyContext);
   
    const drawerwidth = window.innerWidth>786;


    return (

        <>
           
            <Drawer
                open={cartOpen}
                onClose={togglecart}
                direction='right'
                size={drawerwidth?'48%':'100%'}>


                <div className='cart-main'>
                    <button onClick={togglecart} className='x-btn' >  &#10006; </button>
                    <h2>Cart</h2>
                </div>

                <div className='item'>
                    <div className='img-part'>
                        <img src={cartimg1} alt="" />
                    </div>
                    <div className='info-part'>
                        <h5>Luxe Armchair - Left Arm Chute</h5>
                        <p>Ultra-functional and elegantly minimalist, our Luxe Armchair Collection draws inspirat</p>
                        <h4>$899.00</h4>
                        <div className="cols">
                            <div className='clrs'>
                                <span className='clr'></span>
                                <span className='clr clr2'></span>

                            </div>
                            <span className='quantity'>
                                1
                            </span>
                        </div>
                    </div>

                </div>

                <div className='item'>
                    <div className='img-part'>
                        <img src={cartimg2} alt="" />
                    </div>
                    <div className='info-part'>
                        <h5>Round Terra Marble Center Table</h5>
                        <p>Ultra-functional and elegantly minimalist, our Luxe Armchair Collection draws inspirat</p>
                        <h4>$545.00</h4>
                        <div className="cols">
                            <div className='clrs'>
                                <span className='clr'></span>
                                <span className='clr clr2'></span>

                            </div>
                            <span className='quantity'>
                                1
                            </span>
                        </div>
                    </div>

                </div>

                
                    

                <button className="next" onClick={togglecheckout}>Next</button>
            </Drawer>
        </>

    )
}

export default Cart
