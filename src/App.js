import React, { useMemo } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//import the login and signup pages
import Login from "./containers/LoginSignUp/Login";
import SignUp from "../src/containers/LoginSignUp/SignUp";
import PlantDetails from "./containers/PlantDetails/PlantDetails";
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

  return (
    <div
      className='App'
      style={{
        backgroundColor: " rgb(21, 36, 61)",
        height:"100%",
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
