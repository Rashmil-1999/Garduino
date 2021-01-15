import React, { useState } from "react";
import Input from "../../components/Input/Input";
import { Container, Card, CardImg, CardText, Jumbotron } from "reactstrap";
import axios from "../../axios";
import Button from "../../components/Button/Login/Button";
import { toast } from "react-toastify";
import * as tokenUtils from "../../utils/tokenUtils";
import pf1 from "../../assets/images/pf1.png";
import { Link } from "react-router-dom";

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
          // let roles = tokenUtils.roles(tokenUtils.getToken());
          // roles = roles[0]
          // if(roles === 'student')
          // {
          //     window.location.pathname = `${process.env.REACT_APP_REDIRECT_PATHNAME}`;
          // }
          // else {
          //     //TODO: Use Env variable here
          //     window.location.pathname = `/ownteacher`
          // }
          // if successful login then redirect to Dashboard page
          createToast(
            "Successful Login! Welcome " + resp.user.u_uuid,
            "success"
          );
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
    const variables = {
      email: email,
      password: password,
    };
    // The Mutation Of user will be carried out here
  };
  return (
    <>
      <Jumbotron
        style={{
          paddingBottom: "0.4em",
          background:
            "transparent linear-gradient(260deg, #04CBAA 0%, #67C5DD 100%) 0% 0% no-repeat padding-box",
        }}
        fluid></Jumbotron>
      <Card
        style={{ width: "400px" }}
        className='my-5 shadow p-3 mb-5 bg-white rounded mx-auto'>
        <CardImg src={pf1} style={{ height: "20em" }} />
        <CardText>
          <Input
            type='email'
            placeholder={"E-mail"}
            label={"Email "}
            valid={isValidEmail}
            value={email}
            onChange={onEmailChange}
          />
          <Input
            type='password'
            placeholder={"password"}
            label={"Password "}
            valid={isValidPassword}
            value={password}
            onChange={onPassChange}
          />
          <Button
            name='Log In'
            classes={["btn-check"]}
            onClick={onLogin}
            isLoading={loading}
            isDisabled={!isValidEmail || !isValidPassword}
          />
          <Link className='nav-link' to={"/signup"}>
            Sign up
          </Link>
        </CardText>
      </Card>
      <Jumbotron
        style={{
          paddingTop: "0.4em",
          background:
            "transparent linear-gradient(260deg, #04CBAA 0%, #67C5DD 100%) 0% 0% no-repeat padding-box",
        }}
        fluid></Jumbotron>
    </>
  );
};

export default Login;
