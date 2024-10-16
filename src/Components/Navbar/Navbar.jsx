import React, { useContext, useState } from 'react'
import './Navbar.scss'
import klogo from '../../Assets/Home/Logo2.png'
import { RiShoppingCartLine } from 'react-icons/ri'
import { IoMenu } from 'react-icons/io5'
import MyContext from '../../Common/Context/MyContext'
import { useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'

const Navbar = () => {

    const {togglecart,togglelogin,token,toggleUp,acdetail ,cart} = useContext(MyContext);
    
    const [menu,setMenu]= useState(false);

    const navigate = useNavigate();

    const trigger =()=>{
        setMenu(!menu);

    }

    return (
        <>
            <nav className='nav-box'>

                <div className="left">
                    <img src={klogo} onClick={() => navigate(`/`)} alt="" />
                </div>

                <div className="center">
                    <ul>
                        <li onClick={() => navigate(`/`)}>Home</li>
                        <li onClick={() => navigate(`/all`)}>Shop</li>
                        <li onClick={() => navigate(`/categories`)} >Categories</li>
                        <li onClick={() => navigate(`/blog`)}>Blog</li>
                    </ul>
                </div>

                <div className="right">
                    <li onClick={togglecart}><RiShoppingCartLine /> <p className='notif'>{cart &&cart.length >0 ? cart.length : null}</p>  </li>

       {    token?   <button className="login usl" onClick={toggleUp}><CgProfile />{acdetail && acdetail.name}</button>  :   <button onClick={togglelogin} className="login">Get Started &#x2192;</button>}
                </div>

                <li className='menu-icn' onClick={trigger}> <IoMenu /> </li>




            </nav>
     {  menu &&   <div className='menu-drawer'>
                <ul>
                    <li onClick={() => navigate(`/`)|| trigger()}>Home</li>
                    <li onClick={() => navigate(`/all`)|| trigger()} className='sp'>Shop</li>
                    <li onClick={() => navigate(`/categories`)|| trigger()}>Categories</li>
                    <li onClick={() => navigate(`/blog`)|| trigger()}>Blog</li>
                    <li onClick={togglecart}><RiShoppingCartLine /> <p className='notif'>{cart &&cart.length >0 ? cart.length : null}</p>  </li>
                </ul>
                {    token?   <button className="login usl" onClick={toggleUp}><CgProfile />{acdetail && acdetail.name.split(' ')[0]}</button>  :   <button onClick={togglelogin} className="login">Get Started &#x2192;</button>}
            </div>}
            </>
    )
}

export default Navbar
