import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Jumbotron,
  Form,
  FormGroup,
  FormText,
  Row,
  Col,
  Button,
} from "reactstrap";
import * as plant_queries from "../../queries/plant_queries";
import PlantsDeck from "./PlantsDeck";
import Select from "../../components/Input/Select";
import Input from "../../components/Input/Input";
import ScheduleChanger from "./ScheduleChanger";
// import LoadingPopup from "../../components/Loader/LoadingPopup";
import { client } from "../../UserApp";

const DisplayPlant = ({ u_id, asm_data }) => {
  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [temp4, setTemp4] = useState("");
  const [temp5, setTemp5] = useState("");
  const [temp6, setTemp6] = useState("");
  const [temp7, setTemp7] = useState("");
  const [temp8, setTemp8] = useState("");
  let tempArr = [
    { temp: temp1, setTemp: setTemp1 },
    { temp: temp2, setTemp: setTemp2 },
    { temp: temp3, setTemp: setTemp3 },
    { temp: temp4, setTemp: setTemp4 },
    { temp: temp5, setTemp: setTemp5 },
    { temp: temp6, setTemp: setTemp6 },
    { temp: temp7, setTemp: setTemp7 },
    { temp: temp8, setTemp: setTemp8 },
  ];
  const [channelDetails, setChannelDetails] = useState([
    {
      alias: "ch_1",
      pin_num: 21,
    },
    {
      alias: "ch_2",
      pin_num: 20,
    },
    {
      alias: "ch_3",
      pin_num: 16,
    },
    {
      alias: "ch_4",
      pin_num: 26,
    },
    {
      alias: "ch_5",
      pin_num: 19,
    },
    {
      alias: "ch_6",
      pin_num: 13,
    },
    {
      alias: "ch_7",
      pin_num: 6,
    },
    {
      alias: "ch_8",
      pin_num: 5,
    },
  ]);
  const [sensorSetNum, setSensorSetNum] = useState(0);

  const [
    insertSensorMappings,
    { loading: mutationLoading, error: mutationError, data: mutationResponse },
  ] = useMutation(plant_queries.INSERT_SENSOR_MAPPINGS, {
    client: client,
    onCompleted: (data) => {
      console.log("Sensor Mappings Inserted!");
      alert("sensor Mapping inserted");
      window.location = `${process.env.REACT_APP_REDIRECT_PATHNAME}`;
    },
  });

  let object = [];
  let options = [];
  // console.log(asm_data.length);
  for (var i = 7; i >= asm_data.length; i--) {
    options.push({ name: 8 - i, value: 8 - i });
  }

  const onClickSubmit = () => {
    for (
      var i = parseInt(asm_data.length);
      i < parseInt(asm_data.length + parseInt(sensorSetNum));
      i++
    ) {
      object.push({
        alias: channelDetails[i].alias,
        pin_num: channelDetails[i].pin_num,
        temp_sensor: tempArr[i].temp,
        u_uuid: u_id,
      });
    }
    console.log(object[0]);
    insertSensorMappings({
      variables: { object: object },
    });
  };

  const returnValidity = () => {
    let truth = true;
    for (
      var i = parseInt(asm_data.length);
      i < parseInt(asm_data.length + parseInt(sensorSetNum));
      i++
    ) {
      truth = truth && tempArr[i].temp !== "";
    }
    return truth;
  };
  const { error, loading, data } = useQuery(plant_queries.GET_USER_PLANT_INFO, {
    variables: { u_id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className='container'>
      <br />
      {/* {mutationLoading && <LoadingPopup isOpen />} */}
      <Card
        className='mt-4 shadow p-3 mb-5 bg-wite mx-auto'
        style={{
          borderRadius: "15px",
          borderColor: "rgb(158,158,158)",
          borderWidth: "4px",
        }}>
        <CardBody>
          <CardTitle tag='h5'> </CardTitle>
          <CardSubtitle className='display-4 text-center' tag='h4'>
            Your plantlings
          </CardSubtitle>
          <br />
          <CardText>
            <PlantsDeck info={data} u_id={u_id} />
          </CardText>
        </CardBody>
        <ScheduleChanger
          schedule={data.users_by_pk.irrigation_timings[0].schedule}
          u_uuid={u_id}
        />
      </Card>
      <Jumbotron className='text-center mb-3'>
        <h4 className='display-4'>Want to add more sensors?</h4>
        <p className='lead'>
          Have you bought extra sensors? You can add new sensor set by filling
          the form below!
        </p>
        <hr className='my-2' />
        <form>
          <FormGroup row>
            <Col sm={12}>
              <Select
                label={"Sensor Set Count"}
                valid={true}
                value={sensorSetNum}
                options={options}
                onChange={(curr) => setSensorSetNum(curr)}
              />
            </Col>
          </FormGroup>
          {sensorSetNum === "--------" || sensorSetNum === 0 ? (
            <p className='lead mx-auto'>Please Select Sensor Set Count</p>
          ) : (
            <FormGroup>
              {channelDetails
                .slice(
                  parseInt(asm_data.length),
                  parseInt(asm_data.length + parseInt(sensorSetNum))
                )
                .map((item, i) => {
                  return (
                    <FormGroup key={i}>
                      <hr className='my-2' />
                      <Row>
                        <Col md={6} sm={6}>
                          <p className='lead'>{"Alias: " + item.alias}</p>
                        </Col>
                        <Col md={6} sm={6}>
                          <p className='lead'>{"GPIO Pin: " + item.pin_num}</p>
                        </Col>
                      </Row>
                      <FormGroup row>
                        <Col md={12} sm={12}>
                          <Input
                            type='text'
                            placeholder={"Address starting with (28-)"}
                            label={"Temperature Sensor Address: "}
                            valid={tempArr[asm_data.length + i].temp !== ""}
                            value={tempArr[asm_data.length + i].temp}
                            onChange={tempArr[asm_data.length + i].setTemp}
                          />
                        </Col>
                      </FormGroup>
                    </FormGroup>
                  );
                })}
            </FormGroup>
          )}
          <FormGroup>
            <Button
              color='info'
              onClick={onClickSubmit}
              disabled={
                sensorSetNum === 0 ||
                sensorSetNum === "--------" ||
                !returnValidity()
              }>
              Add Sensors
            </Button>
          </FormGroup>
        </form>
      </Jumbotron>
      <br />
    </div>
  );
};

export default DisplayPlant;
