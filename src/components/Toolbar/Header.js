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
  NavbarText,
} from "reactstrap";

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
      style={{ backgroundColor: "rgb(214,177,177)" }}
      expand='sm'>
      <NavbarBrand href='/' className='mr-auto' style={{ color: "white" }}>
        Welcome!
      </NavbarBrand>

      <Nav className='me-auto' navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
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
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
