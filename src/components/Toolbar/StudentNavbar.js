import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouteLink } from 'react-router-dom';
//import navlogo from '../../assets/images/navlogo.png'
//import { useSelector } from 'react-redux'
//import UserNavSearch from '../../containers/UserNavSearch';
import LogOut from '../../containers/LoginSignUp/Logout';


function StudentNavbar(props) {
    const userName = props.full_name
    return (
        <Navbar style={{"height":"4.3em"}} color="white" light expand="md">
            <NavbarBrand href="/ownprofile">
            
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <NavItem className="mx-auto" style={{ width: '30em', paddingTop: '20px'}}>
                    
                </NavItem>
                <NavItem style={{fontSize: "20px", cursor:"pointer", margin:"10px"}}>
                    <NavLink tag={RouteLink} to="/findmentor" activeStyle={{color:"#12B6A6"}}>Find a mentor</NavLink>
                </NavItem>
                <NavItem style={{fontSize: "20px", cursor:"pointer", margin:"10px"}}>
                    <NavLink tag={RouteLink} to="/makeateam" activeStyle={{color:"#12B6A6"}}>Make a team</NavLink>
                </NavItem>
                <NavItem style={{fontSize: "20px", cursor:"pointer", margin:"10px"}}>
                    <NavLink tag={RouteLink} to="/events" activeStyle={{color:"#12B6A6"}}>Events</NavLink>
                </NavItem>
                <NavItem style={{fontSize: "20px", cursor:"pointer", margin:"10px"}}>
                    <NavLink tag={RouteLink} to="/ownprofile" activeStyle={{color:"#12B6A6"}}>{userName}<span><i class="user circle icon"></i></span></NavLink>
                </NavItem>
                <NavItem>
                    <LogOut/>
                </NavItem>
              </div>
          </Nav>
      </Navbar>
  );
}
export default StudentNavbar;
