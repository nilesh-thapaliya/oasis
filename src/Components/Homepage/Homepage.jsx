import React from 'react'
import './Homepage.scss'
import homeimg from '../../Assets/Categories/Homebg.png'
import Categories from "../Categories/Categories";
import Overview from '../Overview/Overview';
import Gallery from '../Gallery/Gallery';
import FAQ from '../FAQ/FAQ';
import HomeProduct from '../Products/Homeproduct';
const Homepage = () => {
  return (
  <>

<div className="hm-main">

<h4>FURNITURE STORE</h4>
    <h1>
      Discover the Artistry of Modern Contemporary Furniture
    </h1>
    <p>Experience the elegance and functionality of cutting-edge design where luxury meets innovation in every piece for ultimate relaxation
    </p>

    <img src={homeimg} alt="" />
</div>

<Categories/>
<HomeProduct/>
<Gallery/>

<FAQ/>
<Overview/>
  </>
 
  )
}

export default Homepage
