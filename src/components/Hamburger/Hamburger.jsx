import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DateTimePicker from 'react-datetime-picker';
// import {Link} from 'react-router-dom';

import {AiOutlineMenu} from 'react-icons/ai';
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

const IconHam = ()=>{
  return (
      <div className='hamburger-menu-icon'>
          <AiOutlineMenu size={27}/>
      </div>
  )
}


export default function Hamburger({target, children, links,type}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <div
        onClick={handleClick}
      >
       {target||<IconHam/>}
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >{type==='dateIp'?(<div className='videoviewinput'>
         <DateTimePicker className='videoviewinput-input' onChange={handleChange} value={value} />
      </div>):
        links.map((l,id)=><MenuItem sx={{color : '#2e3848', paddingX : '40px', borderBottom : '1px solid lightgray' , fontFamily : ['Exo 2','sans-serif'], fontWeight :'bold', textTransform : 'uppercase', fontStyle : 'italic'}} key={id} onClick={handleClose}><a href={l.href}>{l.title}</a></MenuItem>)
      
      }
      </Menu>
    </div>
  )
    }