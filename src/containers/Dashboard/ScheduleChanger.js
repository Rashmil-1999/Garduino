import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Button,
  List,
  ListInlineItem,
  Badge,
  ButtonGroup,
} from "reactstrap";
import Select from "../../components/Input/Select";
import { client } from "../../UserApp";
import * as user_queries from "../../queries/user_queries";

const ScheduleChanger = (props) => {
  const { schedule, u_uuid } = props;
  const [scheduleData, setScheduleData] = useState([]);
  //   var scheduleData = [];
  const insertTime = (item) => {
    setScheduleData([parseInt(item), ...scheduleData].sort((a, b) => a - b));
    console.log(scheduleData);
  };

  const removeTime = (index) => {
    let temp = [];
    for (var i = 0; i < scheduleData.length; i++) {
      if (i !== index) {
        temp.push(scheduleData[i]);
      }
    }
    // temp = temp.splice(index, 1);
    setScheduleData(temp);
    console.log(scheduleData);
    // console.log(index);
  };

  const [
    updateSchedule,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(user_queries.UPDATE_IRRIGATION_SCHEDULE, {
    client: client,
    onCompleted: (data) => {
      console.log("Irrigation Schedule Updated!");
      // alert("sensor Mapping inserted");
      window.location.pathname = `${process.env.REACT_APP_REDIRECT_PATHNAME}`;
    },
  });

  const prepareDataAndUpdate = () => {
    let finalString = "";
    for (var i = 0; i < scheduleData.length; i++) {
      if (scheduleData[i] < 10) {
        if (i === 0) {
          finalString = finalString + "0" + scheduleData[i].toString();
        } else {
          finalString = finalString + ":0" + scheduleData[i].toString();
        }
      } else {
        if (i === 0) {
          finalString = finalString + scheduleData[i].toString();
        } else {
          finalString = finalString + ":" + scheduleData[i].toString();
        }
      }
    }

    updateSchedule({
      variables: {
        u_uuid: u_uuid,
        schedule: finalString,
      },
    });
  };

  let options = [];
  let timeDisplay = [];
  for (var i = 0; i < 24; i++) {
    options.push({
      name:
        i < 12
          ? i === 0
            ? (i + 12).toString() + " " + "AM"
            : i.toString() + " " + "AM"
          : i.toString() + " " + "PM",
      value: i,
    });
    timeDisplay.push(
      i < 12
        ? i === 0
          ? (i + 12).toString() + " " + "AM"
          : i.toString() + " " + "AM"
        : i.toString() + " " + "PM"
    );
  }
  return (
    <Jumbotron className='text-center mb-2 mt-2'>
      <h5 className='h4'>Your Schedule</h5>
      <Container>
        {schedule ? (
          <List type='inline'>
            {schedule.split(":").map((item, i) => {
              let meridean = "";
              if (parseInt(item) < 12) {
                if (parseInt(item) === 0) {
                  meridean = meridean + parseInt(item + 12) + " " + "AM";
                } else {
                  meridean = meridean + parseInt(item) + " " + "AM";
                }
              } else {
                meridean = meridean + parseInt(item) + " " + "PM";
              }
              return (
                <ListInlineItem key={i}>
                  {/* <p className='lead'>{meridean}</p> */}
                  <Button color='secondary'>{meridean}</Button>
                </ListInlineItem>
              );
            })}
          </List>
        ) : (
          <Row className='text-center'>
            <p className='lead'>Schedule not available.</p>
          </Row>
        )}
      </Container>
      <Container>
        <Row>
          <Col>
            <Select
              label={"Select Timings"}
              valid={true}
              value={0}
              options={options}
              onChange={(curr) => {
                console.log(curr);
                if (
                  !scheduleData.includes(parseInt(curr)) &&
                  curr !== "--------"
                ) {
                  //   scheduleData.push(parseInt(curr));
                  insertTime(curr);
                }
                // scheduleData.push(curr);
                // scheduleData.sort((a, b) => a - b);
                // console.log(scheduleData);
              }}
            />
          </Col>
          <Col className='text-center'>
            {/* <Button
              color='primary'
              outline
              onClick={() => console.log(scheduleData)}>
              Click Me
            </Button> */}
            <p className='lead'>Your selected timings:</p>
            <List type='inline'>
              {scheduleData.map((i, index) => (
                <ListInlineItem className='mb-1 mt-1' key={i}>
                  <ButtonGroup>
                    <Button
                      color='secondary align-middle'
                      onClick={() => removeTime(index)}>
                      {timeDisplay[i] + "  "}
                      <i className='fas fa-times'></i>
                    </Button>
                  </ButtonGroup>
                </ListInlineItem>
              ))}
            </List>
          </Col>
        </Row>
        <Row className='mb-4 mt-3'>
          <Col></Col>
          <Col>
            <Button
              color='success'
              className='mx-auto '
              onClick={prepareDataAndUpdate}
              disabled={scheduleData.length === 0}>
              Update Schedule
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <p className='text-muted font-italic'>
            {" "}
            <strong>Please Note:</strong> By updating the Schedule you are
            overwriting the existing schedule. If you wish to add more
            irrigation time to the schedule, then please do not forget to select
            the existing timings.
          </p>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default ScheduleChanger;
