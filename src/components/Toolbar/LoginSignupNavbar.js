import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { NavLink as RouteLink } from "react-router-dom";
// import unicodelogo from './unicodelogo.png'
import navlogo from "../../assets/images/pf1.png";

function LoginSignupNavbar(props) {
  return (
    <Navbar
      style={{
        height: "4.3em",
        backgroundColor: "#305534",
        borderWidth: "100",
      }}
      light
      expand='md'>
      {/* {props.children} */}
      <NavbarBrand href=''>
        {<img src={navlogo} style={{ width: "44px", height: "44px" }}></img>}
      </NavbarBrand>
      <Nav className='ml-auto' navbar>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span class='navbar-toggler-icon'></span>
        </button>
        <div class='collapse navbar-collapse' id='navbarTogglerDemo02'>
          <NavItem
            style={{
              fontSize: "20px",
              cursor: "pointer",
              margin: "10px",
              color: "white",
            }}>
            <NavLink tag={RouteLink} to='/signup' style={{ color: "white" }}>
              Sign up
            </NavLink>
          </NavItem>
        </div>
      </Nav>
    </Navbar>
  );
}
export default LoginSignupNavbar;
