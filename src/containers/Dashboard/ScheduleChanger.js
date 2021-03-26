import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { Jumbotron, Container, Row, Col, Button } from "reactstrap";
import Select from "../../components/Input/Select";

const ScheduleChanger = (props) => {
  const { schedule, u_uuid } = props;
  var scheduleData = [];
  let options = [];
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
  }
  return (
    <Jumbotron className='text-center mb-2 mt-2'>
      <h5 className='h4'>Your Schedule</h5>
      <Container>
        {schedule ? (
          schedule.split(":").map((item, i) => {
            let meridean = "";
            if (parseInt(item) < 12) {
              meridean = meridean + parseInt(item) + " " + "AM";
            } else {
              meridean = meridean + parseInt(item) + " " + "PM";
            }
            return (
              <Row key={i}>
                <p className='lead'>{meridean}</p>
              </Row>
            );
          })
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
                if (!scheduleData.includes(parseInt(curr))) {
                  scheduleData.push(parseInt(curr));
                }
                // scheduleData.push(curr);
                scheduleData.sort((a, b) => a - b);
                console.log(scheduleData);
              }}
            />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default ScheduleChanger;
