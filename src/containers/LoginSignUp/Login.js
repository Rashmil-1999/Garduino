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
import pf1 from "../../assets/images/logo.png";
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
import circuitDesign from "../../assets/images/circuit-design-2.png";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "centre",
          width: "100%",
          // backgroundColor: "#25274d",
          // background: "radial-gradient(circle,#535888 ,#22264a,#25274d)",
        }}>
        <h5
          style={{
            color: "white",
            fontFamily: "cursive",
            fontSize: 50,
            fontWeight: 500,
            flexGrow: 1,
            margin: "10px",
            padding: "10px",
            textAlign: "center",
          }}>
          Welcome To Garduino- A Smart Gardening System
        </h5>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignSelf: "centre",
            justifyContent: "space-around",
            alignContent: "center",
          }}>
          <Card
            style={{
              width: "400px",
              height: "650px",
              backgroundColor: "#aaabb8",
            }}
            className='my-5 shadow p-3 mb-5 rounded mx-auto'>
            <CardImg
              src={pf1}
              style={{ height: "auto", width: "100%", padding: "12px" }}
            />
            <CardText style={{ color: "black" }}>
              <Input
                style={{}}
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
          <div
          // style={{
          //   backgroundImage: `url(${circuitDesign})`,
          //   backgroundSize: "auto",
          // }}
          >
            <img
              src={circuitDesign}
              style={{ height: "auto", width: "700px", zIndex: "-1" }}></img>
            <div
              className='column column-12 md:column-6 w-100'
              style={{ minHeight: "200px" }}>
              <div
                class='floaty-ball pin big'
                style={{ top: "85%", left: "85%" }}>
                <img
                  src='https://mudpi.app/img/icons/pi.png'
                  alt='Raspberry Pi'
                  className='w-100 mw-100 mr-1'
                  style={{ maxWidth: "54px" }}></img>
              </div>
              <div
                className='floaty-ball pin bigger'
                style={{ top: "65%", left: "77%" }}>
                <img
                  src='https://mudpi.app/img/mudpi_logo_flat.png'
                  alt='MudPi'
                  className='w-100 mw-100 mr-1'
                  style={{ maxWidth: "64px" }}></img>
              </div>
              <div
                className='floaty-ball pin'
                style={{ top: "50%", left: "58%" }}>
                <img
                  src='https://mudpi.app/img/icons/php.png'
                  alt='PHP'
                  className='w-100 mw-100 mr-1'
                  style={{ maxWidth: "48px" }}></img>
              </div>
              <div
                className='floaty-ball pin'
                style={{ top: "60%", left: "95%" }}>
                <img
                  src='https://mudpi.app/img/icons/python.png'
                  alt='Python'
                  class='w-100 mw-100 mr-1'
                  style={{ maxWidth: "32px" }}></img>
              </div>
              <div
                className='floaty-ball pin'
                style={{ top: "50%", left: "85%" }}>
                <img
                  src='https://mudpi.app/img/icons/redis.png'
                  alt='Redis'
                  class='w-100 mw-100 mr-1'
                  style={{ maxWidth: "32px" }}></img>
              </div>
              <div
                className='floaty-ball pin big'
                style={{ top: "80%", left: "65%" }}>
                <img
                  src='https://mudpi.app/img/icons/arduino.png'
                  alt='Arduino'
                  class='w-100 mw-100 mr-1'
                  style={{ maxWidth: "54px" }}></img>
              </div>
            </div>
          </div>

          {/* Flexbox div End */}
        </div>
        <div className='columns relative is-centered'>
          <svg
            class='circuit-no-fill'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            // xmlns:xlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 432 648'
            style={{ enableBackground: "new 0 0 432 648" }}
            // style='enable-background:new 0 0 432 648;'
            // xml:space='preserve'
          >
            <g id='Layer_2'>
              <polyline
                class='st0'
                points='217.3,555.6 217.7,294.3 318.3,185 317.7,119.7 332.3,106.3 331.7,60.3  '
              />
            </g>
            <g id='Layer_3'>
              <polyline
                class='st0'
                points='207.1,537 207.1,205.9 225.3,188.3 225.3,28.2  '
              />
            </g>
            <g id='Layer_4'>
              <polyline
                class='st0'
                points='224.2,534.4 224.2,326.6 362,177.9     '
              />
            </g>
            <g id='Layer_5'>
              <polyline
                class='st0'
                points='203.5,522.3 203.5,216.8 163,169.6 163,144.7   '
              />
            </g>
            <g id='Layer_6'>
              <polyline
                class='st0'
                points='210.4,515.7 210.4,246.3 237.3,220.4 237.3,102.8   '
              />
            </g>
            <g id='Layer_7'>
              <polyline
                class='st0'
                points='199.8,507.9 199.8,313.6 63.5,169.6    '
              />
            </g>
            <g id='Layer_8'>
              <polyline
                class='st0'
                points='214.1,490.8 214.1,292.4 264.3,237     '
              />
            </g>
            <g id='Layer_9'>
              <polyline
                class='st0'
                points='221,471.2 221,323 349.3,186 349,91.3  '
              />
            </g>
            <g class='group-2' id='Layer_10'>
              <line class='st0' x1='161.3' y1='273' x2='103.7' y2='273' />
              <line class='st0' x1='161.3' y1='272.9' x2='161.3' y2='217.3' />
            </g>
            <g class='group-3' id='Layer_11'>
              <line class='st0' x1='161.4' y1='217.6' x2='156.3' y2='212' />
            </g>
            <g class='group-3' id='Layer_12'>
              <line class='st0' x1='161.4' y1='217.5' x2='161.4' y2='206.6' />
            </g>
            <g class='group-2' id='Layer_13'>
              <polyline
                class='st0'
                points='313.7,230.2 334.5,230.3 358.5,203.3   '
              />
            </g>
            <g class='group-2' id='Layer_14'>
              <line class='st0' x1='264.3' y1='236.8' x2='251.8' y2='222.7' />
            </g>
            <g class='group-2' id='Layer_15'>
              <polyline
                class='st0'
                points='161,238.8 138.8,217.5 138.8,141   '
              />
            </g>
            <g class='group-3' id='Layer_16'>
              <line class='st0' x1='251.8' y1='222.3' x2='251.8' y2='206.3' />
            </g>
            <g class='group-2' id='Layer_17'>
              <line class='st0' x1='218.3' y1='238.6' x2='218.3' y2='205.8' />
            </g>
            <g class='group-2' id='Layer_18'>
              <line class='st0' x1='110' y1='219' x2='52' y2='219' />
            </g>
            <g class='group-2' id='Layer_19'>
              <polyline
                class='st0'
                points='110.4,219 123.1,208.6 123.1,157.5     '
              />
            </g>
            <g class='group-2' id='Layer_20'>
              <polyline
                class='st0'
                points='203.4,227.8 157,175.3 157,43.3    '
              />
            </g>
            <g class='group-2' id='Layer_21'>
              <line class='st0' x1='286.7' y1='219' x2='286.7' y2='167.7' />
            </g>
            <g class='group-2' id='Layer_22'>
              <line class='st0' x1='354.3' y1='185.9' x2='354.3' y2='136.7' />
            </g>
            <g class='group-2' id='Layer_23'>
              <polyline
                class='st0'
                points='109.8,218.8 109.8,189.5 100.6,179.3   '
              />
            </g>
            <g class='group-3' id='Layer_24'>
              <line class='st0' x1='109.7' y1='189.3' x2='109.7' y2='141.1' />
            </g>
            <g class='group-4' id='Layer_25'>
              <line class='st0' x1='100.5' y1='179.2' x2='100.5' y2='96.7' />
            </g>
            <g class='group-2' id='Layer_26'>
              <line class='st0' x1='83.7' y1='191' x2='39.7' y2='191' />
            </g>
            <g class='group-2' id='Layer_27'>
              <line class='st0' x1='83.5' y1='190.7' x2='83.5' y2='121.7' />
            </g>
            <g class='group-2' id='Layer_28'>
              <polyline
                class='st0'
                points='193,204.5 216.5,180.5 216.5,170   '
              />
            </g>
            <g class='group-2' id='Layer_29'>
              <polyline
                class='st0'
                points='237.3,200.7 262,178 262,83 273.5,66.5 273.5,51    '
              />
            </g>
            <g class='group-2' id='Layer_30'>
              <polyline
                class='st0'
                points='181,190.5 189.5,181.5 189.5,82    '
              />
            </g>
            <g class='group-2' id='Layer_31'>
              <polyline
                class='st0'
                points='341.6,194.1 331.8,182 331.8,146.5     '
              />
            </g>
            <g class='group-3' id='Layer_32'>
              <line class='st0' x1='206' y1='191.3' x2='205.7' y2='119' />
            </g>
            <g class='group-3' id='Layer_33'>
              <line class='st0' x1='286.6' y1='167.8' x2='299.3' y2='153.8' />
            </g>
            <g class='group-3' id='Layer_34'>
              <line class='st0' x1='293' y1='160.6' x2='293' y2='154' />
            </g>
            <g class='group-3' id='Layer_35'>
              <polyline class='st0' points='286.5,167.5 275,153 275,89.5  ' />
            </g>
            <g class='group-3' id='Layer_36'>
              <polyline
                class='st0'
                points='354.4,151.9 359.5,146.5 359.5,125.5   '
              />
            </g>
            <g class='group-2' id='Layer_37'>
              <line class='st0' x1='237.3' y1='155.6' x2='251.5' y2='142' />
            </g>
            <g class='group-2' id='Layer_38'>
              <line class='st0' x1='349.2' y1='113' x2='368' y2='91.8' />
            </g>
            <g class='group-2' id='Layer_39'>
              <polyline
                class='st0'
                points='225.2,125.3 199.5,91.3 199.5,15   '
              />
            </g>
            <g class='group-2' id='Layer_40'>
              <polyline
                class='st0'
                points='225.2,105 213.2,87.3 213.2,19.3   '
              />
            </g>
            <g class='group-2' id='Layer_41'>
              <line class='st0' x1='225.1' y1='79.4' x2='220.2' y2='72.7' />
            </g>
            <g class='group-2' id='Layer_42'>
              <line class='st0' x1='225.3' y1='79.4' x2='257.5' y2='36' />
            </g>
            <g class='group-3' id='Layer_43'>
              <line class='st0' x1='244.4' y1='53.8' x2='244.4' y2='31.6' />
            </g>
            <g class='group-2' id='Layer_44'>
              <polyline
                class='st0'
                points='317.7,137.5 288.7,101.5 289,50.7  '
              />
            </g>
            <g class='group-3' id='Layer_45'>
              <polyline
                class='st0'
                points='302.8,118.6 313.7,107.7 313.7,77.7    '
              />
            </g>
            <g class='group-3' id='Layer_46'>
              <polyline
                class='st0'
                points='308.8,112.3 298,97.7 298,56.7     '
              />
            </g>
            <g class='group-4' id='Layer_47'>
              <line class='st0' x1='313.7' y1='90' x2='317.7' y2='86' />
            </g>
            <g class='group-2' id='Layer_48'>
              <line class='st0' x1='199.8' y1='507.9' x2='167.8' y2='527.5' />
            </g>
            <g class='group-2' id='Layer_49'>
              <line class='st0' x1='224.2' y1='534.3' x2='241.4' y2='549' />
            </g>
            <g class='group-2' id='Layer_50'>
              <line class='st0' x1='210.3' y1='515.8' x2='212.7' y2='518.5' />
            </g>
            <g class='group-3' id='Layer_51'>
              <polyline class='st0' points='262,120.6 270,112 270,99  ' />
            </g>
            <g class='group-2' id='Layer_52'>
              <line class='st0' x1='203.5' y1='522.4' x2='194.3' y2='528.6' />
            </g>
            <g class='group-3' id='Layer_53'>
              <line class='st0' x1='349.3' y1='122.6' x2='366.4' y2='103.9' />
            </g>
            <g class='group-3' id='Layer_54'>
              <line class='st0' x1='156.9' y1='118.1' x2='130.5' y2='81' />
            </g>
            <g class='group-3' id='Layer_55'>
              <line class='st0' x1='157' y1='94.6' x2='188' y2='47.5' />
            </g>
            <g class='group-3' id='Layer_56'>
              <line class='st0' x1='157' y1='73.5' x2='140' y2='47' />
            </g>
            <g class='group-2' id='Layer_57'>
              <line class='st0' x1='167.8' y1='527.5' x2='167.8' y2='556' />
            </g>
            <g class='group-2' id='Layer_58'>
              <line class='st0' x1='241.3' y1='549.2' x2='241.4' y2='589.9' />
            </g>
            <g class='group-2' id='Layer_59'>
              <line class='st0' x1='207.1' y1='537' x2='176' y2='557.8' />
            </g>
            <g class='group-3' id='Layer_60'>
              <line class='st0' x1='189.5' y1='126.8' x2='177' y2='110' />
            </g>
            <g class='group-2' id='Layer_61'>
              <polyline
                class='st0'
                points='217.3,555.7 227.5,564.5 227.5,631.5   '
              />
            </g>
            <g class='group-2' id='Layer_62'>
              <line class='st0' x1='194.2' y1='528.7' x2='194.1' y2='536.6' />
            </g>
            <g class='group-2' id='Layer_63'>
              <line class='st0' x1='212.6' y1='518.5' x2='212.6' y2='605.5' />
            </g>
            <g class='group-2' id='Layer_64'>
              <line class='st0' x1='176' y1='558.2' x2='175.9' y2='599.7' />
            </g>
            <g class='group-3' id='Layer_65'>
              <polyline
                class='st0'
                points='267,280.3 287.7,280.3 301.7,265   '
              />
            </g>
          </svg>

          <svg
            class='circuit-pulse fadein'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            // xmlns:xlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 432 648'
            // xml:space='preserve'
          >
            <g id='Layer_2'>
              <polyline
                class='st0'
                points='217.3,555.6 217.7,294.3 318.3,185 317.7,119.7 332.3,106.3 331.7,60.3  '
              />
            </g>
            <g id='Layer_3'>
              <polyline
                class='st0'
                points='207.1,537 207.1,205.9 225.3,188.3 225.3,28.2  '
              />
            </g>
            <g id='Layer_4'>
              <polyline
                class='st0'
                points='224.2,534.4 224.2,326.6 362,177.9     '
              />
            </g>
            <g id='Layer_5'>
              <polyline
                class='st0'
                points='203.5,522.3 203.5,216.8 163,169.6 163,144.7   '
              />
            </g>
            <g id='Layer_6'>
              <polyline
                class='st0'
                points='210.4,515.7 210.4,246.3 237.3,220.4 237.3,102.8   '
              />
            </g>
            <g id='Layer_7'>
              <polyline
                class='st0'
                points='199.8,507.9 199.8,313.6 63.5,169.6    '
              />
            </g>
            <g id='Layer_8'>
              <polyline
                class='st0'
                points='214.1,490.8 214.1,292.4 264.3,237     '
              />
            </g>
            <g id='Layer_9'>
              <polyline
                class='st0'
                points='221,471.2 221,323 349.3,186 349,91.3  '
              />
            </g>
            <g class='group-2' id='Layer_10'>
              <line class='st0' x1='161.3' y1='273' x2='103.7' y2='273' />
              <line class='st0' x1='161.3' y1='272.9' x2='161.3' y2='217.3' />
            </g>
            <g class='group-3' id='Layer_11'>
              <line class='st0' x1='161.4' y1='217.6' x2='156.3' y2='212' />
            </g>
            <g class='group-3' id='Layer_12'>
              <line class='st0' x1='161.4' y1='217.5' x2='161.4' y2='206.6' />
            </g>
            <g class='group-2' id='Layer_13'>
              <polyline
                class='st0'
                points='313.7,230.2 334.5,230.3 358.5,203.3   '
              />
            </g>
            <g class='group-2' id='Layer_14'>
              <line class='st0' x1='264.3' y1='236.8' x2='251.8' y2='222.7' />
            </g>
            <g class='group-2' id='Layer_15'>
              <polyline
                class='st0'
                points='161,238.8 138.8,217.5 138.8,141   '
              />
            </g>
            <g class='group-3' id='Layer_16'>
              <line class='st0' x1='251.8' y1='222.3' x2='251.8' y2='206.3' />
            </g>
            <g class='group-2' id='Layer_17'>
              <line class='st0' x1='218.3' y1='238.6' x2='218.3' y2='205.8' />
            </g>
            <g class='group-2' id='Layer_18'>
              <line class='st0' x1='110' y1='219' x2='52' y2='219' />
            </g>
            <g class='group-2' id='Layer_19'>
              <polyline
                class='st0'
                points='110.4,219 123.1,208.6 123.1,157.5     '
              />
            </g>
            <g class='group-2' id='Layer_20'>
              <polyline
                class='st0'
                points='203.4,227.8 157,175.3 157,43.3    '
              />
            </g>
            <g class='group-2' id='Layer_21'>
              <line class='st0' x1='286.7' y1='219' x2='286.7' y2='167.7' />
            </g>
            <g class='group-2' id='Layer_22'>
              <line class='st0' x1='354.3' y1='185.9' x2='354.3' y2='136.7' />
            </g>
            <g class='group-2' id='Layer_23'>
              <polyline
                class='st0'
                points='109.8,218.8 109.8,189.5 100.6,179.3   '
              />
            </g>
            <g class='group-3' id='Layer_24'>
              <line class='st0' x1='109.7' y1='189.3' x2='109.7' y2='141.1' />
            </g>
            <g class='group-4' id='Layer_25'>
              <line class='st0' x1='100.5' y1='179.2' x2='100.5' y2='96.7' />
            </g>
            <g class='group-2' id='Layer_26'>
              <line class='st0' x1='83.7' y1='191' x2='39.7' y2='191' />
            </g>
            <g class='group-2' id='Layer_27'>
              <line class='st0' x1='83.5' y1='190.7' x2='83.5' y2='121.7' />
            </g>
            <g class='group-2' id='Layer_28'>
              <polyline
                class='st0'
                points='193,204.5 216.5,180.5 216.5,170   '
              />
            </g>
            <g class='group-2' id='Layer_29'>
              <polyline
                class='st0'
                points='237.3,200.7 262,178 262,83 273.5,66.5 273.5,51    '
              />
            </g>
            <g class='group-2' id='Layer_30'>
              <polyline
                class='st0'
                points='181,190.5 189.5,181.5 189.5,82    '
              />
            </g>
            <g class='group-2' id='Layer_31'>
              <polyline
                class='st0'
                points='341.6,194.1 331.8,182 331.8,146.5     '
              />
            </g>
            <g class='group-3' id='Layer_32'>
              <line class='st0' x1='206' y1='191.3' x2='205.7' y2='119' />
            </g>
            <g class='group-3' id='Layer_33'>
              <line class='st0' x1='286.6' y1='167.8' x2='299.3' y2='153.8' />
            </g>
            <g class='group-3' id='Layer_34'>
              <line class='st0' x1='293' y1='160.6' x2='293' y2='154' />
            </g>
            <g class='group-3' id='Layer_35'>
              <polyline class='st0' points='286.5,167.5 275,153 275,89.5  ' />
            </g>
            <g class='group-3' id='Layer_36'>
              <polyline
                class='st0'
                points='354.4,151.9 359.5,146.5 359.5,125.5   '
              />
            </g>
            <g class='group-2' id='Layer_37'>
              <line class='st0' x1='237.3' y1='155.6' x2='251.5' y2='142' />
            </g>
            <g class='group-2' id='Layer_38'>
              <line class='st0' x1='349.2' y1='113' x2='368' y2='91.8' />
            </g>
            <g class='group-2' id='Layer_39'>
              <polyline
                class='st0'
                points='225.2,125.3 199.5,91.3 199.5,15   '
              />
            </g>
            <g class='group-2' id='Layer_40'>
              <polyline
                class='st0'
                points='225.2,105 213.2,87.3 213.2,19.3   '
              />
            </g>
            <g class='group-2' id='Layer_41'>
              <line class='st0' x1='225.1' y1='79.4' x2='220.2' y2='72.7' />
            </g>
            <g class='group-2' id='Layer_42'>
              <line class='st0' x1='225.3' y1='79.4' x2='257.5' y2='36' />
            </g>
            <g class='group-3' id='Layer_43'>
              <line class='st0' x1='244.4' y1='53.8' x2='244.4' y2='31.6' />
            </g>
            <g class='group-2' id='Layer_44'>
              <polyline
                class='st0'
                points='317.7,137.5 288.7,101.5 289,50.7  '
              />
            </g>
            <g class='group-3' id='Layer_45'>
              <polyline
                class='st0'
                points='302.8,118.6 313.7,107.7 313.7,77.7    '
              />
            </g>
            <g class='group-3' id='Layer_46'>
              <polyline
                class='st0'
                points='308.8,112.3 298,97.7 298,56.7     '
              />
            </g>
            <g class='group-4' id='Layer_47'>
              <line class='st0' x1='313.7' y1='90' x2='317.7' y2='86' />
            </g>
            <g class='group-2' id='Layer_48'>
              <line class='st0' x1='199.8' y1='507.9' x2='167.8' y2='527.5' />
            </g>
            <g class='group-2' id='Layer_49'>
              <line class='st0' x1='224.2' y1='534.3' x2='241.4' y2='549' />
            </g>
            <g class='group-2' id='Layer_50'>
              <line class='st0' x1='210.3' y1='515.8' x2='212.7' y2='518.5' />
            </g>
            <g class='group-3' id='Layer_51'>
              <polyline class='st0' points='262,120.6 270,112 270,99  ' />
            </g>
            <g class='group-2' id='Layer_52'>
              <line class='st0' x1='203.5' y1='522.4' x2='194.3' y2='528.6' />
            </g>
            <g class='group-3' id='Layer_53'>
              <line class='st0' x1='349.3' y1='122.6' x2='366.4' y2='103.9' />
            </g>
            <g class='group-3' id='Layer_54'>
              <line class='st0' x1='156.9' y1='118.1' x2='130.5' y2='81' />
            </g>
            <g class='group-3' id='Layer_55'>
              <line class='st0' x1='157' y1='94.6' x2='188' y2='47.5' />
            </g>
            <g class='group-3' id='Layer_56'>
              <line class='st0' x1='157' y1='73.5' x2='140' y2='47' />
            </g>
            <g class='group-2' id='Layer_57'>
              <line class='st0' x1='167.8' y1='527.5' x2='167.8' y2='556' />
            </g>
            <g class='group-2' id='Layer_58'>
              <line class='st0' x1='241.3' y1='549.2' x2='241.4' y2='589.9' />
            </g>
            <g class='group-2' id='Layer_59'>
              <line class='st0' x1='207.1' y1='537' x2='176' y2='557.8' />
            </g>
            <g class='group-3' id='Layer_60'>
              <line class='st0' x1='189.5' y1='126.8' x2='177' y2='110' />
            </g>
            <g class='group-2' id='Layer_61'>
              <polyline
                class='st0'
                points='217.3,555.7 227.5,564.5 227.5,631.5   '
              />
            </g>
            <g class='group-2' id='Layer_62'>
              <line class='st0' x1='194.2' y1='528.7' x2='194.1' y2='536.6' />
            </g>
            <g class='group-2' id='Layer_63'>
              <line class='st0' x1='212.6' y1='518.5' x2='212.6' y2='605.5' />
            </g>
            <g class='group-2' id='Layer_64'>
              <line class='st0' x1='176' y1='558.2' x2='175.9' y2='599.7' />
            </g>
            <g class='group-3' id='Layer_65'>
              <polyline
                class='st0'
                points='267,280.3 287.7,280.3 301.7,265   '
              />
            </g>
          </svg>
        </div>

        <div className='column column-12 sm:column-6 md:column-6 mb-3'>
          <div className='box hover:scale-2 relative rounded-3 py-1 mb-3 columns is-centered'>
            <div className='column column-12 md:column-4 mb-3 md:mb-0'>
              <img
                class=''
                src='https://mudpi.app/svg/plant_in_mobile.svg'></img>
            </div>
            <div class='column column-12 md:column-8'>
              <h3 class='h4 text-primary'>Configurable</h3>
              <p class='mb-2'>
                Configure and customize MudPi to your specific garden needs
                providing personalized care.
              </p>
            </div>
          </div>
        </div>

        {/* <div style="background: url('https://mudpi.app/img/circuit-design-2.png') 105% 80% no-repeat;background-size:55%;"> */}
        {/* <img style={{background: "url('https://mudpi.app/img/circuit-design-2.png') 105% 80% no-repeat;background-size:55%;"}} ></img> */}

        <div
        // style={{
        //   background:
        //     "url('https://mudpi.app/img/circuit-design-2.png') 105% 80% no-repeat;background-size:55%;",
        // }}
        >
          <div className='mb-5'>
            <div className='container'>
              <div className='columns py-6 sm:py-8'>
                <div className='column column-12 md:column-6 mb-3'>
                  {/* <div className='p-3 rounded-3'>
                    <h3 className='h3 text-primary mb-3'>
                      Build it Yourself Approved
                    </h3>
                    <p className='text-grey-dark text-loosest text-sm mb-3'>
                      If you're a tinkerer and up for the task, you can build
                      your own smart garden powered by MudPi. The core
                      technology behind MudPi is
                      <a href='https://github.com/olixr/MudPi'>
                        {" "}
                        open source
                      </a>{" "}
                      and design to be a foundation to build upon. We have{" "}
                      <a href='https://mudpi.app/guides'>
                        free guides to help you
                      </a>{" "}
                      deploy your own setup along with custom kits to speed up
                      the process.
                    </p>
                    <a
                      className='button bb-2 b-primary text-primary px-2 rounded-2 inline-block'
                      href='https://mudpi.app/guides'
                      title='Build your own smart garden'>
                      Learn More &#8594;
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h2
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "cursive",
            paddingTop: "30px",
            fontSize: 30,
            fontWeight: 500,
          }}>
          The Key Features that Our system has are depicted below:
        </h2> */}
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelf: "centre",
            paddingRight: "170px",
            paddingLeft: "170px",
            paddingTop: "65px",
            paddingBottom: "75px",
          }}>
          <Card
            style={{
              borderColor: "black",
              borderWidth: "3px",
              padding: "30px",
              flexShrink: "1",
              backgroundColor: "#aaabb8",
            }}>
            <Row>
              <Col>
                <Card className='h-100' style={{ backgroundColor: "#E8F4F0" }}>
                  <CardImg top width='100%' src={gif2} alt='Card image cap' />
                  <CardBody>
                    <CardTitle tag='h5'>Automated Irrigation</CardTitle>
                    <CardSubtitle
                      tag='h6'
                      className='mb-2 text-muted'></CardSubtitle>
                    <CardText>
                      A smart irrigation module implemented with the help of
                      sensors and relay, which enables the user to switch
                      between automatic and manual modes of irrigation. This is
                      indeed the most crucial feature for people who indulge in
                      frequent holidays or have an erratic work schedule.
                    </CardText>
                    <Button>Button</Button>
                  </CardBody>
                </Card>
              </Col>

              <Col>
                <Card className='h-100' style={{ backgroundColor: "#E8F4F0" }}>
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
                      actively monitor the plant and it's surroundings. It also
                      serves as a security feature and the user is apprised of
                      the possible intrusions.
                    </CardText>
                    <Button>Button</Button>
                  </CardBody>
                </Card>
              </Col>

              <Col>
                <Card className='h-100' style={{ backgroundColor: "#E8F4F0" }}>
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
                      of the activities performed by the system. It also enables
                      the system to make smart decisions on it's own.
                    </CardText>
                    <Button>Button</Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br></br>
          </Card>
        </div> */}

        {/* <footer
          style={{
            textAlign: "center",

            backgroundColor: "#aaabb8",
            color: "black",
            fontFamily: "cursive",
            fontWeight: 500,
          }}>
          <Row xs='2'>
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
              <h4 style={{ paddingRight: "20px", paddingTop: "20px" }}>
                Contact
              </h4>
              <p>
                For further Queries you can reach us on: <br></br>
                priyal0561@gmail.com<br></br> milonisangani15@gmail.com<br></br>{" "}
                rashmilp833@gmail.com
              </p>
            </Col>
          </Row>
        </footer> */}
      </div>
    </>
  );
};

export default Login;
