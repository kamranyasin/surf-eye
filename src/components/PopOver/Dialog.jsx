import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

export default function DialogButton({title,children, target}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <div  onClick={handleClickOpen}>
        {target}
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
       
         {children}
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#2e3848', borderColor: '#2e3848', fontFamily : ['Exo 2', 'sans-serif'] }} onClick={handleClose}>Close</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}