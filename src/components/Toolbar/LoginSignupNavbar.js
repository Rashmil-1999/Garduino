import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouteLink } from 'react-router-dom';
// import unicodelogo from './unicodelogo.png'
//import navlogo from '../../assets/images/navlogo.png'


function LoginSignupNavbar(props) {

  return (
        <Navbar style={{"height":"4.3em"}}  light expand="md">
          {/* {props.children} */}
          <NavbarBrand href="/">
          
          {/* <img src={unicodelogo} style={{width:"224px", height:"44px"}}/> */}
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              
              <NavItem style={{fontSize: "20px", cursor:"pointer", margin:"10px", color:"white"}}>
                  <NavLink tag={RouteLink} to="/signup" activeStyle={{color:"white"}}>Sign Up</NavLink>
              </NavItem>
              </div>
          </Nav>
      </Navbar>
  );
}
export default LoginSignupNavbar;
