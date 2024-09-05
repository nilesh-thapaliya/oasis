import React, { useState } from 'react';
import pros from '../Categories/Data';
import { useNavigate, useParams } from 'react-router-dom';
import './Products.scss'
import { BiSearch } from 'react-icons/bi';
import Productslider from '../Productslider/Productslider';


const Products = () => {

    const { products } = useParams();
    const navigate = useNavigate();

    const [input,setInput] =useState('');

    const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };


  const sortedProducts = pros.map((Item) => {
    const sortedVariants = [...Item.product].sort((a, b) => {
      if (sortOrder === "asc") return a.prize - b.prize;
      if (sortOrder === "desc") return b.prize - a.prize;
      if (sortOrder === "ofr") return parseFloat(b.discount) - parseFloat(a.discount);

      return 0;
    });

    return { ...Item, product: sortedVariants };
  });


    return (
        <div className='product-main'>

            <div>
       {
        pros
        .filter(outer => outer.title === products)
        .map((upper)=>{
            return(
                <div className='top-part'>
                <h1 className="header"> {upper.title}</h1>
                <p className='txt'>Transform your {upper.title} with our elegant and functional options, perfect for every modern home.</p>
            <div className='srch-div'>
            <input className='search-box' type="search" placeholder='Search...' onChange={(a)=> setInput(a.target.value)}/>
            <BiSearch className='find'/>
                </div>    
                </div>
    
            )
        })
       }



            </div>
            <div className='filterbox'>
            <h2>TOP PRODUCTS</h2>
        <select onChange={handleSortChange} className="select-filter">
          <option selected disabled> Filter</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
          <option value="ofr">By Offer</option>

        </select>
      </div>
            <div className="items">
                {
                 sortedProducts
                  .filter(outer => outer.title === products)
                  .map((items) => {
                        return (
                           <>
                                    {
                                        items.product
                                      .filter((srch)=>{
                                       const lowjson = srch.name.toLowerCase();
                                       const lowinput = input.toLocaleLowerCase();
                                       return(
                                       lowjson.startsWith(lowinput)
                                       )
                                            })
                                            .map((inner) => (
                                                <div className="probox">
                                                     <img src={inner.imagepath} onClick={() => navigate(`/${items.title}/${inner.name}`)} alt="" />
                                                     <button className='atc' >add to cart&#x2192;</button>
                                                    <span>
                                                        <p className='p1'>{inner.name}</p>
                                                        <p className='p2'>${inner.prize}</p>
                                                    </span>
                                                    <div className="cols">
                                                        <span style={{backgroundColor:`${inner.color1}`}}></span>
                                                        <span style={{backgroundColor:`${inner.color2}`}}></span>
                                                      
                                                    </div>

                                                </div>
                                            ))
                                    }
                                </>
                            )
                        })
                }
            </div>
                <Productslider/>

        </div>
    )
}

export default Products
