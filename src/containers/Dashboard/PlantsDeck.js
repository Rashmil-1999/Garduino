import React, { useState } from "react";
import PlantCard from "./PlantCard";
import {
  CardDeck,
  Card,
  CardBody,
  CardImg,
  Row,
  Col,
  Container,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const PlantsDeck = ({ info }) => {
  // const deck = []

  // for(var i = 0; i < info.plants.length; i++ ){

  // }
  console.log(info);
  return (
    <>
      {/* <Row xs='4'>
        {info.plants.map((plant, index) => (
          <Col>
            <PlantCard key={index} each_plant={plant} />
            <br />
          </Col>
        ))}
      </Row> */}
      <Container>
        <CardDeck  className='text-center'>
          {info.plants.map((plant, index) => (
            <PlantCard key={index} each_plant={plant} />
          ))}
        </CardDeck>
      </Container>
    </>
  );
};

export default PlantsDeck;
