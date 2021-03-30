import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Container,
  Collapse,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CircularTimer from "./CircularTimer";
import Input from "../../components/Input/Input";

import { client } from "../../UserApp";
import * as user_queries from "../../queries/user_queries";
import { update } from "lodash";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return (
      <div
        style={{
          fontFamily: "Montserrat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "13px",
        }}>
        Complete!
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Montserrat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <div style={{ color: "#aaa", fontSize: "10px" }}>Remaining</div>
      <div style={{ fontSize: "20px" }}>{remainingTime}</div>
      <div style={{ color: "#aaa", fontSize: "10px" }}>seconds</div>
    </div>
  );
};

const ManualControl = (props) => {
  const { alias, u_uuid } = props;
  var irrigationTimings = {
    ch_1: 0,
    ch_2: 0,
    ch_3: 0,
    ch_4: 0,
    ch_5: 0,
    ch_6: 0,
    ch_7: 0,
    ch_8: 0,
  };
  const [timerVisibility, setTimerVisibility] = useState(false);
  const [key, setKey] = useState(0);
  const [time, setTime] = useState(5);
  // const [isPlaying, setIsPlaying] = useState(false);

  const startTimer = () => setTimerVisibility(true);
  const stopTimer = () => setTimerVisibility(false);

  const [
    updateManualIrrigationTime,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(user_queries.MANUAL_IRRIGATION, {
    client: client,
    onCompleted: (data) => {
      console.log("Manual Irrigation Time Updated!");
      // alert("sensor Mapping inserted");
      startTimer();
    },
  });

  return (
    <>
      <Card className='mt-4 mb-4 w-50 mr-auto ml-auto'>
        <CardHeader className='text-center'>Manual Control</CardHeader>
        <CardBody>
          <Container>
            <Row className='mb-4 mt-2'>
              <Col>
                <CardText>
                  Move the Slider to adjust the time for which you want to
                  irrigate the plant.
                </CardText>
              </Col>
            </Row>
            <Row className='mb-2 mt-2'>
              <Col>
                <Input
                  type='range'
                  label={"Time: " + time + " seconds "}
                  value={time}
                  //   disabled={true}
                  min='0'
                  max='100'
                  onChange={(curr) => {
                    if (curr <= 5) {
                      setTime(5);
                    } else {
                      setTime(curr);
                    }
                  }}
                />
              </Col>
            </Row>
            <Row className='mb-2 mt-2'>
              <Button
                color='info'
                className='mx-auto'
                disabled={timerVisibility}
                onClick={() => {
                  alert("Confirm Irrigation for " + time + " seconds?");
                  irrigationTimings[alias] = parseInt(time);
                  updateManualIrrigationTime({
                    variables: {
                      u_uuid: u_uuid,
                      ...irrigationTimings,
                    },
                  });
                  setKey((prev) => prev + 1);
                }}>
                Water plant
              </Button>
            </Row>
            <Row className='mb-2 mt-4'>
              <Collapse className='mx-auto' isOpen={timerVisibility}>
                {timerVisibility ? (
                  <CircularTimer
                    isPlaying={timerVisibility}
                    key={key}
                    time={time}
                    stopTimer={stopTimer}
                  />
                ) : (
                  <></>
                )}
              </Collapse>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </>
  );
};

export default ManualControl;
