import React, { useState } from "react";
import Plant from "../containers/plant";
import Addnewplant from "./Plants/Addnewplant";
import { CardDeck, Card, CardBody, CardImg } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const Plants = ({ info }) => {
  const [showform, setshowform] = useState(false);

  return (
    <>
    <Row xs="4">
      {info.plants.map((plant, index) => (
        <Col>
        <Plant key={index} each_plant={plant} u_id={u_id}  />
        <br />
        </Col>
      ))}
        {/*<CardBody><FontAwesomeIcon icon={faPlusSquare} size="10x" onClick={() => setshowform(true)} /></CardBody>*/}
    </Row>
      <div>
        {showform === true && <Addnewplant />}
      </div>
      
    </>
  );
};

export default Plants;
