import React, {useContext, useEffect, useState } from 'react';
// import pros from '../Categories/Data';
import { useNavigate } from 'react-router-dom';
import './Products.scss'
import axios from 'axios';
import MyContext from '../../Common/Context/MyContext';
import { CircularProgress } from '@mui/material';


const HomeProduct = () => {

    const navigate = useNavigate();

    const [sortOrder, setSortOrder] = useState("");
    const[data,setData]=useState([])
 
    useEffect(()=>{
        axios.get('http://oasis-backend-three.vercel.app/category-api')
        .then(a=>setData(a.data.data))
    })


    const handleSortChange = (e) => {
      setSortOrder(e.target.value);
    };
  
  
    const sortedProducts = data.map((Item) => {
      const sortedVariants = [...Item.product].sort((a, b) => {
        if (sortOrder === "asc") return a.prize - b.prize;
        if (sortOrder === "desc") return b.prize - a.prize;
        if (sortOrder === "ofr") return parseFloat(b.discount) - parseFloat(a.discount);
  
        return 0;
      });
  
      return { ...Item, product: sortedVariants };
    });
     

    const { togglelogin, setCart, token, setMsg, Setsnakopen,  } = useContext(MyContext);
    const [loader, setLoader] = useState()

    const [selectedcolor, setSelectedcolor] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [warningProduct, setWarningProduct] = useState(null);
   
    const handleclr = (color,productname) => {
        setSelectedcolor(color);
        setSelectedProduct(productname)
        setWarningProduct(null); 
    }

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
            setWarningProduct(productid); 
            return;
        }

        setLoader(true)
        const { data } = await axios.post('http://oasis-backend-three.vercel.app/add-to-cart', { productimg, producttitle, productprice, productid, categoryid, selectedcolor }, {
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
            
        } else {
            setMsg(data.error)
            Setsnakopen(true)
        }
        setLoader(false)

    }
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
            {loader && <div className="loadermain"> <CircularProgress className='loader' color="success" /></div>}
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
                                                <button className='atc'  onClick={() => addtocart(inner.imagepath, inner.name, inner.prize, inner.id, items.id)}  >add to cart&#x2192;</button>
                                                <span>
                                                    <p className='p1'>{inner.name}</p>
                                                    <p className='p2'>${inner.prize}</p>
                                                </span>
                                                <div className="cols">
                                                    <span className='clr' onClick={() => handleclr(inner.color1,inner.name)} style={{ backgroundColor: `${inner.color1}`, border: selectedcolor === inner.color1 ? '2px solid brown' : 'none' }}></span>
                                                    <span className='clr' onClick={() => handleclr(inner.color2,inner.name)} style={{ backgroundColor: `${inner.color2}`, border: selectedcolor === inner.color2 ? '2px solid brown' : 'none' }}></span>
                                                    {warningProduct === inner.id && <p id='wrn'>*please select any color</p>}
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
