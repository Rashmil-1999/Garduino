import React from "react";
import { useQuery } from "@apollo/client";
import * as plant_queries from "../../queries/plant_queries";
import { Container, Row, Col } from "reactstrap";
import plant_icon from "../../assets/images/planticon.png";

const PlantDetails = (props) => {
  const p_uuid = props.match.params.plant_id;

  const { error, loading, data } = useQuery(plant_queries.GET_EACH_PLANT_INFO, {
    variables: { p_uuid },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <Container>
      <Row xs='3'>
        <Col></Col>

        <Col>{data.plants[0].plant_info.common_name}</Col>

        <Col></Col>

        <Col></Col>
      </Row>
    </Container>
  );
};

export default PlantDetails;
