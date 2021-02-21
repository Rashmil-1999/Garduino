import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Header = ({ u_name }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar color='faded' light>
      <NavbarBrand href='/' className='mr-auto' style={{ color: "white" }}>
        Welcome {u_name.users[0].full_name}
      </NavbarBrand>
      <NavbarToggler
        onClick={toggleNavbar}
        className='mr-2'
        style={{ color: "white" }}
      />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink href='#' style={{ color: "white" }}>
              Profile Settings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='#' style={{ color: "white" }}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
