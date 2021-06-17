import React, { useState } from "react";
import Input from "../../components/Input/Input";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  Button,
} from "reactstrap";

import "../../assets/CSS/app.css";
import "../../assets/CSS/theme.css";

import axios from "../../axios";
// import Button from "../../components/Button/Login/Button";
import { toast } from "react-toastify";
import pf1 from "../../assets/images/green_logo4.png";
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
          flexDirection: "row",
          flexWrap: "wrap",
          alignSelf: "centre",
          justifyContent: "space-around",
          alignContent: "center",
        }}>
        <Card
          style={{
            width: "450px",
            height: "650px",
            backgroundColor: "#EFF6F0",
            // border: "2px solid blue",
            flex: "0 1 auto",
          }}
          className='mt-5 shadow p-3 mb-5 rounded mx-auto'>
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
            {/* <Button
                style={{}}
                name='Log In'
                classes={["btn-check"]}
                onClick={onLogin}
                isLoading={loading}
                isDisabled={!isValidEmail || !isValidPassword}
              /> */}
            <Row style={{ justifyContent: "center" }}>
              <Button
                color='success'
                onClick={onLogin}
                disabled={!isValidEmail || !isValidPassword}>
                {loading ? (
                  <div>
                    <i className='fa fa-circle-o-notch fa-spin'></i>
                    &nbsp;&nbsp;Loading
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </Row>
          </CardText>
        </Card>
        <div
          style={{
            // border: "2px solid red",
            flex: "0 1 auto",
            position: "relative",
            height: "724.56px",
          }}
          className='mb-4'>
          <img
            src={circuitDesign}
            style={{ height: "auto", width: "700px", zIndex: "-1" }}></img>
          <div
            className='column column-12 md:column-6 w-100'
            style={{ minHeight: "200px" }}>
            <div
              class='floaty-ball pin big'
              style={{ top: "55%", left: "60%", position: "absolute" }}>
              <img
                src='https://mudpi.app/img/icons/pi.png'
                alt='Raspberry Pi'
                className='w-100 mw-100 mr-1'
                style={{ maxWidth: "54px" }}></img>
            </div>
            <div
              className='floaty-ball pin bigger'
              style={{ top: "40%", left: "50%", position: "absolute" }}>
              <img
                src='https://mudpi.app/img/mudpi_logo_flat.png'
                alt='MudPi'
                className='w-100 mw-100 mr-1'
                style={{ maxWidth: "64px" }}></img>
            </div>
            <div
              className='floaty-ball pin'
              style={{ top: "30%", left: "30%", position: "absolute" }}>
              {/* Node JS */}
              <svg viewBox='0 0 128 128' className='w-100 mw-100 mr-1'>
                <path
                  fill='#5b9344'
                  d='M112.678 30.334l-44.143-25.605c-2.781-1.584-6.424-1.584-9.227 0l-44.488 25.605c-2.869 1.651-4.82 4.754-4.82 8.073v51.142c0 3.319 1.992 6.423 4.862 8.083l11.729 6.688c5.627 2.772 7.186 2.772 9.746 2.772 8.334 0 12.662-5.039 12.662-13.828v-50.49c.001-.713.446-1.774-.255-1.774h-5.622c-.712 0-2.122 1.061-2.122 1.773v50.49c0 3.896-3.616 7.773-10.202 4.48l-12.122-7.013c-.422-.23-.676-.693-.676-1.181v-51.142c0-.482.463-.966.891-1.213l44.378-25.561c.415-.235 1.002-.235 1.415 0l43.963 25.555c.421.253.354.722.354 1.219v51.142c0 .488.092.963-.323 1.198l-44.133 25.576c-.378.227-.87.227-1.285 0l-11.317-6.749c-.341-.198-.752-.269-1.08-.086-3.145 1.783-3.729 2.02-6.679 3.043-.727.253-1.799.692.408 1.929l14.798 8.754c1.416.82 3.027 1.246 4.647 1.246 1.642 0 3.249-.426 4.666-1.246l43.976-25.582c2.871-1.672 4.322-4.764 4.322-8.083v-51.142c-.001-3.319-1.452-6.414-4.323-8.073zM77.727 81.445c-11.727 0-14.309-3.235-15.17-9.066-.102-.628-.634-1.379-1.274-1.379h-5.73c-.709 0-1.28.86-1.28 1.566 0 7.466 4.06 16.512 23.454 16.512 14.038 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.104 0 12.46 1.954 13.841 8.091.119.577.646.991 1.241.991h5.754c.354 0 .691-.143.939-.396.241-.272.367-.613.336-.979-.893-10.569-7.913-15.494-22.112-15.494-12.632 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.622 13.577 14.505 1.422 15.633 3.542 15.633 6.395 0 4.956-3.978 7.067-13.308 7.067z'></path>
              </svg>
            </div>
            <div
              className='floaty-ball pin'
              style={{ top: "35%", left: "80%", position: "absolute" }}>
              <img
                src='https://mudpi.app/img/icons/python.png'
                alt='Python'
                class='w-100 mw-100 mr-1'
                style={{ maxWidth: "32px" }}></img>
            </div>
            <div
              className='floaty-ball pin'
              style={{ top: "47%", left: "88%", position: "absolute" }}>
              {/* React */}
              <svg viewBox='0 0 128 128' className='w-100 mw-100 mr-1'>
                <g fill='#5b9344'>
                  <circle cx='64' cy='64' r='11.4'></circle>
                  <path d='M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3-12.5 4.8-19.3 11.4-19.3 18.8s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zm-14.8-30.5c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zm-11.2 59.3c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zm-25.6 27.1c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zm25.6-27.1c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zm-54.5-16.2c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zm-24.7 29c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5-13.8-4-22.1-10-22.1-15.6zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zm60.8-20.3c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z'></path>
                </g>
              </svg>
            </div>
            <div
              className='floaty-ball pin big'
              style={{ top: "65%", left: "40%", position: "absolute" }}>
              <img
                src='https://mudpi.app/img/icons/arduino.png'
                alt='Arduino'
                class='w-100 mw-100 mr-1'
                style={{ maxWidth: "54px" }}></img>
            </div>
            <div
              className='floaty-ball pin big'
              style={{ top: "20%", left: "65%", position: "absolute" }}>
              {/* Hasura */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                // xmlns:xlink='http://www.w3.org/1999/xlink'
                aria-hidden='true'
                focusable='false'
                width='4em'
                height='4em'
                className='w-100 mw-100 mr-1'
                // style='-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);'
                // preserveAspectRatio='xMidYMid meet'
                viewBox='0 0 256 305'>
                <circle fill='#FFFFFF' cx='128' cy='180.374' r='103.632' />
                <path
                  d='M169.255 211.537l-38.761-75.62c-3.415-6.663-11.6-9.304-18.28-5.886c-6.664 3.423-9.305 11.605-5.89 18.27l16.185 31.554l-28.969 28.887c-5.315 5.303-5.315 13.896-.029 19.21a13.558 13.558 0 0 0 9.609 3.988c3.476 0 6.94-1.335 9.591-3.965l22.793-22.742l9.584 18.69a13.568 13.568 0 0 0 18.276 5.893c6.667-3.416 9.307-11.598 5.89-18.279'
                  fill='#5b9344'
                />
                <path
                  d='M221.39.927c-7.73 4.91 5.324 49.686-25.652 76.097c-19.548-12.679-42.846-20.11-67.895-20.11c-24.972 0-48.207 7.404-67.726 19.997C29.326 50.497 42.318 5.836 34.622.927C22.001-7.123-1.726 39.113.1 68.483c.983 15.704 5.16 38.713 16.571 56.538c-8.507 16.725-13.405 35.533-13.405 55.497c0 68.174 55.882 123.64 124.578 123.64c68.711 0 124.58-55.464 124.58-123.64c0-19.847-4.854-38.56-13.267-55.2c11.548-17.878 15.758-41.051 16.742-56.835c1.836-29.37-21.905-75.607-34.51-67.556m-93.546 275.958c-53.534 0-97.12-43.214-97.12-96.368c0-53.129 43.586-96.36 97.12-96.36c53.567 0 97.125 43.231 97.125 96.36c0 53.157-43.558 96.368-97.125 96.368'
                  fill='#5b9344'
                />
              </svg>
            </div>
            <div
              className='floaty-ball pin big'
              style={{ top: "50%", left: "10%", position: "absolute" }}>
              {/* Graph QL */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                // xmlns:xlink='http://www.w3.org/1999/xlink'
                aria-hidden='true'
                focusable='false'
                width='5em'
                height='5em'
                className='w-100 mw-100 mr-1'
                // style='-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);'
                // preserveAspectRatio='xMidYMid meet'
                viewBox='0 0 256 288'>
                <path
                  d='M152.576 32.963l59.146 34.15a25.819 25.819 0 0 1 5.818-4.604c12.266-7.052 27.912-2.865 35.037 9.402c7.052 12.267 2.865 27.912-9.402 35.037a25.698 25.698 0 0 1-6.831 2.72v68.325a25.7 25.7 0 0 1 6.758 2.702c12.34 7.125 16.527 22.771 9.402 35.038c-7.052 12.266-22.771 16.453-35.038 9.402a25.464 25.464 0 0 1-6.34-5.147l-58.786 33.94a25.671 25.671 0 0 1 1.295 8.08c0 14.103-11.458 25.636-25.635 25.636c-14.177 0-25.635-11.46-25.635-25.636c0-2.52.362-4.954 1.037-7.253l-59.13-34.14a25.824 25.824 0 0 1-5.738 4.52c-12.34 7.051-27.986 2.864-35.038-9.402c-7.051-12.267-2.864-27.913 9.402-35.038a25.71 25.71 0 0 1 6.758-2.703v-68.324a25.698 25.698 0 0 1-6.831-2.72C.558 99.897-3.629 84.178 3.423 71.911c7.052-12.267 22.77-16.454 35.037-9.402a25.82 25.82 0 0 1 5.79 4.575l59.163-34.159a25.707 25.707 0 0 1-1.048-7.29C102.365 11.46 113.823 0 128 0c14.177 0 25.635 11.459 25.635 25.635c0 2.548-.37 5.007-1.059 7.328zm-6.162 10.522l59.287 34.23a25.599 25.599 0 0 0 2.437 19.831c3.609 6.278 9.488 10.44 16.013 12.062v68.41c-.333.081-.664.17-.993.264L145.725 44.17c.234-.224.464-.452.689-.684zm-36.123.7l-77.432 134.11a25.824 25.824 0 0 0-1.01-.27v-68.417c6.525-1.622 12.404-5.784 16.013-12.062a25.6 25.6 0 0 0 2.427-19.869l59.27-34.22c.239.247.483.49.732.727zm24.872 6.075l77.414 134.08a25.492 25.492 0 0 0-4.513 5.757a25.7 25.7 0 0 0-2.702 6.758H50.64a25.71 25.71 0 0 0-2.704-6.758a25.825 25.825 0 0 0-4.506-5.724l77.429-134.107A25.715 25.715 0 0 0 128 51.27c2.487 0 4.89-.352 7.163-1.01zm11.795 194.478l58.902-34.008a25.865 25.865 0 0 1-.473-1.682H50.607c-.082.333-.171.663-.266.992l59.19 34.175A25.558 25.558 0 0 1 128 236.373a25.564 25.564 0 0 1 18.958 8.365z'
                  fill='#5b9344'
                  fill-rule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Flexbox div End */}
      </div>
      <br></br>
      <br></br>
      {/* <br></br> */}
      {/* <br></br> */}
      <div className='columns relative is-centered'>
        <svg
          class='circuit-no-fill'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          // xmlns:xlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          // width='100%'
          // height='100%'
          preserveAspectRatio='xMidYMid meet'
          viewBox='0 0 432 648'
          style={{ enableBackground: "new 0 0 432 648", top: "0px" }}
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
            <polyline class='st0' points='161,238.8 138.8,217.5 138.8,141   ' />
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
            <polyline class='st0' points='203.4,227.8 157,175.3 157,43.3    ' />
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
            <polyline class='st0' points='193,204.5 216.5,180.5 216.5,170   ' />
          </g>
          <g class='group-2' id='Layer_29'>
            <polyline
              class='st0'
              points='237.3,200.7 262,178 262,83 273.5,66.5 273.5,51    '
            />
          </g>
          <g class='group-2' id='Layer_30'>
            <polyline class='st0' points='181,190.5 189.5,181.5 189.5,82    ' />
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
            <polyline class='st0' points='225.2,125.3 199.5,91.3 199.5,15   ' />
          </g>
          <g class='group-2' id='Layer_40'>
            <polyline class='st0' points='225.2,105 213.2,87.3 213.2,19.3   ' />
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
            <polyline class='st0' points='317.7,137.5 288.7,101.5 289,50.7  ' />
          </g>
          <g class='group-3' id='Layer_45'>
            <polyline
              class='st0'
              points='302.8,118.6 313.7,107.7 313.7,77.7    '
            />
          </g>
          <g class='group-3' id='Layer_46'>
            <polyline class='st0' points='308.8,112.3 298,97.7 298,56.7     ' />
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
            <polyline class='st0' points='267,280.3 287.7,280.3 301.7,265   ' />
          </g>
        </svg>

        <svg
          class='circuit-pulse fadein'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          // xmlns:xlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          // width='100%'
          // height='100%'
          viewBox='0 0 432 648'
          preserveAspectRatio='xMidYMid meet'
          style={{ top: "0px" }}
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
            <polyline class='st0' points='161,238.8 138.8,217.5 138.8,141   ' />
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
            <polyline class='st0' points='203.4,227.8 157,175.3 157,43.3    ' />
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
            <polyline class='st0' points='193,204.5 216.5,180.5 216.5,170   ' />
          </g>
          <g class='group-2' id='Layer_29'>
            <polyline
              class='st0'
              points='237.3,200.7 262,178 262,83 273.5,66.5 273.5,51    '
            />
          </g>
          <g class='group-2' id='Layer_30'>
            <polyline class='st0' points='181,190.5 189.5,181.5 189.5,82    ' />
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
            <polyline class='st0' points='225.2,125.3 199.5,91.3 199.5,15   ' />
          </g>
          <g class='group-2' id='Layer_40'>
            <polyline class='st0' points='225.2,105 213.2,87.3 213.2,19.3   ' />
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
            <polyline class='st0' points='317.7,137.5 288.7,101.5 289,50.7  ' />
          </g>
          <g class='group-3' id='Layer_45'>
            <polyline
              class='st0'
              points='302.8,118.6 313.7,107.7 313.7,77.7    '
            />
          </g>
          <g class='group-3' id='Layer_46'>
            <polyline class='st0' points='308.8,112.3 298,97.7 298,56.7     ' />
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
            <polyline class='st0' points='267,280.3 287.7,280.3 301.7,265   ' />
          </g>
        </svg>
        <div className='column column-12 sm:column-6 md:column-6 mb-3'>
          <div className='box hover:scale-2 relative rounded-3 py-1 mb-3 columns is-centered '>
            <div className='column column-12 md:column-4 mb-3 md:mb-0'>
              <img
                class=''
                src='https://mudpi.app/svg/plant_in_mobile.svg'></img>
            </div>

            <div class='column column-12 md:column-8'>
              <h3 class='h4 text-primary'>Configurable</h3>
              <p class='mb-2'>
                Configure and customize Garduino to your specific garden needs
                providing personalized care.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div class='box hover:scale-2 relative rounded-3 py-1 mb-3 columns is-centered'>
            <div class='column column-12 md:column-4 mb-3 md:mb-0'>
              <img class='' src='https://mudpi.app/svg/schedules.svg'></img>
            </div>
            <div class='column column-12 md:column-8'>
              <h3 class='h4 text-primary'>Remote & Scheduled Control</h3>
              <p class='mb-2'>
                Create powerful schedules to care for your garden while your
                away or busy with other things. You can also take manual control
                for the more involved gardeners.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div
            class='box hover:scale-2 relative rounded-3 py-1 mb-3 columns is-centered'
            // style={{ top: "500px" }}
          >
            <div class='column column-12 md:column-4 mb-3 md:mb-0'>
              <img class='' src='https://mudpi.app/svg/home.svg'></img>
            </div>
            <div class='column column-12 md:column-8'>
              <h3 class='h4 text-primary'>Save Resources</h3>
              <p class='mb-2'>
                Spend less time, water and money by giving your plants care when
                they need it most. Using valuable sensor readings and schedules
                you can reduce your waste and help maintain a healthy thriving
                garden.
              </p>
            </div>
          </div>
        </div>

        <div class='column column-12 sm:column-6 md:column-6 mb-3'>
          <div class='box hover:scale-2 relative rounded-3 py-1 mb-3 columns is-centered'>
            <div class='column column-12 md:column-4 mb-3 md:mb-0'>
              <img class='' src='https://mudpi.app/svg/phone_check.svg'></img>
            </div>
            <div class='column column-12 md:column-8'>
              <h3 class='h4 text-primary'>Automated Watering</h3>
              <p class='mb-2'>
                Efficiently water plants when they need it most by using
                automated watering schedules.
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>

          <div class='box hover:scale-2 relative rounded-3 py-1 mb-3 columns is-centered'>
            <div class='column column-12 md:column-4 mb-3 md:mb-0'>
              <img
                class=''
                style={{ height: "120px" }}
                src='https://mudpi.app/svg/check_list.svg'></img>
            </div>
            <div class='column column-12 md:column-8'>
              <h3 class='h4 text-primary'>Gather Garden Insights</h3>
              <p class='mb-2'>
                Monitor and maintain your garden at peak efficiency with useful
                data such as soil moisture, weather and more.
              </p>
            </div>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <div class='box hover:scale-2 relative rounded-3 py-1 mb-3 columns is-centered'>
            <div class='column column-12 md:column-4 mb-3 md:mb-0'>
              <img class='' src='https://mudpi.app/svg/sensor_stats.svg'></img>
            </div>
            <div class='column column-12 md:column-8'>
              <h3 class='h4 text-primary'>Obtain Live Status Of Plants</h3>
              <p class='mb-2'>
                An email will be sent on the registered email of the user with
                the live images of the plant.In this way the user can view their
                plants remotely.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-5 ' style={{ height: "400px" }}>
        <div className='container resize' style={{ top: "30%" }}>
          <div className='columns py-3 is-centered'>
            <div className='column column-12 sm:column-8 is-centered text-centered'>
              <div className='box mb-4 rounded-3'>
                <h3 className='h3 text-primary mb-2 relative delimiter-bottom-dark'>
                  Vision and Mission
                </h3>
                <p className='text-grey'>
                  It all started with a resolve to use the opportunities offered
                  by technology in doing something for the society. Reseacgers
                  have predicted that " A family that practices gardening tends
                  to be more inclined towards adopting a healthy lifestyle and
                  home gardening promotes values of science, environmental
                  stewardship and healthy eating among children"
                </p>
                {/*<h3 class='h3 text-primary mb-2 relative delimiter-bottom-dark'>
                  Contact Details
                </h3>
                <p>
                For further Queries you can reach us on: <br></br>
                priyal0561@gmail.com<br></br> milonisangani15@gmail.com<br></br>{" "}
                rashmilp833@gmail.com
        </p>*/}
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

      <footer
        style={{
          textAlign: "center",

          backgroundColor: "#dfe6ed",
          color: "black",
          fontFamily: "cursive",
          fontWeight: 500,
        }}>
        <Row xs='3'>
          <Col>
            <h4
              style={{
                paddingRight: "20px",
                paddingTop: "20px",
                textAlign: "center",
                fontFamily: "cursive",
              }}>
              <pre> Contact Details</pre>
            </h4>
            <p
              style={{
                paddingRight: "20px",
                paddingTop: "5px",
                textAlign: "center",
              }}>
              For further Queries you can reach us on: <br></br>
              <br></br>
              priyal0561@gmail.com<br></br> milonisangani15@gmail.com<br></br>{" "}
              rashmilp833@gmail.com
            </p>
          </Col>

          <Col>
            <img src={ct} style={{ paddingTop: "35px" }}></img>
          </Col>
          <Col>
            <h6
              style={{
                paddingRight: "20px",
                paddingTop: "20px",
                textAlign: "center",
                fontFamily: "cursive",
              }}>
              We would like to thank the creators of the following websites for
              providing us with all the relevant information about plants:
            </h6>
            <br></br>

            <p>
              indiaplants.com <br></br>
              garden.org<br></br>
              healthline.com<br></br>
              krishijagran.com
            </p>
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default Login;
