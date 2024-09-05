import React from 'react'
import { FaArrowUpLong } from "react-icons/fa6";
import ScrollToTop from "react-scroll-to-top";
export default function Gototop() {
  return (
    <div>
      
  

 

<ScrollToTop smooth 
            style={{marginBottom:'3rem',borderRadius:'50%'}}
           component={<FaArrowUpLong />}
/>


    </div>
  )
}
