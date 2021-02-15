import React, { useState } from 'react';
import Plant from "../containers/plant";
import Addnewplant from "../containers/Addnewplant";
import {CardDeck,Card,CardBody,CardImg} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';


const Plants = ({info}) => {
  const [showform, setshowform] = useState(false);
  
  return (
    <>
    <CardDeck>
      {info.plants.map((plant, index) => (
        <Plant key={index} each_plant={plant}  />
      ))}
      <Card>
        <CardBody><FontAwesomeIcon icon={faPlusSquare} size="10x" onClick={() => setshowform(true)} /></CardBody>
      </Card>
    </CardDeck>
      <div>
        {showform === true && <Addnewplant />}
      </div>
      
    </>
  )
}

export default Plants;
