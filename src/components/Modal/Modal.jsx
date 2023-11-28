import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import {AiOutlineClose} from 'react-icons/ai';
import './Modal.styles.scss'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
   // eslint-disable-next-line
  ['@media (max-width:600px)'] : {
    width : 350
  },
   // eslint-disable-next-line
  ['@media (max-width:450px)'] : {
    width : 300
  },
  p: 4,
};

export default function ReactModal({target, children, title, modalState, setModalState}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
      setOpen(true);
      setModalState(true);
  }
  const handleClose = () => {
    setOpen(false);
    setModalState(false);
  }
  React.useEffect(()=>{
      setOpen(modalState)
  }, [modalState])

  return (
    <div>
      <div onClick={handleOpen}>{target}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='modal__header'>
                <div className='modal__title'>{title}</div>
                <div className='modal__close'onClick={handleClose}>
                    <AiOutlineClose/>
                </div>
            </div>
            <div className='modal__content'>
                    {children}
                </div>
        </Box>
      </Modal>
    </div>
  );
}
