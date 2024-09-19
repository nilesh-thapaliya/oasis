import React from 'react';
import Data from '../Categories/Data';
import './Overview.scss';
import { useParams } from 'react-router-dom';
import { PiShippingContainerBold } from 'react-icons/pi';
import { RiLeafLine } from 'react-icons/ri';
import Productslider from '../Productslider/Productslider';

const Overview = () => {


    const { category, products } = useParams()
   

    return (
     
<>
       
        <div className='ovr-main' >

            {
            Data
            .filter(outer => outer.title === category)
            .map((outterinfo) => {       
                return(
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
    <p> ${innerinfo.prize}.00 &nbsp; <del style={{color:'grey'}}>${innerinfo.delprize}.00 </del> </p>
    <p> {innerinfo.discount}% </p>
</span>

<p className="care">
Discover our alluring range of designs or plan an exclusive product according to your individual wishes.
</p>
<div className="cols">
    <div className='clrs'>
        <span className='clr' style={{backgroundColor:`${innerinfo.color1}`}}></span>
        <span className='clr' style={{backgroundColor:`${innerinfo.color2}`}}></span>
       
    </div>
    <span className='quantity'>
        1
    </span>
</div>
<button >Buy Now</button>
<ul>
    <li><PiShippingContainerBold className='icn' /> Free shipping included</li>
    <li><RiLeafLine className='icn'/> Made from the best of materials sourced</li>
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
                       <div className='pd-slider'>
                       <Productslider/> 
                       </div>
                       </>
                );
            };

export default Overview
