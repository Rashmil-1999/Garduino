import React, { useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import the login and signup pages
import Login from "./containers/LoginSignUp/Login";
import SignUp from "../src/containers/LoginSignUp/SignUp";
//import the user app
import UserApp from "./UserApp";

import * as tokenUtils from "./utils/tokenUtils";

function App() {
  const isLoggedIn = useMemo(() => tokenUtils.isLoggedIn(), []);
  if (
    !isLoggedIn &&
    window.location.href !== process.env.REACT_APP_LOGIN_URL + "/"
  ) {
    window.location = `${process.env.REACT_APP_LOGIN_URL}`;
  }
  let roles = null;
  if (isLoggedIn) {
    roles = tokenUtils.roles(tokenUtils.getToken());
    roles = roles[0];
  }
  const DeviceHeight = window.screen.height;
  return (
    <div
      className='App'
      style={{
        backgroundColor: " rgb(21, 36, 61)",
        height: window.innerHeight,
      }}>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <UserApp />
      </Switch>
    </div>
  );
}

export default App;
