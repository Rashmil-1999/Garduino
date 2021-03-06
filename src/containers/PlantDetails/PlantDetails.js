import React from "react";
import { useQuery } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";
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
  Button,
} from "reactstrap";

import Input from "../../components/Input/Input";
import plant_icon from "../../assets/images/plant_icon1.png";
import Multitabs from "../PlantDetails/Multitabs";

const PlantDetails = (props) => {
  const p_uuid = props.match.params.plant_id;

  const calculateAge = (planted_on) => {
    console.log(planted_on);
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

  const { error, loading, data } = useQuery(plant_queries.GET_EACH_PLANT_INFO, {
    variables: { p_uuid },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container fluid={true}>
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
                  <Button className='mb-3' color='danger'>
                    Change to Manual Mode
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
      <Multitabs p_uuid={p_uuid}></Multitabs>
    </Container>
  );
};

export default PlantDetails;
