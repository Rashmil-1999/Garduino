import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink as RouteLink } from 'react-router-dom';
import navlogo from '../../assets/images/navlogo.png';
import { useSelector } from 'react-redux';
import LogOut from '../../containers/LoginSignUp/Logout';
import UserNavSearch from '../../containers/UserNavSearch';


function ProfessorNavbar(props) {
    const userName = useSelector(state => state.users.userName)
    return (
        <Navbar style={{"height":"4.3em"}} color="white" light expand="md">
            <NavbarBrand href="/ownteacher">
                <img src={navlogo} style={{ height: "45px" }} />
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <NavItem className="mx-auto" style={{ width: '30em', paddingTop: '20px'}}>
                        <UserNavSearch/>
                    </NavItem>
                    <NavItem style={{ fontSize: "20px", cursor: "pointer", margin: "10px" }}>
                        <NavLink tag={RouteLink} to="/ownteacher" activeStyle={{ color: "#12B6A6" }}>{userName}<span><i class="user circle icon"></i></span></NavLink>
                    </NavItem>
                    <NavItem>
                        <LogOut/>
                    </NavItem>
                </div>
            </Nav>
        </Navbar>
    );
}
export default ProfessorNavbar;
