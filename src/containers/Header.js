import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const Header = ({ u_name }) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    
    return (
        <div>
        <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Welcome {u_name.users[0].full_name}</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="#">Profile Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        </Navbar>  
        </div>
    )
}

export default Header;
