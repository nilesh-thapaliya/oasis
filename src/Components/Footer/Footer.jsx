import React from 'react'
import './Footer.scss'
import footlogo from '../../Assets/Home/Logo.png'
import { useNavigate } from 'react-router-dom';


const Footer = () => {

    const navigate = useNavigate();

    return (
        <footer className='footer-main'>
           <section className='footer-box'>

            <div className="box1 box">
                <img src={footlogo} alt="" />
                <span>
                    <h5 onClick={() => navigate(`/`)}>Home</h5> /
                    <h5 onClick={() => navigate(`/blog`)}>Blog </h5> /
                    <h5>Sale</h5> /
                    <h5>About Us</h5> 
                    </span>
            </div>
            <div className="box2 box">
                    <h5>Contact Us</h5>
                    <p>+1 999 888-76-54</p>

                    <h5>Email</h5>
                    <p>hello@logoipsum.com</p>

            </div>
            <div className="box3 box">
                <h5>Address</h5>
                <p>2118 Thornridge Cir. Syracuse, Connecticut 35624</p>

                <h5>Opening hours</h5>
                <p>9am—6pm</p>
            </div>
            <div className="box4 box">
                <p>© 2024 — Copyright</p>

            </div>
           </section>
        </footer>
    )
}

export default Footer
