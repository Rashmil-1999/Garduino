import React from "react";
import { useQuery } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";
import { Container, Row, Col, Card,CardImg } from "reactstrap";
import plant_icon from "../../assets/images/plant_icon.png";
import Multitabs from "../PlantDetails/Multitabs"

const PlantDetails = (props) => {
  const p_uuid = props.match.params.plant_id;

  const { error, loading, data } = useQuery(plant_queries.GET_EACH_PLANT_INFO, {
    variables: { p_uuid },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container>
      <Row xs='4'>
        <Col>
        <Card style={{ width: "250px" }}>
        <CardImg
        top
        width='100%'
        src={plant_icon}
        alt='Card image cap'
      /></Card>
      </Col>

        <Col>{data.plants[0].plant_info.common_name}</Col>
      
        <Col></Col>

        <Col></Col>
      </Row>
      <Multitabs p_uuid={p_uuid}></Multitabs>
    </Container>
  );
};

export default PlantDetails;
