
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import Data from '../Categories/Data';
import './Productslider.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Productslider = () => {

    const navigate =useNavigate();
    const[data,setData]=useState([])
 
    useEffect(()=>{
        axios.get('http://oasis-backend-three.vercel.app/category-api')
        .then(a=>setData(a.data.data))
    })

return (
    <>

     
<div className='car-main'>
    
<h2>People Also Viewed</h2>

<Carousel
arrows={true}
additionalTransfrom={0}
containerClass="container-with-dots"
focusOnSelect={false}
infinite
itemClass=""
keyBoardControl
minimumTouchDrag={80}
renderArrowsWhenDisabled={false}
renderDotsOutside={false}
responsive={{
desktop: {
breakpoint: {
max: 3000,
min: 1024
},
items: 4,
partialVisibilityGutter: 40
},
mobile: {
breakpoint: {
max: 850,
min: 0
},
items: 2,
partialVisibilityGutter: 30
},
tablet: {
breakpoint: {
max: 1024,
min: 850
},
items: 3,
partialVisibilityGutter: 30
}
}}
rewind={false}

rewindWithAnimation={false}
rtl={false}
shouldResetAutoplay
showDots={false}
sliderClass=""
slidesToSlide={1}
swipeable
>

 
{data
.map((o)=>{
    return(

            o.product.map((i)=>{
                return(

                    <div className="probox-slider">
                <img src={i.imagepath} onClick={() => navigate(`/${o.title}/${i.name}`)} alt="" height={250} width={250}  /> 
                  
                   <span>
                       <p className='p1'>{i.name}</p>
                       <p className='p2'>${i.prize}</p>
                   </span>
                   <div className="cols">
                       <span style={{backgroundColor:`${i.color1}`}}></span>
                       <span style={{backgroundColor:`${i.color2}`}}></span>
                     
                   </div>

               </div>
                  
                )
            })
        
        
        
    )
})
   
    }





 
</Carousel>
</div>
</>
)
}

export default Productslider