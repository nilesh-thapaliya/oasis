import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './Orderstatus.scss'
import MyContext from '../../Common/Context/MyContext'


const Orderstatus = () => {


    const{setMsg, Setsnakopen }= useContext(MyContext)

    const [rdata, setRdata] = useState([])
    useEffect(() => {
        axios.get('https://oasis-backend-three.vercel.app/register-info')
            .then(a => setRdata(a.data.data))
    }, [])


    const shippedfunc = async (email,categoryid,productid,selectedcolor) => {
        const { data } = await axios.post('https://oasis-backend-three.vercel.app/shipping-true' ,{email,categoryid,productid,selectedcolor}, {
    
        });

        if (data.success) {
           setMsg('shipped')
           Setsnakopen(true)
        } else {
            setMsg('error');
            Setsnakopen(true)
        }
    };
    const deliverdfunc = async (email,categoryid,productid,selectedcolor) => {

   
        const { data } = await axios.post('https://oasis-backend-three.vercel.app/deliverd-true' ,{email,categoryid,productid,selectedcolor}, {
       
        });

        if (data.success) {
           setMsg('order deliverd')
           Setsnakopen(true)
        } else {
            setMsg('error');
            Setsnakopen(true)
        }
    };

  return (
    <div>
    <table >
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>track order</th>
        </tr>
        {rdata.map((u) => {
            return (

                u.shipping.map((s) => {
                    return (

                        u.order.map((i) => {
                            return (
                                <tr>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{s.address}</td>
                                    <td>{i.producttitle}</td>
                                    <td>${i.productprice}</td>
                                    <td>{i.quantity}</td>
                                    <td>
                                        <button className='sipd' onClick={()=>shippedfunc(u.email,i.categoryid,i.productid,i.selectedcolor) } >shipped</button>
                                        <button className='sipd' onClick={()=>deliverdfunc(u.email,i.categoryid,i.productid,i.selectedcolor)} >deliverd</button>
                                    </td>
                                </tr>
                            )
                        }))
                })
            )
        })}

    </table>
</div>
  )
}

export default Orderstatus
