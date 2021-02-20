import React, { useState } from "react";
import PlantCard from "./PlantCard";
import { CardDeck, Card, CardBody, CardImg, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const PlantsDeck = ({ info }) => {
  const [showform, setshowform] = useState(false);

  return (
    <>
      <Row xs='4'>
        {info.plants.map((plant, index) => (
          <Col>
            <PlantCard key={index} each_plant={plant} />
            <br />
          </Col>
        ))}
        {/*<CardBody><FontAwesomeIcon icon={faPlusSquare} size="10x" onClick={() => setshowform(true)} /></CardBody>*/}
      </Row>
    </>
  );
};

export default PlantsDeck;
