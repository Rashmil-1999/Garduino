import React, { useState } from "react";
import Input from "../../components/Input/Input";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  Jumbotron,
  CardColumns,
} from "reactstrap";
import axios from "../../axios";
import Button from "../../components/Button/Login/Button";
import { toast } from "react-toastify";
import * as tokenUtils from "../../utils/tokenUtils";
import pf1 from "../../assets/images/pf1.png";
import { Link } from "react-router-dom";
//import LoginSignupNavbar from "../../components/Toolbar/LoginSignupNavbar";
import vid from "../../assets/Videos/vid2.mp4";
import gif1 from "../../assets/images/giphy-1.gif";
import gif2 from "../../assets/images/giphy-3.gif";
import pm from "../../assets/images/plantmonitor.png";
import wd from "../../assets/images/wood-5.jpeg";

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
      {/* <LoginSignupNavbar /> */}
      <br></br>
      <div style={{}}>
        <h3
          style={{
            color: "black",
            fontStyle: "geneva",
            fontSize: 60,
            fontWeight: 800,
          }}
        >
          {" "}
          Welcome to Garduino- A smart gardening system{" "}
        </h3>
        <br></br>
        
         
        
        
        
        <h4
          style={{
            textAlign: "left",
            paddingLeft: 50,
            color: "black",
            fontFamily: "cursive",
            fontWeight: 1000,
          }}
        >
          A Glimpse of who we are and what we have to Offer:
        </h4>
        <br></br>
        
        <pre
          style={{
            textAlign: "left",
            color: "black",
            fontFamily: "cursive",
            paddingLeft:50
          }}
        >
          
        </pre>
        
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <div>
        <br></br>
        <h2
          style={{ color: "black", textAlign: "center", fontFamily: "cursive" }}
        >
    
          The Key Features that Our system has are depicted below:
        </h2>
        <br></br>
        <Container fluid={true}>
         
            
        <CardDeck style={{ width: "100%" }}>
        <Row>
        <Col>
          <Card>
            <CardImg top width="100%" src={gif2} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Automated Irrigation</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
              <CardText>
                A smart irrigation module implemented with the help of sensors
                and relay, which enables the user to switch between automatic
                and manual modes of irrigation. This is indeed the most crucial
                feature for people who indulge in frequent holidays or have an
                erratic work schedule.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
            </Col>
<Col></Col><Col></Col>
          <Col>
          <Card>
            <CardImg top width="100%" src={pm} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5"> Live Video feed </CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
              <CardText>
                This module enables the user to look at their plants at any time
                that they want. This will help the user to actively monitor the
                plant and it's surroundings. It also serves as a security
                feature and the user is apprised of the possible intrusions.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
            </Col>

          </Row>
          <Row></Row><Row></Row>
          <Card>
            <CardImg top width="100%" src={gif1} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Data Visualisations</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle>
              <CardText>
                The data collected is used for giving the user a glimpse of the
                activities performed by the system. It also enables the system
                to make smart decisions on it's own.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </CardDeck>
        </Container>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <video style={{ width: 600, left: -500 }} autoPlay loop muted id="video">
        <source src={vid} type="video/mp4" />
      </video>
      <div>
        <Card
          style={{ width: "400px", top: -2900, left: 520 }}
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
              style={{}}
              name="Log In"
              classes={["btn-check"]}
              onClick={onLogin}
              isLoading={loading}
              isDisabled={!isValidEmail || !isValidPassword}
            />
          </CardText>
        </Card>
      </div>
    </>
  );
};

export default Login;
