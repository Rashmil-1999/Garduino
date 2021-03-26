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
  Spinner,
} from "reactstrap";
import logo from "../../assets/images/green_logo4.png";
import { useQuery } from "@apollo/client";
import * as user_queries from "../../queries/user_queries";
import { client } from "../../UserApp";

const Header = ({ u_uuid }) => {
  //const [collapsed, setCollapsed] = useState(true);
  //const toggleNavbar = () => setCollapsed(!collapsed);
  const [isOpen, setIsOpen] = useState(false);
  const { error, loading, data } = useQuery(user_queries.GET_USER_NAME, {
    client: client,
    variables: { u_uuid },
  });

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      className='w-100 navbar-dark bg-inverse'
      style={{ backgroundColor: "#305534" }}
      expand='md'>
      <NavbarBrand
        href='/dashboard'
        className=''
        style={{ color: "white", fontWeight: "bold" }}>
        <img
          src={logo}
          width='60'
          height='60'
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
      <Collapse isOpen={isOpen} className='' navbar>
        <Nav className='ml-auto' navbar>
          <NavbarText
            className=''
            style={{ color: "white", paddingRight: "20px" }}>
            {loading ? (
              <Spinner size='sm' color='primary' />
            ) : (
              <p>
                <strong>Welcome{" " + data.users[0].full_name}</strong>
              </p>
            )}
          </NavbarText>
          <NavItem>
            <NavLink href='/dashboard' style={{ color: "white" }}>
              Profile Settings
            </NavLink>
          </NavItem>
          <NavLink href='/logout' style={{ color: "white" }}>
            <i class='fas fa-sign-out-alt fa-x'> Logout</i>
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
