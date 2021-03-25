import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import { NavLink as RouteLink } from "react-router-dom";
// import unicodelogo from './unicodelogo.png'
import navlogo from "../../assets/images/green_logo4.png";

function LoginSignupNavbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar
      style={{
        // height: "4.3em",
        backgroundColor: "#305534",
        borderWidth: "100",
      }}
      light
      expand='lg'
      className='w-100 navbar-dark bg-inverse'>
      {/* {props.children} */}
      <NavbarBrand href=''>
        {<img src={navlogo} style={{ width: "60px", height: "60px" }}></img>}
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} className='' navbar>
        <Nav className='ml-auto' navbar>
          {/* <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarTogglerDemo02'
          aria-controls='navbarTogglerDemo02'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button> */}
          {/* <div class='collapse navbar-collapse' id='navbarTogglerDemo02'> */}
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
          {/* </div> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
export default LoginSignupNavbar;
