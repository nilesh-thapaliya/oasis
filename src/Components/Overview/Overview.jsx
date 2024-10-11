import React, { useContext, useEffect, useState } from 'react';
// import Data from '../Categories/Data';
import './Overview.scss';
import { useParams } from 'react-router-dom';
import { PiShippingContainerBold } from 'react-icons/pi';
import { RiLeafLine } from 'react-icons/ri';
import Productslider from '../Productslider/Productslider';
import axios from 'axios';
import MyContext from '../../Common/Context/MyContext';
import Snackbarcom from '../Snackbar/Snackbar';
import { CircularProgress } from '@mui/material';

const Overview = () => {
    const { category, products } = useParams()
    const { togglelogin, setCart, token, setMsg, Setsnakopen,togglecart } = useContext(MyContext);
    const [data, setData] = useState([])
    const [loader, setLoader] = useState()


    const [selectedcolor, setSelectedcolor] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleclr = (color,productname) => {
        setSelectedcolor(color);
        setSelectedProduct(productname)
 document.getElementById('wrn').innerHTML = ''
    }
    useEffect(() => {
        axios.get('https://oasis-backend-three.vercel.app/category-api')
            .then(a => setData(a.data.data))
    },[])


    const addtocart = async (productimg, producttitle, productprice, productid, categoryid) => {
        if (!token) {
            setMsg('please login first')
            Setsnakopen(true)
            setTimeout(() => {
                togglelogin()
            }, (2000));
            return;

        }
        if (!selectedcolor || selectedProduct !== producttitle) {
            document.getElementById('wrn').innerHTML = '*please select any color' ;
            return;
        }

        setLoader(true)
        const { data } = await axios.post('https://oasis-backend-three.vercel.app/add-to-cart', { productimg, producttitle, productprice, productid, categoryid, selectedcolor}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (data.success) {
            sessionStorage.setItem('cart', JSON.stringify(data.cartInfo))
            setMsg(data.message)
            Setsnakopen(true)
            setCart(data.cartInfo)
            setSelectedcolor(null)
            togglecart()
          
        } else {
            setMsg(data.error)
            Setsnakopen(true)
        }
        setLoader(false)

    }
    return (

        <>

            <div className='ovr-main' >
                {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
                {
                    data
                        .filter(outer => outer.title === category)
                        .map((outterinfo) => {
                            return (
                                <>
                                    {
                                        outterinfo.product
                                            .filter(inner => inner.name === products)
                                            .map((innerinfo) => {
                                                return (
                                                    <>
                                                        <div className="images">

                                                            <img className='one' src={innerinfo.imagepath} alt="" />
                                                            <img src={innerinfo.pdimg1} alt="" />
                                                            <img src={innerinfo.pdimg2} alt="" />


                                                        </div>

                                                        <div className='info'>
                                                            <h2> {innerinfo.name} </h2>
                                                            <p className='ratiing'> {innerinfo.rating} </p>
                                                            <span className='prize'>
                                                                <p> ${innerinfo.prize}.00 &nbsp; <del style={{ color: 'grey' }}>${innerinfo.delprize}.00 </del> </p>
                                                                <p> {innerinfo.discount}% </p>
                                                            </span>

                                                            <p className="care">
                                                                Discover our alluring range of designs or plan an exclusive product according to your individual wishes.
                                                            </p>
                                                            <div className="cols">
                                                                <div className='clrs'>
                                                                    <span className='clr' onClick={() =>handleclr(innerinfo.color1,innerinfo.name)} style={{ backgroundColor: `${innerinfo.color1}`, border: selectedcolor === innerinfo.color1 ? '2px solid brown' : 'none' }}></span>
                                                                    <span className='clr' onClick={() =>handleclr(innerinfo.color2,innerinfo.name)} style={{ backgroundColor: `${innerinfo.color2}`, border: selectedcolor === innerinfo.color2 ? '2px solid brown' : 'none' }}></span>
                                                                    <p id='wrn'></p>
                                                                </div>
                                                                <span className='quantity'>
                                                                    1
                                                                </span>
                                                            </div>
                                                            <button onClick={() => addtocart(innerinfo.imagepath, innerinfo.name, innerinfo.prize, innerinfo.id, outterinfo.id)} >Buy Now</button>
                                                            <ul>
                                                                <li><PiShippingContainerBold className='icn' /> Free shipping included</li>
                                                                <li><RiLeafLine className='icn' /> Made from the best of materials sourced</li>
                                                            </ul>

                                                        </div>
                                                    </>
                                                )

                                            })}


                                </>

                            )
                        })

                }

            </div >
            <Snackbarcom />
            <div className='pd-slider'>
                <Productslider />

            </div>
        </>
    );
};

export default Overview
