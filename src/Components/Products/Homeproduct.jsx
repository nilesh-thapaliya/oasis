import React, { useState } from 'react';
import pros from '../Categories/Data';
import { useNavigate } from 'react-router-dom';
import './Products.scss'



const HomeProduct = () => {

    const navigate = useNavigate();

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
                  .map((items) => {
                        return (
                           <>
                                    {
                                        items.product
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

        </div>
    )
}

export default HomeProduct
