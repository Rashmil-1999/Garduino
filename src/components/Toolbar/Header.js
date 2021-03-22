import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import logo from "../../assets/images/logo.png";

const Header = () => {
  //const [collapsed, setCollapsed] = useState(true);
  //const toggleNavbar = () => setCollapsed(!collapsed);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      className='w-100'
      color='faded'
      light
      style={{ backgroundColor: "#305534" }}
      expand='md'>
      <NavbarBrand
        href='/dashboard'
        className=''
        style={{ color: "black", fontWeight: "bold" }}>
        <img
          src={logo}
          width='50'
          height='50'
          alt=''
          className='d-inline-block align-top'></img>
      </NavbarBrand>
      <NavbarBrand
        href='/dashboard'
        className='mr-auto display-1'
        // tag='h1'
        style={{ color: "white", fontWeight: "bold" }}>
        Garduino
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <NavbarText className='ml-auto' style={{ color: "white", paddingRight: "20px"}}>Welcome!</NavbarText>
        <Nav className='' navbar>
          {/* <UncontrolledDropdown nav inNavbar>
          <DropdownToggle
            nav
            caret
            style={{ color: "black", fontWeight: "bold" }}>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <NavLink href='/components/'>Profile Settings</NavLink>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <NavLink href='/logout'>
                <i class='fas fa-sign-out-alt fa-x'> Logout</i>
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}

          <NavItem>
            <NavLink href='/dashboard'>Profile Settings</NavLink>
          </NavItem>
          <NavLink href='/logout'>
            <i class='fas fa-sign-out-alt fa-x'> Logout</i>
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
