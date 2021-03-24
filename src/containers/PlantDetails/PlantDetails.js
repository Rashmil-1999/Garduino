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
  Table,
} from "reactstrap";

import Input from "../../components/Input/Input";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import { createToast } from "../../utils/toast";
import Multitabs from "../PlantDetails/Multitabs";
import ManualControl from "./ManualControl";
import PlantDeleteAlertBox from "./PlantDeleteAlertBox";
import AutomaticTimeAdjust from "./AutomaticTimeAdjust";

import plant_icon from "../../assets/images/plant_icon1.png";
import { client } from "../../UserApp";

const PlantDetails = (props) => {
  const p_uuid = props.match.params.plant_id;
  const [isOpen, setIsOpen] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [irrigationTimeAdjust, setIrrigationTimeAdjust] = useState(false);

  const onAdjustTimeToggle = () =>
    setIrrigationTimeAdjust(!irrigationTimeAdjust);
  const onDismiss = () => setVisible(false);
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
    return (
      <p>
        <strong>{"Age: "}</strong>
        {"The Plant is " + dd + " days old!"}
      </p>
    );
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
      <PlantDeleteAlertBox
        p_uuid={p_uuid}
        visible={visible}
        onDismiss={onDismiss}
      />
      <Row>
        <Card
          className='mt-4 ml-auto mr-auto w-75'
          style={{
            // height: "300px",
            borderColor: "black",
            borderWidth: "2px",
          }}>
          <Row className=''>
            <Col md='4'>
              <CardImg
                src={plant_icon}
                alt='Plant Icon'
                style={{
                  border: "1px solid #c3c3c3",
                }}
                className='card-image'
              />
            </Col>
            <Col md='8'>
              {/* <Table borderless>
                <thead>
                  <tr>
                    <th colSpan='5' className='display-4'>
                      {data.plants[0].plant_info.common_name}
                    </th>
                  </tr>
                </thead>
              </Table> */}
              <Container>
                <Row className='mt-2 mb-1 '>
                  <Col xs='9'>
                    <p
                      className='text-center display-4 align-middle'
                      style={{
                        // fontSize: "20pt",
                        // fontWeight: "800",
                        fontFamily:
                          "Alliance No.1,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                      }}>
                      {data.plants[0].plant_info.common_name}
                      {/* {console.log(data.plants[0])} */}
                    </p>
                  </Col>
                  <Col xs='3' className='ml-auto'>
                    <Button
                      className='float-right'
                      color='danger'
                      disabled={data.plants[0].is_uprooted}
                      onClick={() => setVisible(true)}>
                      <i className='far fa-trash-alt mr-0'></i>
                    </Button>
                  </Col>
                </Row>
                <Row className='mt-1 mb-1'>
                  <Col>{calculateAge(data.plants[0].planted_on)}</Col>

                  <Col>
                    <strong>Date of Sowing: </strong>{" "}
                    {data.plants[0].planted_on}
                  </Col>
                </Row>
                <Row className='mt-1 mb-1'>
                  <Col>
                    <strong>Status:</strong>{" "}
                    {data.plants[0].is_uprooted ? "Uprooted" : "Alive"}
                  </Col>
                  <Col>
                    <strong>Fruit Count:</strong> {data.plants[0].fruit_count}
                  </Col>
                </Row>
                <Row className='mt-3 mb-2 text-center'>
                  <Col>
                    {console.log(data.plants[0].is_uprooted && manualMode)}
                    <Button
                      color='info'
                      className='mb-3 mt-3'
                      disabled={data.plants[0].is_uprooted || manualMode}
                      onClick={() => onAdjustTimeToggle()}>
                      {!irrigationTimeAdjust
                        ? "Adjust Automatic Irrigation Time"
                        : "Done"}
                    </Button>
                  </Col>
                  {/* <Col></Col> */}
                  <Col>
                    <Button
                      className='mb-3 mt-3'
                      color={isOpen && manualMode ? "success" : "danger"}
                      onClick={() => {
                        // setIrrigationTimeAdjust(false);
                        modalToggle();
                      }}
                      disabled={data.plants[0].is_uprooted}>
                      {isOpen && manualMode ? "Auto Mode" : "Manual Mode"}
                    </Button>
                  </Col>
                  {/* <Col></Col> */}
                </Row>
              </Container>
            </Col>
          </Row>
        </Card>
      </Row>
      {data.plants[0].is_uprooted ? (
        <Card className='mt-4 mb-4 w-50 mr-auto ml-auto'>
          <CardBody>
            <CardText>
              Manual Control not available as the plant is uprooted.
            </CardText>
          </CardBody>
        </Card>
      ) : (
        <div>
          <Collapse isOpen={isOpen && manualMode}>
            <ManualControl />
          </Collapse>
          <Collapse isOpen={irrigationTimeAdjust}>
            <AutomaticTimeAdjust
              irrigation_timings={data.plants[0].irrigation_timings}
              alias={
                data.plants[0].plant_sensor_mappings[0].sensor_mapping.alias
              }
            />
          </Collapse>
        </div>
      )}

      {mutationLoading && <LoadingPopup isOpen />}
      {mutationError && createToast({ message: "some Error Occurred" })}
      <Multitabs p_uuid={p_uuid}></Multitabs>
    </Container>
  );
};

export default PlantDetails;
