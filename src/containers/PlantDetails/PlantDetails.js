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
  Tooltip,
} from "reactstrap";

import Input from "../../components/Input/Input";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import { createToast } from "../../utils/toast";
import Multitabs from "../PlantDetails/Multitabs";
import ManualControl from "./ManualControl";
import PlantDeleteAlertBox from "./PlantDeleteAlertBox";
import AutomaticTimeAdjust from "./AutomaticTimeAdjust";

import plant_icon from "../../assets/images/plant_icon1.png";
import circuit from "../../assets/images/circuit-flipped-green.png";
import circuit_2 from "../../assets/images/circuit-design-4.png";
import { client } from "../../UserApp";

const PlantDetails = (props) => {
  const p_uuid = props.match.params.plant_id;
  const [isOpen, setIsOpen] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [irrigationTimeAdjust, setIrrigationTimeAdjust] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [plantEditModal, setPlantEditModal] = useState(false);
  const [fCount, setFCount] = useState(0);

  const onAdjustTimeToggle = () =>
    setIrrigationTimeAdjust(!irrigationTimeAdjust);
  const onDismiss = () => setVisible(false);
  const manualTabToggle = () => setIsOpen(!isOpen);
  const modalToggle = () => setModal(!modal);
  const plantEditModalToggle = () => setPlantEditModal(!plantEditModal);
  const toolTipToggle = () => setTooltipOpen(!tooltipOpen);

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

  // const goToPlantEditPage = () => {
  //   window.location = `/plants/${p_uuid}/edit`;
  // };

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

  const [
    updateFruitCount,
    {
      loading: fcmutationLoading,
      error: fcmutationError,
      data: fcmutationResponse,
    },
  ] = useMutation(plant_queries.UPDATE_FCOUNT, {
    client: client,
    onCompleted: (data) => {
      console.log("Fruit Count Updated!");
      setFCount(data.update_plants_by_pk.fruit_count);
      plantEditModalToggle();
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
      setFCount(data.plants[0].fruit_count);
      // console.log(isOpen, manualMode);
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container
      fluid={true}
      style={{
        background:
          "url('https://mudpi.app/img/circuit-flipped-green.png') -5% 0% / 60% no-repeat",
        position: "relative",
      }}>
      {/* <img
        src={circuit}
        alt='Curcuit Img'
        style={{
          WebkitTransform: "scaleX(-1)",
          transform: "scaleX(-1)",
          zIndex: "0",
          position: "absolute",
          top: "50%",
          right: "0%",
        }}></img> */}
      <img
        src={circuit_2}
        alt='Curcuit Img'
        style={{
          // WebkitTransform: "scaleX(-1)",
          transform: "translateX(25%) translateY(-25%) scale(0.5)",
          zIndex: "0",
          position: "absolute",
          top: "0%",
          right: "0%",
        }}></img>
      {/* <img
        src={circuit_2}
        alt='Curcuit Img'
        style={{
          // WebkitTransform: "scaleX(-1)",
          transform: "translateX(-25%) translateY(30%) scale(0.5)",
          zIndex: "0",
          position: "absolute",
          top: "0%",
          left: "0%",
        }}></img> */}
      {console.log(isOpen, manualMode)}
      <Tooltip
        placement='bottom'
        isOpen={tooltipOpen}
        target={"Tooltip-1"}
        toggle={toolTipToggle}>
        {data.plants[0].is_uprooted || manualMode
          ? "Disabled in Manual Mode"
          : "For Automatic Irrigation"}
      </Tooltip>

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

      <Modal isOpen={plantEditModal} toggle={plantEditModalToggle}>
        <ModalHeader toggle={plantEditModalToggle}>
          Edit Plant Details
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col className='text-center'>
                <Input
                  type='number'
                  placeholder={"Enter Harvest/Fruit Count"}
                  label={"Harvest/Fruit Count: "}
                  valid={true}
                  value={fCount}
                  onChange={(curr) => {
                    // console.log(curr);
                    setFCount(curr);
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col className='text-center'>
                <Button
                  color='success'
                  onClick={() => {
                    updateFruitCount({
                      variables: {
                        p_uuid: p_uuid,
                        fcount: fCount,
                      },
                    });
                  }}
                  className='mx-auto'>
                  Update Fruit Count
                </Button>
              </Col>
            </Row>
          </Container>
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
                  // position: "absolute",
                  // // padding: "10px 0",
                  // top: "50%",
                  // left: "50%",
                  // transform: "translate(-50%, -50%)",
                  // // display: "block",
                  // margin: "0",

                  // width: "80%",
                }}
                className='card-image'
              />
            </Col>
            <Col md='8'>
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
                    <Row>
                      <Col className='text-center mb-2'>
                        <Button
                          className='float-left'
                          color='warning'
                          disabled={data.plants[0].is_uprooted}
                          onClick={plantEditModalToggle}
                          // onClick={goToPlantEditPage}
                        >
                          <i class='far fa-edit'></i>
                        </Button>
                      </Col>
                      <Col className='text-center mb-2'>
                        <Button
                          className='float-right'
                          color='danger'
                          disabled={data.plants[0].is_uprooted}
                          onClick={() => setVisible(true)}>
                          <i className='far fa-trash-alt mr-0'></i>
                        </Button>
                      </Col>
                    </Row>
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
                    <strong>Fruit Count:</strong> {fCount}
                  </Col>
                </Row>
                <Row className='mt-3 mb-1'>
                  <Col>
                    <strong>Channel:</strong>{" "}
                    {data.plants[0].plant_sensor_mappings.length
                      ? data.plants[0].plant_sensor_mappings[0].sensor_mapping
                          .alias
                      : "Channel Unavailable"}
                  </Col>
                  <Col></Col>
                </Row>
                <Row className='mt-3 mb-2 text-center'>
                  <Col>
                    {console.log(data.plants[0].is_uprooted && manualMode)}
                    <Button
                      color='success'
                      id='Tooltip-1'
                      className='mb-3 mt-3'
                      disabled={data.plants[0].is_uprooted || manualMode}
                      onClick={() => onAdjustTimeToggle()}>
                      {!irrigationTimeAdjust
                        ? "Adjust Irrigation Time"
                        : "Done"}
                    </Button>
                  </Col>
                  <Col></Col>
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
            <ManualControl
              alias={
                data.plants[0].plant_sensor_mappings.length
                  ? data.plants[0].plant_sensor_mappings[0].sensor_mapping.alias
                  : null
              }
              u_uuid={data.plants[0].u_uuid ? data.plants[0].u_uuid : null}
            />
          </Collapse>
          <Collapse isOpen={irrigationTimeAdjust}>
            <AutomaticTimeAdjust
              irrigation_timings={data.plants[0].user.irrigation_timings}
              alias={
                data.plants[0].plant_sensor_mappings[0].sensor_mapping.alias
              }
              u_uuid={data.plants[0].u_uuid}
            />
          </Collapse>
        </div>
      )}

      {mutationLoading || (fcmutationLoading && <LoadingPopup isOpen />)}
      {mutationError ||
        (fcmutationError && createToast({ message: "some Error Occurred" }))}
      <Multitabs p_uuid={p_uuid}></Multitabs>
    </Container>
  );
};

export default PlantDetails;
