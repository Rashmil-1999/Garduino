import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import Logout from "../../containers/LoginSignUp/Logout"

const Header = () => {
  //const [collapsed, setCollapsed] = useState(true);
  //const toggleNavbar = () => setCollapsed(!collapsed);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="w-100" color='faded' light style={{backgroundColor:'rgb(214,177,177)'}}>
      <NavbarBrand href='/' className='mr-auto' style={{ color: "white" }}>
        Welcome!
      </NavbarBrand>
      
      
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Profile Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/logout"><i class="fas fa-sign-out-alt fa-2x"> Logout</i></NavLink>
            </NavItem>
            
          </Nav>
          
    </Navbar>
  );
};

export default Header;
