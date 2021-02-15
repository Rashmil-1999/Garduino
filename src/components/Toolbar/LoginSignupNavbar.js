import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouteLink } from 'react-router-dom';
// import unicodelogo from './unicodelogo.png'
//import navlogo from '../../assets/images/navlogo.png'


function LoginSignupNavbar(props) {

  return (
        <Navbar style={{"height":"4.3em"}} color="white" light expand="md">
          {/* {props.children} */}
          <NavbarBrand href="/">
          
          {/* <img src={unicodelogo} style={{width:"224px", height:"44px"}}/> */}
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <NavItem style={{fontSize: "20px", cursor:"pointer", margin:"10px"}}>
                  <NavLink tag={RouteLink} to="/" activeStyle={{color:"#12B6A6"}}>Login</NavLink>
              </NavItem>
              <NavItem style={{fontSize: "20px", cursor:"pointer", margin:"10px"}}>
                  <NavLink tag={RouteLink} to="/signup" activeStyle={{color:"#12B6A6"}}>Sign Up</NavLink>
              </NavItem>
              </div>
          </Nav>
      </Navbar>
  );
}
export default LoginSignupNavbar;
