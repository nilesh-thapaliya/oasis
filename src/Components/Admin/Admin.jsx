//admin page
import React, { useEffect, useState } from 'react'
import './Admin.scss'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import axios from 'axios'
import Orderstatus from './Orderstatus'




const Admin = () => {


    const [isOpen, setIsOpen] = useState(false)

    const [rinfo,setRinfo]=useState(false)
    const [oinfo,setOinfo]=useState(false)

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const [rdata, setRdata] = useState([])
    useEffect(() => {
        axios.get('http://oasis-backend-three.vercel.app/register-info')
            .then(a => setRdata(a.data.data))
    }, [])

    const ron = ()=>{
        setRinfo(true)
        setOinfo(false)
        toggleDrawer()
     }   
    const oon = ()=>{
        setOinfo(true)
        setRinfo(false)
        toggleDrawer()
     }   

    return (
        <div>
            <button className='adm' onClick={toggleDrawer}>admin</button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                size={350}
                className='admin'
            >

                <h2>Dashboard</h2>
                <div className='lists'>
                    <ul>

                        <li  onClick={ ron } >Registered Emails </li>
                        <li onClick={ oon }>Orders</li>

                    </ul>
                </div>
            </Drawer>

 {rinfo &&    <div className="register-info"> 
                    <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>    
                    <th>password</th>
                </tr>
               {rdata.map((r)=>{
                    return(
                        <>
                        <tr>
                            <td>{r.name}</td>
                            <td>{r.email}</td>
                            <td>*******</td>
                        </tr>
                        </>
                    )
                })}
        </table>
            </div>}

            {oinfo && <Orderstatus/>}
           
        </div>
    )
}

export default Admin
