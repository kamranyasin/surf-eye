import React from 'react'
import './Navbar.styles.scss';
import Logo from '../../assets/logo2.svg'
import Hamburger from '../Hamburger/Hamburger';
import {Link} from 'react-router-dom'
const NavbarItem = ({title, onClick, link})=>{
    return (
        <div className='navbar__link'>
            <a href={link||'#'}>{title}</a>
        </div>
    )
}


const Navbar = ({isHome}) => {
  return (
    <div className={`navbar ${isHome?'':'navbar-background-normal'}`}>
        <div className="navbar-container">
            <Link to='/'>
            <div className="navbar__logo">
                <img src={Logo} alt="" />
            </div>
            </Link>
            <div className='navbar__links'>
                <NavbarItem title="VIDEOS" link='/#VideosComponent'/>
                <NavbarItem title="Locations" link='/#LocationsComponent'/>
                <NavbarItem title="How it works" link='/#HowitworksComponent'/>
                <div className='navbar__link'>
                <Link to="/auth">Login</Link>
                </div>
            </div>
            <div className='navbar__menu'>
                <Hamburger links={[{title : 'Videos', href :'#VideosComponent'}, {title : 'Locations', href : '#LocationsComponent'}, {title : 'How it Works', href : '#HowitworksComponent'}, {title : 'Login', href : '/auth'}]}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar