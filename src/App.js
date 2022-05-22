import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.css';
import {  FaPlus, FaBell, FaFacebookMessenger, FaCaretDown, FaCog, FaChevronRight, FaChevronLeft, FaUser } from 'react-icons/fa';

function App() {

  return (
    <Navbar>
      <NavItem icon={<FaPlus />} />
      <NavItem icon={<FaBell />} />
      <NavItem icon={<FaFacebookMessenger />} />
      <NavItem icon={<FaCaretDown />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className='menu-item' onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className='icon-button icon-left'>{props.leftIcon}</span>
        
        {props.children}
        
        <span className='icon-right'>{props.rightIcon}</span>
      </a>
    )
  }

  return (
    <div className='dropdown' style={{ height: menuHeight }}>
      <CSSTransition 
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem leftIcon={<FaUser/>}>My Profile</DropdownItem>
          <DropdownItem leftIcon={<FaCog />} goToMenu='settings'>Settings</DropdownItem>
        </div>

      </CSSTransition>

      <CSSTransition 
        in={activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className='menu'>
          <DropdownItem leftIcon={<FaChevronLeft />} goToMenu='main'></DropdownItem>
          <DropdownItem leftIcon={<FaCog />}>Advanced</DropdownItem>
        </div>

      </CSSTransition>
    </div>
  )

}

function Navbar(props) {
  return (
    <nav className='navbar'>
      <ul className='navbar-nav'>{props.children}</ul>
    </nav>
  )
}

function NavItem(props) {

  const [open, setOpen] = useState(false);
  
  return (
    <li className='nav-item'>
      <a href="#" className='icon-button' onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

export default App;
