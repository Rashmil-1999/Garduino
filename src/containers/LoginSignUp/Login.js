import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { Card, CardImg, CardText, Jumbotron } from "reactstrap";
import axios from "../../axios";
import Button from "../../components/Button/Login/Button";
import { toast } from "react-toastify";
import * as tokenUtils from "../../utils/tokenUtils";
import pf1 from "../../assets/images/pf1.png";
import { Link } from "react-router-dom";
import LoginSignupNavbar from "../../components/Toolbar/LoginSignupNavbar";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPassword, setValidPassword] = useState(false);

  const onEmailChange = (curr) => {
    setEmail(curr);
    if (curr !== "") {
      setValidEmail(true);
    }
  };

  const createToast = (error, type) => {
    toast(error.message ? error.message : error, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      autoClose: 3000,
      type: !type ? "error" : type,
    });
  };

  const onPassChange = (curr) => {
    setPassword(curr);
    if (curr !== "") {
      setValidPassword(true);
    }
  };
  const authenticate = (path, data) => {
    setLoading(true);
    // Make an API call. In case of success go to otp page else show error
    axios
      .authenticate(path, data)
      .then((resp) => {
        setLoading(false);
        if (resp.message) {
          console.log(resp.message);
          alert(resp.message);
        } else if (resp.status === "success") {
          window.location.pathname = `/dashboard`;
          // if successful login then redirect to Dashboard page
          createToast("Successful Login! Welcome ", "success");
        }

        console.log(resp);
      })
      .catch((error) => {
        setLoading(false);
        createToast(error, "error");
      });
  };

  const onLogin = () => {
    authenticate("/signin", { email: email, password: password });
    // The Mutation Of user will be carried out here
  };
  return (
    <>
      <LoginSignupNavbar/>
      <Card
        style={{ width: "400px", top:200  }}
        className="my-5 shadow p-3 mb-5 bg-white rounded mx-auto"
      >
        <CardImg src={pf1} style={{ height: "15em" }} />
        <CardText>
          <Input
            type="email"
            placeholder={"E-mail"}
            label={"Email "}
            valid={isValidEmail}
            value={email}
            onChange={onEmailChange}
          />
          <Input
            type="password"
            placeholder={"password"}
            label={"Password "}
            valid={isValidPassword}
            value={password}
            onChange={onPassChange}
          />
          <Button
            name="Log In"
            classes={["btn-check"]}
            onClick={onLogin}
            isLoading={loading}
            isDisabled={!isValidEmail || !isValidPassword}
          />
          <Link className="nav-link" to={"/signup"}>
            Sign up
          </Link>
        </CardText>
      </Card>
    </>
  );
};

export default Login;
