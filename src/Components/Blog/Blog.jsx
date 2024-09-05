import React from 'react'
import './Blog.scss'
import img from '../../Assets/blog/Picture.png'
import Data from './Blogdata'
 const Blog = () => {
  return (
    <div className='blog-main'>
        
        <section className='top'>
        <h1>Transforming Your Living Space: Top Trends in Modern Furniture</h1>
        <p>Explore the latest trends in modern furniture design that can elevate your living space with style and functionality</p>
        <button className="read">Read article &#x2192;</button>
        <img src={img} alt="" />
     
        </section>

        <section className='bottom'>
            <h2>Latest Articles</h2>
         
         <div className="cards">
         {
                Data.map((item)=>{
                    return(
                        <div className='card'>
                            <img src={item.path} alt="" />
                            <h4>{item.heading}</h4>
                            <p> {item.text} </p>
                            <button>Interior Design</button>
                        </div>
                    )
                })
            }

         </div>
          
      <button className='last-btn'> Show all articles</button>

        </section>
     
    

    </div>
  )
}

export default Blog
