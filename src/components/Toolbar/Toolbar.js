import React from "react";

import LoginSignupNavbar from "./LoginSignupNavbar";
import Header from "./Header";

function Toolbar(props) {
  if (props.user === "user") {
    return <Header u_uuid={props.u_uuid} />;
  }
  if (props.user === null) {
    return <LoginSignupNavbar />;
  }
}

export default Toolbar;
