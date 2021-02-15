import React, { useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import the login and signup pages
import Login from "./containers/LoginSignUp/Login";
//import the user app
import UserApp from "./UserApp";
import SignUp from "./containers/LoginSignUp/Signup";

import * as tokenUtils from "./utils/tokenUtils";

function App() {
  const isLoggedIn = useMemo(() => tokenUtils.isLoggedIn(), []);
  /*if (
    !isLoggedIn &&
    window.location.href !== process.env.REACT_APP_LOGIN_URL + "/" && window.location.href !== process.env.REACT_APP_SIGNUP_URL + "/"
  ) {
    window.location = `${process.env.REACT_APP_LOGIN_URL}`;
    console.log(window.location.href !== process.env.REACT_APP_LOGIN_URL + "/",window.location.href !== process.env.REACT_APP_SIGNUP_URL + "/")
  }*/
  let roles = null;
  if (isLoggedIn) {
    roles = tokenUtils.roles(tokenUtils.getToken());
    roles = roles[0];
  }
  return (
    <div className="App" style={{ backgroundColor: "lightgreen",height:1000 }}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <UserApp />
      </Switch>
    </div>
  );
}

export default App;
