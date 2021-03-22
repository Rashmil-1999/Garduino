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
import blue from "../../assets/images/blue.jpg";
import { Link } from "react-router-dom";
//import LoginSignupNavbar from "../../components/Toolbar/LoginSignupNavbar";
import vid from "../../assets/Videos/vid2.mp4";
import gif1 from "../../assets/images/giphy-1.gif";
import gif2 from "../../assets/images/giphy-3.gif";
import pm from "../../assets/images/plantmonitor.png";
import wd from "../../assets/images/plants.png";
import { repeat, transform } from "lodash";
import bg1 from "../../assets/images/bg-2.jpg";

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
    authenticate("/auth/signin", { email: email, password: password });
    // The Mutation Of user will be carried out here
  };
  return (
    <>
      
      <div style={{ display:"flex",flexDirection:"column",alignItems:"centre",width: "100%", backgroundColor: "#25274d", background:"radial-gradient(circle,#535888 ,#22264a,#25274d)"}}>
        <h5
            style={{
              color: "white",
              fontFamily: "cursive",
              fontSize: 50,
              fontWeight: 500,
              flexGrow: 1,
              margin: "10px",
              padding: "10px",
              textAlign: "center"
            }}>
            
            Welcome To Garduino- A Smart Gardening System
      </h5>
      <div style={{ display:"flex",flexDirection:"row", alignSelf: "centre"}}>
      
      <Card style={{ width: "400px", height:"500px", backgroundColor: "#aaabb8"}}
        className='my-5 shadow p-3 mb-5 rounded mx-auto'>
          <CardImg src={pf1} style={{ height: "15em", padding: "10px" }} />
            <CardText style={{ color: "black"}}>
              <Input style={{ }}
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
            <img src={wd} style={{}}></img>
          </div>
          <h2
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "cursive",
              paddingTop: "30px",
              fontSize: 30,
              fontWeight: 500,
              
            }}>
            The Key Features that Our system has are depicted below:
          </h2>
          <div style={{ display:"flex",flexDirection:"row", alignSelf: "centre", 
          paddingRight: "170px", paddingLeft: "170px", paddingTop: "65px",paddingBottom: "75px"}}>
          <Card
              style={{
                borderColor: "black",
                borderWidth: "3px",
                padding: "30px",
                flexShrink: "1",
                backgroundColor : "#aaabb8",
              }}>
              <Row>
                <Col>
                  <Card className='h-100' style={{ backgroundColor: "#E8F4F0"}}>
                    <CardImg top width='100%' src={gif2} alt='Card image cap' />
                    <CardBody>
                      <CardTitle tag='h5'>Automated Irrigation</CardTitle>
                      <CardSubtitle
                        tag='h6'
                        className='mb-2 text-muted'></CardSubtitle>
                      <CardText>
                        A smart irrigation module implemented with the help of
                        sensors and relay, which enables the user to switch
                        between automatic and manual modes of irrigation. This
                        is indeed the most crucial feature for people who
                        indulge in frequent holidays or have an erratic work
                        schedule.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card className='h-100'style={{ backgroundColor: "#E8F4F0"}}>
                    <CardImg
                      top
                      width='100%'
                      top
                      height='48%'
                      src={pm}
                      alt='Card image cap'
                    />
                    <CardBody>
                      <CardTitle tag='h5'> Live Video feed </CardTitle>
                      <CardSubtitle
                        tag='h6'
                        className='mb-2 text-muted'></CardSubtitle>
                      <CardText>
                        This module enables the user to look at their plants at
                        any time that they want. This will help the user to
                        actively monitor the plant and it's surroundings. It
                        also serves as a security feature and the user is
                        apprised of the possible intrusions.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </Col>

                <Col>
                  <Card className='h-100' style={{ backgroundColor: "#E8F4F0"}}>
                    <CardImg
                      width='50%'
                      top
                      width='100%'
                      src={gif1}
                      alt='Card image cap'
                    />
                    <CardBody>
                      <CardTitle tag='h5'>Data Visualisations</CardTitle>
                      <CardSubtitle
                        tag='h6'
                        className='mb-2 text-muted'></CardSubtitle>
                      <CardText>
                        The data collected is used for giving the user a glimpse
                        of the activities performed by the system. It also
                        enables the system to make smart decisions on it's own.
                      </CardText>
                      <Button>Button</Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <br></br>
            </Card>
          </div>
          
          <footer
          style={{
            textAlign: "center",
            
            backgroundColor: "#aaabb8",
            color: "black",
            fontFamily: "cursive",
            fontWeight: 500,
          }}>
          <Row xs="2">
            <Col style={{ paddingLeft: "80px", paddingTop: "20px" }}>
              <h4>Vision and Mission</h4>
              <p>
                It all started with a resolve to use the opportunities offered
                by technology in doing something for the society. Reseacgers
                have predicted that " A family that practices gardening tends to
                be more inclined towards adopting a healthy lifestyle and home
                gardening promotes values of science, environmental stewardship
                and healthy eating among children"
              </p>
            </Col>

            <Col>
              <h4 style={{ paddingRight: "20px", paddingTop: "20px"}}>Contact</h4>
              <p>
                For further Queries you can reach us on: <br></br>
                priyal0561@gmail.com<br></br> milonisangani15@gmail.com<br></br>{" "}
                rashmilp833@gmail.com
              </p>
            </Col>
          </Row>
        </footer>
      
      </div>
    </>
  );
};

export default Login;
