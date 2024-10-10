import React, { useContext, useState } from 'react'
import './Userprofile.scss'
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import MyContext from '../../Common/Context/MyContext';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const Userprofile = () => {
    const drawerwidth = window.innerWidth > 786;
    const {upopen, toggleUp, deletetoken,toggleorder } = useContext(MyContext);

    const Navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{ setOpen(true)|| toggleUp()};
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const Logoutfunc = () => 
{
            deletetoken()
            toggleUp()
            handleClose()
           Navigate('/')
    }
    return (
        <div className='asz'>
               <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            are you sure you want to logout?
          </Typography>
         <button className='butn' onClick={()=>handleClose()}> No</button>
         <button className='butn' onClick={()=>Logoutfunc()} > Yes</button>
        </Box>
      </Modal>
    </div>
            <Drawer
                open={upopen}
                onClose={toggleUp}
                direction='right'
                size={drawerwidth ? '30%' : '100%'}

            >

                <div className='up-main'>
              
                    <h1>Your Profile</h1>
                    <li onClick={() => Navigate('/account-detail')||toggleUp()}>Account Details</li>
                    <li onClick={ ()=>toggleorder()}>Order Details</li>
                    <li onClick={()=>handleOpen()}>Logout</li>
                </div>

            </Drawer>

        </div >
    )
}

export default Userprofile
