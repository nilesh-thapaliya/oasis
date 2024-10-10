import React, { useContext } from 'react'
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MyContext from '../../Common/Context/MyContext';

const Snackbarcom = () => {

    const {msg,snakopen,Setsnakopen} = useContext(MyContext)

  return (
    <div>
       <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snakopen}
                autoHideDuration={3000}
                onClose={() => Setsnakopen(false)}>
                <Alert
                    onClose={() => Setsnakopen(false)}
                    severity='success' 
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
    </div>
  )
}

export default Snackbarcom
