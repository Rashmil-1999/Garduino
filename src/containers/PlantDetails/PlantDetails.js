import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import * as plant_queries from "../../queries/plant_queries";
import * as user_queries from "../../queries/user_queries";

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Collapse,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

import Input from "../../components/Input/Input";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import { createToast } from "../../utils/toast";
import Multitabs from "../PlantDetails/Multitabs";
import ManualControl from "./ManualControl";

import plant_icon from "../../assets/images/plant_icon1.png";
import { client } from "../../UserApp";

const PlantDetails = (props) => {
  const p_uuid = props.match.params.plant_id;
  const [isOpen, setIsOpen] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [modal, setModal] = useState(false);

  const manualTabToggle = () => setIsOpen(!isOpen);
  const modalToggle = () => setModal(!modal);

  const calculateAge = (planted_on) => {
    // console.log(planted_on);
    var [year, month, day] = planted_on
      .split("-")
      .map((item) => parseInt(item));
    var today = new Date();
    var thatDay = new Date(year, month - 1, day);
    if (today < thatDay) {
      today.setDate(today.getDate() + 1);
    }
    var dateDiff = today - thatDay;
    var msec = dateDiff;
    var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
    return "The Plant is " + dd + " days old!";
  };

  const [
    updateManualMode,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(user_queries.SET_MANUAL_MODE, {
    client: client,
    onCompleted: (data) => {
      console.log("Manual Status Updated!");
      manualTabToggle();
      modalToggle();
    },
  });
  const { error, loading, data } = useQuery(plant_queries.GET_EACH_PLANT_INFO, {
    variables: { p_uuid },
    onCompleted: (data) => {
      // console.log("This is the data");
      // console.log(data);
      setManualMode(data.plants[0].user.irrigation_modes[0].manual);
      if (data.plants[0].user.irrigation_modes[0].manual) {
        manualTabToggle();
      }
      // console.log(isOpen, manualMode);
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container fluid={true}>
      {console.log(isOpen, manualMode)}
      <Modal isOpen={modal} toggle={modalToggle}>
        <ModalHeader toggle={modalToggle}>
          {isOpen && manualMode
            ? "Confirm Change to Auto Mode?"
            : "Confirm Change to Manual Mode?"}
        </ModalHeader>
        <ModalBody>
          {isOpen && manualMode
            ? "Switching to Auto Mode will enable Automatic Irrigation "
            : "Switiching to Manual mode will disable all the automatic features but will still log sensor values. Are you sure you want to continue and switch of Auto Irrigation mode?"}
          <ModalFooter className=''>
            <Button
              color={isOpen && manualMode ? "success" : "danger"}
              onClick={() => {
                updateManualMode({
                  variables: {
                    u_uuid: data.plants[0].u_uuid,
                    manualMode: !manualMode,
                  },
                });
                setManualMode(!manualMode);
              }}>
              Confirm?
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
      <Row>
        <Card className='mt-4 ml-auto mr-auto w-75' style={{ height: "250px" }}>
          <Row className='no-gutters'>
            <Col xs='4'>
              <CardImg
                src={plant_icon}
                style={{
                  height: "250px",
                  width: "auto",
                  border: "1px solid #c3c3c3",
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "center",
                }}
                className=''
              />
            </Col>
            <Col xs='8'>
              <Row className='mt-3'>
                <Col xs='9'>
                  <CardSubtitle
                    className='ml-0'
                    style={{
                      fontSize: "20pt",
                      fontWeight: "800",
                      fontFamily:
                        "Alliance No.1,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                    }}>
                    {data.plants[0].plant_info.common_name}
                    {/* {console.log(data.plants[0])} */}
                  </CardSubtitle>
                </Col>
                <Col xs='3'>
                  <Button className='mr-0' color='danger'>
                    <i className='far fa-trash-alt mr-0'></i>
                  </Button>
                </Col>
              </Row>

              <Row className='p-3'>
                <Col>{calculateAge(data.plants[0].planted_on)}</Col>

                <Col>Date of Sowing: {data.plants[0].planted_on}</Col>
              </Row>
              <Row>
                <Col>
                  Status: {data.plants[0].is_uprooted ? "Uprooted" : "Alive"}
                </Col>
                <Col>Fruit Count: {data.plants[0].fruit_count}</Col>
              </Row>
              <Row className='text-center'>
                <Col>
                  <Button
                    className='mb-3 mt-3'
                    color={isOpen && manualMode ? "success" : "danger"}
                    onClick={() => {
                      modalToggle();
                    }}>
                    {isOpen && manualMode ? "Auto Mode" : "Manual Mode"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
      <Collapse isOpen={isOpen && manualMode}>
        <ManualControl />
      </Collapse>
      {mutationLoading && <LoadingPopup isOpen />}
      {mutationError && createToast({ message: "some Error Occurred" })}
      <Multitabs p_uuid={p_uuid}></Multitabs>
    </Container>
  );
};

export default PlantDetails;
