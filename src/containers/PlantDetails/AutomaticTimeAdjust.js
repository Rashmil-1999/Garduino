import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import * as user_queries from "../../queries/user_queries";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Alert,
  Label,
} from "reactstrap";

import Input from "../../components/Input/Input";
import { client } from "../../UserApp";

const AutomaticTimeAdjust = (props) => {
  const channelMapping = {
    ch_1: "channel_1",
    ch_2: "channel_2",
    ch_3: "channel_3",
    ch_4: "channel_4",
    ch_5: "channel_5",
    ch_6: "channel_6",
    ch_7: "channel_7",
    ch_8: "channel_8",
  };
  const { irrigation_timings, alias, u_uuid } = props;
  console.log(irrigation_timings);
  let timing_copy = { ...irrigation_timings[0] };
  //   let timingObject;
  //   if (irrigation_timings) {
  //     timingObject.channel_1 = irrigation_timings[0].channel_1;
  //     timingObject.channel_2 = irrigation_timings[0].channel_2;
  //     timingObject.channel_3 = irrigation_timings[0].channel_3;
  //     timingObject.channel_4 = irrigation_timings[0].channel_4;
  //     timingObject.channel_5 = irrigation_timings[0].channel_5;
  //     timingObject.channel_6 = irrigation_timings[0].channel_6;
  //     timingObject.channel_7 = irrigation_timings[0].channel_7;
  //     timingObject.channel_8 = irrigation_timings[0].channel_8;
  //   }

  const [time, setTime] = useState(
    irrigation_timings[0][channelMapping[alias]]
  );
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);

  const [
    updateIrrigationTime,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(user_queries.UPDATE_IRRIGATION_TIMINGS, {
    client: client,
    onCompleted: (data) => {
      console.log("Irrigation Time Updated!");
      setVisible(true);
    },
  });
  return (
    <>
      <Alert
        color='success'
        className='mt-4'
        isOpen={visible}
        toggle={onDismiss}>
        Irrigation Timings Updated!
      </Alert>
      <Card className='mt-4 mb-4 w-75 mx-auto'>
        <CardHeader>
          <CardTitle className='text-center h3 mt-1 mb-1'>
            Automatic Irrigation Time Adjustment
          </CardTitle>
        </CardHeader>
        <CardBody>
          <p className='lead text-center'>
            Enter the number of seconds you want to Irrigate{" "}
            {channelMapping[alias]}
          </p>
          <Container>
            <Row>
              <Col>
                <Input
                  type='range'
                  label={"Time: " + time + " seconds "}
                  value={time}
                  //   disabled={true}
                  min='0'
                  max='100'
                  onChange={(curr) => setTime(curr)}
                />
              </Col>
            </Row>
            <Row className='text-center'>
              <Col>
                <Button
                  color='success'
                  onClick={() => {
                    alert("Confirm Time Change?");
                    timing_copy[channelMapping[alias]] = parseInt(time);
                    delete timing_copy.__typename;
                    // irrigation_timings[0][channelMapping[alias]] = parseInt(
                    //   time
                    // );
                    console.log(timing_copy);
                    let variables = {
                      u_uuid: u_uuid,
                      ...timing_copy,
                    };
                    console.log(variables);
                    updateIrrigationTime({
                      variables: variables,
                    });
                  }}>
                  Update Time
                </Button>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    </>
  );
};

export default AutomaticTimeAdjust;
