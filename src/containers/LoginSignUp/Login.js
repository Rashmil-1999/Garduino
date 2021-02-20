import React, { useState } from "react";
import Input from "../../components/Input/Input";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  Jumbotron,
} from "reactstrap";
import axios from "../../axios";
import Button from "../../components/Button/Login/Button";
import { toast } from "react-toastify";
import * as tokenUtils from "../../utils/tokenUtils";
import pf1 from "../../assets/images/pf1.png";
import { Link } from "react-router-dom";
import LoginSignupNavbar from "../../components/Toolbar/LoginSignupNavbar";
import vid from "../../assets/Videos/vid2.mp4";
import gif1 from "../../assets/images/giphy-1.gif";
import gif2 from "../../assets/images/giphy-3.gif";
import pm from "../../assets/images/plantmonitor.png";

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
      <LoginSignupNavbar />
      <br></br>
      <h3 style={{ color: "white" }}>
        {" "}
        Welcome to Garduino- A smart gardening system{" "}
      </h3>
      <br></br>
      <h4 style={{ textAlign: "left", paddingLeft: 50, color: "whitesmoke" }}>
        A Glimpse of who we are and what we have to Offer:
      </h4>
      <br></br>
      <pre style={{ textAlign: "left", color: "whitesmoke" }}>
        {" "}
        It all started with a resolve to use the umpteen opportunities offered
        by technology in doing something for the society.{" "}
      </pre>
      <pre style={{ textAlign: "left", color: "whitesmoke" }}>
        {" "}
        Our Government has been making numerous attempts to encourage households
        to indulge in urban farming through automation.<br></br>
        <br></br> Researchers have predicted that:<br></br>
        <br></br>- A family that practices gardening tends to be more inclined
        towards adopting a healthy lifestyle.<br></br>
        <br></br>- Home gardening promotes values of science, environmental
        stewardship and healthy eating among children. <br></br>
      </pre>
      <br></br>
      <br></br>
      <h2 style={{ color: "white", textAlign: "left" }}>
        The Key Features that Our system has are depicted below:
      </h2>
      <br></br>
      <CardDeck style={{ width: "70%" }}>
        <Card>
          <CardImg top width='100%' src={gif2} alt='Card image cap' />
          <CardBody>
            <CardTitle tag='h5'>Card title</CardTitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              Card subtitle
            </CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg top width='100%' src={pm} alt='Card image cap' />
          <CardBody>
            <CardTitle tag='h5'>Card title</CardTitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              Card subtitle
            </CardSubtitle>
            <CardText>
              This card has supporting text below as a natural lead-in to
              additional content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg top width='100%' src={gif1} alt='Card image cap' />
          <CardBody>
            <CardTitle tag='h5'>Card title</CardTitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              Card subtitle
            </CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </CardDeck>
      <br></br>
      <br></br>
      <br></br>
      <video style={{ width: 600, left: -500 }} autoPlay loop muted id='video'>
        <source src={vid} type='video/mp4' />
      </video>
      <Card
        style={{ width: "400px", top: -1350, left: 520 }}
        className='my-5 shadow p-3 mb-5 bg-white rounded mx-auto'>
        <CardImg src={pf1} style={{ height: "15em" }} />
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
            style={{}}
            name='Log In'
            classes={["btn-check"]}
            onClick={onLogin}
            isLoading={loading}
            isDisabled={!isValidEmail || !isValidPassword}
          />
        </CardText>
      </Card>
    </>
  );
};

export default Login;
